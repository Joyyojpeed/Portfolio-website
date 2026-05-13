import { useEffect } from "react";

const TOTAL_DURATION = 2200;
const INITIAL_DURATION = 1800;
const REVEAL_AT = Math.floor(TOTAL_DURATION * 0.7);
const INITIAL_REVEAL_AT = Math.floor(INITIAL_DURATION * 0.65);

export default function TransitionOverlay({ active, theme = "dark", onComplete, onReveal, initialLoad }) {
  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const duration = initialLoad ? INITIAL_DURATION : TOTAL_DURATION;
    const revealAt = initialLoad ? INITIAL_REVEAL_AT : REVEAL_AT;

    const revealTimer = window.setTimeout(() => {
      if (onReveal) {
        onReveal();
      }
    }, revealAt);

    const endTimer = window.setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(endTimer);
    };
  }, [active, onComplete, onReveal, initialLoad]);

  if (!active) {
    return null;
  }

  const panelColor = theme === "dark" ? "#e2e8f0" : "#0f172a";
  const lineColor = theme === "dark" ? "#1e3a8a" : "#c084fc";
  const lineColorAlt = theme === "dark" ? "#3b82f6" : "#a855f7";
  const variant = initialLoad ? "initial" : "";

  return (
    <div
      className={`route-transition ${variant}`}
      aria-hidden="true"
      style={{
        "--rt-line": lineColor,
        "--rt-line-alt": lineColorAlt,
      }}
    >
      <div className="rt-panel rt-panel-top" style={{ background: panelColor }} />
      <div className="rt-panel rt-panel-bottom" style={{ background: panelColor }} />
      <div className="rt-center-line" />
    </div>
  );
}
