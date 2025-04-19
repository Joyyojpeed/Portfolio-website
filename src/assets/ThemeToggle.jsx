import { useEffect, useState } from "react";
import { Sun, Moon } from "react-feather";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="transition-transform duration-300 hover:scale-110"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
