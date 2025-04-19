import { useEffect, useState } from "react";
import gsap from "gsap";

export default function TransitionOverlay({ onComplete }) {
  const [isDark, setIsDark] = useState(false);

  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ["class"] 
    });
    return () => observer.disconnect();
  }, []);

  // Animation logic
  useEffect(() => {
    const panels = gsap.utils.toArray(".panel");
    const timeline = gsap.timeline();
    const panelCount = panels.length;
    const dropDuration = 0.8;
    const riseDuration = 0.4;
    const stagger = 0.12;

    // Drop down in sequence (1→6)
    panels.forEach((panel, index) => {
      timeline.to(panel, {
        bottom: 0,
        duration: dropDuration,
        ease: "power2.out"
      }, index * stagger);
    });

    // Rise up in same order (1→6)
    panels.forEach((panel, index) => {
      timeline.to(panel, {
        bottom: "100%",
        duration: riseDuration,
        ease: "power2.in",
        onComplete: index === panelCount - 1 ? () => {
          panels.forEach(p => p.remove());
          if (onComplete) onComplete();
        } : undefined
      }, dropDuration + (index * stagger));
    });

    return () => timeline.kill();
  }, [onComplete]);

  // Color settings
  const panelColor = isDark ? "#2563eb" : "#3b82f6";
  const secondaryColor = isDark ? "#1e40af" : "#93c5fd";

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-y-auto">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="panel absolute w-1/6 h-[150%] bottom-full"
          style={{
            left: `${i * (100/6)}%`,
            background: `linear-gradient(to bottom, 
              ${panelColor} 0%, 
              ${secondaryColor} 100%)`,
            boxShadow: `0 0 10px ${isDark ? 
              "rgba(37, 99, 235, 0.7)" : 
              "rgba(59, 130, 246, 0.5)"}`
          }}
        />
      ))}
    </div>
  );
}