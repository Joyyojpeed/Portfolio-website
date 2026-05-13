import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Header from "./assets/Header";
import Footer from "./assets/Footer";
import TransitionOverlay from "./assets/TransitionOverlay";
import CustomCursor from "./assets/CustomCursor";
import NeonBackground from "./assets/NeonBackground";

function App() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return true;
  });

  const [transitionState, setTransitionState] = useState(() => ({
    active: true,
    contentHidden: true,
    initialLoad: true,
    origin: {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    },
    key: 0,
  }));
  const [isThemeAnimating, setIsThemeAnimating] = useState(false);
  const themeToggleTimers = useRef([]);
  const themeToggleListeners = useRef([]);
  const shellRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    return () => {
      themeToggleTimers.current.forEach((timer) => window.clearTimeout(timer));
      themeToggleTimers.current = [];
      themeToggleListeners.current.forEach((listener) => listener());
      themeToggleListeners.current = [];
      document.querySelectorAll(".theme-clone-layer").forEach((layer) => layer.remove());
    };
  }, []);

  useEffect(() => {
    setTransitionState((prev) => ({
      ...prev,
      active: true,
      contentHidden: true,
      initialLoad: prev.key === 0,
      key: prev.key + 1,
      origin: {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      },
    }));

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  const handleTransitionReveal = () => {
    setTransitionState((prev) => ({ ...prev, contentHidden: false }));
  };

  const handleTransitionComplete = () => {
    setTransitionState((prev) => ({ ...prev, active: false, contentHidden: false, initialLoad: false }));
  };

  const handleThemeToggle = (origin) => {
    if (isThemeAnimating) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nextIsDark = !isDark;

    if (reduceMotion) {
      setIsDark(nextIsDark);
      return;
    }

    const source = shellRef.current;
    if (!source) {
      setIsDark(nextIsDark);
      return;
    }

    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? window.innerHeight / 2;
    const maxX = Math.max(x, window.innerWidth - x) + 24;
    const maxY = Math.max(y, window.innerHeight - y) + 24;
    const radius = Math.ceil(Math.hypot(maxX, maxY));
    const duration = 1000;
    const switchAt = 650;
    const teardownAt = 1080;

    themeToggleTimers.current.forEach((timer) => window.clearTimeout(timer));
    themeToggleTimers.current = [];
    themeToggleListeners.current.forEach((listener) => listener());
    themeToggleListeners.current = [];
    setIsThemeAnimating(true);

    document.querySelectorAll(".theme-clone-layer").forEach((layer) => layer.remove());

    const wrapper = document.createElement("div");
    wrapper.className = "theme-clone-layer";
    wrapper.style.setProperty("--clip-x", `${x}px`);
    wrapper.style.setProperty("--clip-y", `${y}px`);
    wrapper.style.setProperty("--clip-radius", `${radius}px`);
    wrapper.style.setProperty("--theme-duration", `${duration}ms`);

    const clone = source.cloneNode(true);
    clone.classList.add("theme-clone-content");
    clone.classList.toggle("dark", nextIsDark);
    clone.classList.add(nextIsDark ? "theme-dark" : "theme-light");
    clone
      .querySelectorAll(
        ".cursor-dot, .cursor-ring, .theme-clone-layer, .route-transition, .neon-bg-layer",
      )
      .forEach((node) => node.remove());
    clone.style.transform = `translateY(-${window.scrollY}px)`;

    const syncScroll = () => {
      clone.style.transform = `translateY(-${window.scrollY}px)`;
    };
    window.addEventListener("scroll", syncScroll, { passive: true });
    themeToggleListeners.current.push(() => window.removeEventListener("scroll", syncScroll));

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    // Sync the typewriter text in the clone with the live DOM
    const liveTypewriter = source.querySelector(".hero-name .gridless-zone > span");
    const cloneTypewriter = clone.querySelector(".hero-name .gridless-zone > span");
    if (liveTypewriter && cloneTypewriter) {
      const syncTypewriter = window.setInterval(() => {
        cloneTypewriter.textContent = liveTypewriter.textContent;
        cloneTypewriter.className = liveTypewriter.className;
      }, 50);
      themeToggleListeners.current.push(() => window.clearInterval(syncTypewriter));
    }

    window.requestAnimationFrame(() => {
      wrapper.classList.add("anim");
    });

    themeToggleTimers.current.push(window.setTimeout(() => setIsDark(nextIsDark), switchAt));
    themeToggleTimers.current.push(
      window.setTimeout(() => {
        themeToggleListeners.current.forEach((listener) => listener());
        themeToggleListeners.current = [];
        wrapper.remove();
        setIsThemeAnimating(false);
      }, teardownAt),
    );
  };

  return (
    <div className="site-shell" ref={shellRef}>
      <NeonBackground isDark={isDark} elevated={isThemeAnimating} />
      <CustomCursor />

      <Header isDark={isDark} onToggleTheme={handleThemeToggle} themeToggleDisabled={isThemeAnimating} />

      {transitionState.active && (
        <TransitionOverlay
          key={transitionState.key}
          active={transitionState.active}
          theme={isDark ? "dark" : "light"}
          origin={transitionState.origin}
          onReveal={handleTransitionReveal}
          onComplete={handleTransitionComplete}
          initialLoad={transitionState.initialLoad}
        />
      )}

      <main className="site-main">
        <div className="route-stage" style={{ visibility: transitionState.contentHidden ? "hidden" : "visible" }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>

      <Footer visible={!transitionState.active} />
    </div>
  );
}

export default App;
