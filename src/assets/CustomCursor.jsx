import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, input, textarea, select, [role='button'], .skill-card, .project-row, .theme-toggle, .menu-toggle";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const animationRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("custom-cursor-enabled");
      return undefined;
    }

    document.body.classList.add("custom-cursor-enabled");

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const setHidden = (hidden) => {
      if (!dot || !ring) {
        return;
      }

      dot.style.opacity = hidden ? "0" : "1";
      ring.style.opacity = hidden ? "0" : "0.5";
    };

    const setActive = (active) => {
      if (!dot || !ring) {
        return;
      }

      dot.classList.toggle("active", active);
      ring.classList.toggle("active", active);
    };

    const handlePointerMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      if (dot) {
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
      }

      setHidden(false);
    };

    const handlePointerOver = (event) => {
      const isInteractive = !!event.target?.closest?.(INTERACTIVE_SELECTOR);
      setActive(isInteractive);
    };

    const handlePointerOut = (event) => {
      const fromInteractive = !!event.target?.closest?.(INTERACTIVE_SELECTOR);
      const toInteractive = !!event.relatedTarget?.closest?.(INTERACTIVE_SELECTOR);

      if (fromInteractive && !toInteractive) {
        setActive(false);
      }
    };

    const handleLeave = () => {
      setHidden(true);
      setActive(false);
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ring) {
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
      }

      animationRef.current = window.requestAnimationFrame(animateRing);
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("mouseleave", handleLeave);
    window.addEventListener("blur", handleLeave);

    setHidden(true);
    animateRing();

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("blur", handleLeave);

      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
