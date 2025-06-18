"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import { siteName } from "@/data/global";

const links = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  // { label: "Tst", href: "/tst" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = usePathname();

  const renderedLinks = links.map(({ label, href }) => {
    const isActive = href === currentPath;
    let classes = "rounded-md px-3 py-2 text-lg font-medium ";
    classes += isActive ? "active" : "";
    return (
      <Link
        key={label}
        aria-current={isActive ? "page" : undefined}
        href={href}
        className={`${classes}`}
      >
        {label}
      </Link>
    );
  });

  return (
    <nav className="bg-gray-800-">
      <div className="mx-auto max-w-7xl">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              id="burger"
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              {/* 
              Icon when menu is closed.
              Menu open: "hidden", Menu closed: "block"
              Icon when menu is open.
              Menu open: "block", Menu closed: "hidden"
              */}
              {!isOpen ? (
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <h3 className="flex shrink-0 items-center">{siteName}</h3>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">{renderedLinks}</div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      {isOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">{renderedLinks}</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
