import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Header from "./assets/Header";
import Footer from "./assets/Footer";
import TransitionOverlay from "./assets/TransitionOverlay";

function App() {
  const location = useLocation();
  const [showTransition, setShowTransition] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showFooter, setShowFooter] = useState(false); // New state for footer visibility
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const scrollPositions = useRef({});

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Save current scroll position
    scrollPositions.current[location.pathname] = window.scrollY;

    // Scroll to top BEFORE transition starts
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });

    setShowTransition(true);
    setShowContent(false);
  }, [location.pathname]);

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setShowContent(true);
    setShowFooter(true); // Show footer when transition completes

    setTimeout(() => {
      window.scrollTo({
        top: scrollPositions.current[location.pathname] || 0,
        behavior: 'auto'
      });
    }, 10);
  };

  useEffect(() => {
    // Hide footer during transitions
    if (showTransition) {
      setShowFooter(false);
    }
  }, [showTransition]);

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />
      
      {showTransition && (
        <TransitionOverlay 
          onComplete={handleTransitionComplete} 
          isDark={isDark}
        />
      )}

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="pt-20"
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer visible={showFooter} />
    </div>
  );
}

export default App;
