import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GitHub, Instagram, Linkedin } from "react-feather";
import { Link } from "react-router-dom";

const experienceData = [
  { value: 1, label: "Years of Experience" },
  { value: 10, label: "Projects Completed" },
  { value: 3, label: "Tech Stacks" },
  { value: 30, label: "Cups of Coffee" },
];

const orbitTech = ["Angular", "React", "Next.js", "TypeScript", "Node.js"];

const marqueeTech = [
  "Angular",
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "Python",
  "Flask",
  "MySQL",
  "MongoDB",
  "Git",
  "GitHub",
  "REST APIs",
];

export default function Home() {
  const [counts, setCounts] = useState(experienceData.map(() => 0));
  const [cursorVisible, setCursorVisible] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typeWords = ["Joydeep Sen.", "a Fullstack Dev.", "a Thinker.", "a Problem Solver.", "a Builder."];
  const activeWord = typeWords[currentWordIndex];
  const displayedText = activeWord.slice(0, currentCharIndex);

  useEffect(() => {
    const blinkTimer = window.setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => window.clearInterval(blinkTimer);
  }, []);

  useEffect(() => {
    const speed = isDeleting ? 52 : 96;
    let timeoutId;

    if (!isDeleting && currentCharIndex < activeWord.length) {
      timeoutId = window.setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, speed);
    } else if (isDeleting && currentCharIndex > 0) {
      timeoutId = window.setTimeout(() => {
        setCurrentCharIndex((prev) => prev - 1);
      }, speed);
    } else if (!isDeleting && currentCharIndex === activeWord.length) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1400);
    } else if (isDeleting && currentCharIndex === 0) {
      timeoutId = window.setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % typeWords.length);
      }, 360);
    }

    return () => window.clearTimeout(timeoutId);
  }, [activeWord.length, currentCharIndex, isDeleting, typeWords.length]);

  useEffect(() => {
    let animationFrame;
    let startTime;
    const duration = 2200;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;

      setCounts(experienceData.map((item) => Math.floor(item.value * eased)));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/ResumeJoydeep1.pdf";
    link.download = "Joydeep_Sen_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const repeatedMarquee = useMemo(() => [...marqueeTech, ...marqueeTech], []);

  return (
    <section className="page-shell">
      <div className="page-inner">
        <div className="home-layout">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <h1 className="hero-title">
              <span className="gridless-zone">Hello, I&apos;m</span>
            </h1>
            <div className="hero-name-shell">
              <h2 className="hero-name">
                <span className="gridless-zone">
                  <span className={cursorVisible ? "type-caret" : ""}>{displayedText || "\u00A0"}</span>
                </span>
              </h2>
            </div>

            <p className="hero-desc">
              A passionate developer with a keen interest in web technologies. Check out my projects <Link to="/projects">HERE</Link>!
            </p>

            <div className="hero-actions snap-gap-1">
              <button className="btn-primary snap-control" type="button" onClick={downloadCV}>
                Download CV
              </button>
              <Link className="btn-outline snap-control" to="/projects">
                View Projects
              </Link>
            </div>

            <div className="hero-social">
              <a
                className="social-link snap-control"
                href="https://www.linkedin.com/in/joydeep-sen-518a38232/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
              <a
                className="social-link snap-control"
                href="https://github.com/Joyyojpeed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHub size={17} />
              </a>
              <a
                className="social-link snap-control"
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            <div className="profile-shell">
              <div className="profile-ring" />
              <img className="profile-image" src="/images/Profile.jpg" alt="Joydeep Sen" />

              <div className="profile-badge">
                <span className="profile-badge-dot" />
                Freelance: Available
              </div>

              <span className="tech-item" style={{ top: "-14px", left: "50%", transform: "translateX(-50%)" }}>
                {orbitTech[0]}
              </span>
              <span className="tech-item" style={{ top: "30%", right: "-35px" }}>
                {orbitTech[1]}
              </span>
              <span className="tech-item" style={{ right: "-24px", bottom: "65px" }}>
                {orbitTech[2]}
              </span>
              <span className="tech-item" style={{ left: "-40px", top: "42%" }}>
                {orbitTech[3]}
              </span>
              <span className="tech-item" style={{ left: "14px", bottom: "10px" }}>
                {orbitTech[4]}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="stats-grid">
          {experienceData.map((item, index) => (
            <div className="stat-card snap-card" key={item.label}>
              <div className="stat-number">{counts[index]}+</div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="marquee-wrap" aria-hidden="true">
          <div className="marquee-track">
            {repeatedMarquee.map((item, index) => (
              <span className="marquee-item" key={`${item}-${index}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
