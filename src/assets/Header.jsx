import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "react-feather";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/resume", label: "Resume" },
  { path: "/projects", label: "Projects" },
  { path: "/contact", label: "Contact" },
];

function BulbIcon({ isDark }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M9 21h6M10 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M12 6v3M10.5 7.5l1.5 1.5 1.5-1.5"
        stroke={isDark ? "#60a5fa" : "#fbbf24"}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {!isDark && (
        <g opacity="1">
          <line x1="12" y1="1" x2="12" y2="0" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="17" y1="3" x2="18" y2="2" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="7" y1="3" x2="6" y2="2" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}

export default function Header({ isDark, onToggleTheme, themeToggleDisabled = false }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleThemeToggle = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    onToggleTheme({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setMenuOpen(false);
  };

  return (
    <header className="site-nav">
      <div className="nav-inner">
        <Link className="site-logo" to="/">
          JS<span>.</span>
        </Link>

        <div className="nav-cluster">
          <nav className="nav-links" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Link className="hire-btn" to="/contact">
            Hire Me
          </Link>

          <button
            type="button"
            className="theme-toggle"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
            disabled={themeToggleDisabled}
          >
            <BulbIcon isDark={isDark} />
          </button>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) => `mobile-menu-link${isActive ? " active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}

            <div className="mobile-menu-actions">
              <Link className="hire-btn" to="/contact" onClick={() => setMenuOpen(false)}>
                Hire Me
              </Link>
              <button
                type="button"
                className="theme-toggle"
                onClick={handleThemeToggle}
                aria-label="Toggle theme"
                disabled={themeToggleDisabled}
              >
                <BulbIcon isDark={isDark} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
