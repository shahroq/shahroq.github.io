"use client";

import Link from "next/link";
import { FaSquareFull, FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import { siteName } from "@/data/global";
import { useState } from "react";

const links = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  // { label: "Tst", href: "/tst" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const currentPath = usePathname();

  const renderedLinks = links.map(({ label, href }) => (
    <li key={label}>
      <Link href={href} className={`${href === currentPath ? "active" : ""}`}>
        {label}
      </Link>
    </li>
  ));

  return (
    <nav className="navbar-main navbar-custom flex space-x-6 h-14 items-center max-md:justify-between">
      {/* Hamburger Button */}
      <div className="flex items-center md:hidden">
        <button
          id="menu-btn"
          className="text-gray-700 dark:text-gray-200 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <ul
        id="mobile-menu"
        className={`md:hidden px-4 py-4 mr-0 absolute left-5 top-10 bg-white dark:bg-gray-600 shadow-md rounded-md z-50 ${
          isOpen ? "" : "hidden"
        }`}
      >
        {renderedLinks}
      </ul>

      {/* Logo */}
      <div className="text-2xl font-bold flex space-x-2 items-center">
        <FaSquareFull className="text-sm" />
        <p>{siteName}</p>
      </div>

      {/* Links */}
      <ul className="hidden md:flex space-x-6">{renderedLinks}</ul>

      {/* Theme Switcher */}
      <div className="md:ml-auto">
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
