---
id: 202
title: "Dark Mode Done Right in Next.js with Tailwind CSS"
excerpt: "Learn how to add dark mode to your Next.js blog using Tailwind CSS v4. This guide shows a clean approach with CSS variables, custom variants, and a simple toggle—no messy dark: classes required."
published_date: "2025-06-20"
tags: ["Tailwind", "Next.js"]
---

When adding dark mode to a Tailwind CSS project, the most common approach is to use the `dark:` variant. This means prefixing all the relevant utility classes in your components—for example, `bg-white dark:bg-gray-900` or `text-black dark:text-white`. While this method works perfectly and gives you full control, it quickly becomes repetitive and hard to maintain—especially in a project where you're dealing with lots of content and components. Scattering `dark:` everywhere clutters your markup, increases noise in your HTML, and makes style changes across themes inefficent.

This tutorial show you how to implement dark mode in a Next.js blog using **Tailwind CSS v4**, taking advantage of new features that simplify theming. One of the biggest changes in v4 is that Tailwind can now be configured directly via a CSS file, rather than relying solely on a JavaScript config. This opens the door for a more elegant dark mode setup using **CSS variables**, reducing the need for bloated utility class prefixes and making your styles much easier to manage and override.

1. **Step 1: Define a Custom dark Variant with @custom-variant**
   Tailwind CSS v4 introduces a powerful feature called `@custom-variant`, which allows you to define your own variants beyond the default ones like hover, sm, or dark. To make dark mode work based on a `data-theme="dark"` attribute (instead of toggling a .dark class), you can define a custom dark variant like this:

```CSS
@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

```

This tells Tailwind to generate dark: variants that only apply when the element or any of its ancestors has data-theme="dark". Using :where() keeps specificity low, making it easier to override styles if needed.

This approach is cleaner and more flexible than the traditional .dark class. You can apply `data-theme="dark"` to the `<html>` or `<body>` element (or even individual components), and all dark styles will activate accordingly—no need to manipulate classes manually.

2. **Step 2: Define Your Color Palette with CSS Variables**

To start, we’ll define a custom color palette using CSS variables in your `global.css` file. This allows you to centralize your color definitions and easily switch themes (like dark mode) by simply swapping variable values. Tailwind CSS v4 supports using CSS variables directly in your utility classes, which makes this workflow smooth and scalable.

Open your `global.css` file, and add the following:

```CSS
@theme {
  --color-body: theme("colors.gray.700");
  --color-headings: theme("colors.gray.900");
  --color-links: theme("colors.gray.900");
  --color-bold: theme("colors.gray.900");

  --color-background: oklch(100% 0 0);
  --color-primary: oklch(0.14 0.005 285.823);
}

@layer base {
  @variant dark {
    --color-body: theme("colors.gray.300");
    --color-headings: theme("colors.white");
    --color-links: theme("colors.white");
    --color-bold: theme("colors.white");

    --color-background: oklch(0.2533 0.016 252.42);
    --color-primary: oklch(0.92 0.004 286.32);
  }
}
```

Here, we define a light and dark version of each key color. The `@theme` block sets the default (light mode), while the second block overrides them for dark mode. Later, we’ll toggle this .dark class using a theme switcher. With this setup, you’re no longer tied to utility-specific `dark:` variants—you can reference these variables throughout your Tailwind config or inline styles and update your themes dynamically.

3. **Step 3: Apply the Color Palette in Global Styles, Components, and Utilities**

With your CSS variables in place, it’s time to apply them throughout your project. Tailwind CSS v4 allows you to structure your styling cleanly using `@layer`, which has three categories: `base`, `components`, and `utilities`. This keeps your styles organized and theme-ready.

**Base Styles**

Use `@layer base` to apply global styles that affect the entire site:

```CSS
@layer base {
  :root {
    background-color: var(--color-background);
    color: var(--color-body);
  }

  h1, h2, h3 {
    color: var(--color-headings);
  }
}
```

These base rules apply your palette to fundamental elements like text and headings, adapting automatically when the `.dark` class is toggled.

**Custom Components**

Next, define reusable component styles using `@layer components`. For example, a custom button class:

```CSS
@layer components {
  .btn {
    @apply px-7 py-2 text-lg font-bold no-underline hover:opacity-80 transition-all duration-300;

    background-color: var(--color-primary);
    color: var(--color-primary-content);
  }
}
```

This keeps your design consistent, while still fully respecting your theme's palette.

**Custom Utilities**

You can even extend Tailwind with your own utility classes using `@layer utilities`. For example:

```CSS
@layer utilities {
  .header-border-color {
    border-color: var(--border-color);
  }
}
```

4. **Step 4: Set the Default Theme in Your Layout**

Now that we've defined our custom `dark` variant using `@custom-variant`, it's time to apply the `data-theme` attribute to enable theme switching in practice.

In your Next.js project, open your root layout file (typically `app/layout.tsx` or app/`layout.jsx` if you're using the App Router), and add `data-theme="light"` to the `<html>` tag:

```JSX
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
```

By setting `data-theme="light"` here, all the styles defined in your `:root` block will apply by default. And because we used a custom dark variant that watches for `data-theme="dark"`, you can now switch to dark mode simply by updating this attribute to `data-theme="dark"`.

5. **Step 5: Create a Theme Switcher**

Now that your layout is set up to use `data-theme`, the final step is to create a simple toggle component that lets users switch between light and dark themes dynamically. Since we’re applying the data-theme attribute to the `<html>` tag, we can manipulate it directly using JavaScript.

Here’s a basic `ThemeSwitcher` component. It also persists the theme in `localStorage`.

```JSX
"use client";

import { useState, useEffect } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Load stored theme on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const initialTheme = storedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  // Toggle and persist theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const Icon =
    theme === "light" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />;

  return (
    <button onClick={toggleTheme} className="text-2xl cursor-pointer">
      {Icon}
    </button>
  );
};

export default ThemeSwitcher;

```

You can place the `ThemeSwitcher` component anywhere in your website—typically in the header or footer—to give users quick access to switch between light and dark modes. Since it controls the theme at the root level (`<html data-theme="..." />`), the effect will apply globally across your entire site.
