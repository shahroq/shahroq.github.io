"use client";

import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { useEffect } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  useEffect(() => {
    setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, setTheme]);

  const Icon =
    theme === "light" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="text-2xl cursor-pointer"
    >
      {Icon}
    </button>
  );
};

export default ThemeSwitcher;
