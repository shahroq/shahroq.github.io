"use client";

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
  const currentPath = usePathname();

  const renderedLinks = links.map(({ label, href }) => (
    <li key={label}>
      <Link href={href} className={`${href === currentPath ? "active" : ""}`}>
        {label}
      </Link>
    </li>
  ));

  return (
    <div className="navbar navbar-custom">
      <div className="navbar-start flex items-center">
        {/* mobile menu */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="mr-3 lg:hidden rounded-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {renderedLinks}
          </ul>
        </div>

        <p className="btn- btn-ghost- text-2xl font-bold">{siteName}</p>

        <ul className="menu menu-horizontal px-1 hidden lg:flex">
          {renderedLinks}
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;
