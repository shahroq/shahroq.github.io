"use client";

import { useState, useEffect } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const ThemeSwitcher = () => {
  /*
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark") ?? "false")
  );
  */
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // localStorage.setItem("isDark", JSON.stringify(isDark));
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  return (
    <>
      <label className="swap swap-rotate">
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => setIsDark(isDark ? false : true)}
        />
        <MdOutlineLightMode className="swap-off text-3xl" />
        <MdOutlineDarkMode className="swap-on text-3xl" />
      </label>
    </>
  );
};

export default ThemeSwitcher;
