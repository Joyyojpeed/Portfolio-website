import { useEffect, useState } from "react";
import { Sun, Moon, Menu } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Header() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [ripple, setRipple] = useState(false);
  const [rippleStyle, setRippleStyle] = useState({});

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = (e) => {
    const button = e.currentTarget.getBoundingClientRect();
    const centerX = button.left + button.width / 2;
    const centerY = button.top + button.height / 2;

    setRippleStyle({
      position: 'fixed',
      top: `${centerY - 50}px`,
      left: `${centerX - 50}px`,
      transform: 'translate(-50%, -50%)',
    });

    setRipple(true);
    setTimeout(() => {
      setIsDark(!isDark);
      setRipple(false);
    }, 300);
  };

  return (
    <header
      className={`relative w-full z-50 shadow-sm transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-white"
      }`}
    >
      {/* Ripple Theme Toggle Transition */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            key="ripple"
            className="fixed pointer-events-none"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 20, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              ...rippleStyle,
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              background: isDark ? "#f9fafb" : "#111827",
              zIndex: 999,
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 pl-6 py-5 flex items-center justify-between relative">
        <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0 -ml-3">
          JS.
        </div>

        <div className="hidden md:flex items-center gap-8 text-xl font-medium">
          <nav className="flex space-x-8">
            {["/", "/resume", "/projects", "/contact"].map((path, idx) => (
              <Link
                key={path}
                to={path}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300"
              >
                {["Home", "Resume", "Projects", "Contact"][idx]}
              </Link>
            ))}
          </nav>

          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-md hover:scale-105 transition-transform"
            aria-label="Toggle theme"
          >
            <motion.div
              key={isDark ? "sun" : "moon"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="text-gray-800 dark:text-gray-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <Menu size={32} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`absolute top-full left-0 w-full ${
              isDark ? "bg-gray-800" : "bg-white"
            } px-6 py-4 space-y-4 shadow-lg z-40`}
          >
            {["/", "/resume", "/projects", "/contact"].map((path, idx) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2 transition duration-300"
              >
                {["Home", "Resume", "Projects", "Contact"][idx]}
              </Link>
            ))}

            <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
              <button
                onClick={toggleTheme}
                className="w-full p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-md flex items-center justify-center"
                aria-label="Toggle theme"
              >
                <motion.div
                  key={isDark ? "sun-mobile" : "moon-mobile"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </motion.div>
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
