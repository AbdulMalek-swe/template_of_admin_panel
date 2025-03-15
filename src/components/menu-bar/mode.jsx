import React, { useEffect, useState } from "react";

const ThemeColor = () => {
  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded bg-green-900 dark:bg-red-900 text-gray-800 dark:text-gray-200"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}sdfsdf 
      </button>
    </div>
  );
};

export default ThemeColor;
