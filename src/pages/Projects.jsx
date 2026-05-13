import { useEffect, useState } from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const projectData = [
  {
    id: 1,
    serial: "01",
    category: "Frontend Project",
    name: "Portfolio Website",
    description: "A sleek and responsive portfolio showcasing animation, interactivity, and modern tech.",
    techStack: "React, Tailwind CSS, Framer Motion, GSAP",
    image: "/images/Frontend.png",
    github: "https://github.com/Joyyojpeed/Portfolio-website",
    live: "https://jsen.vercel.app/",
  },
  {
    id: 2,
    serial: "02",
    category: "Full Stack Project",
    name: "Fooderuu",
    description:
      "Food ordering platform with multi-user functionality real-time menu management, payment integration with robust user authentication.",
    techStack: "Next.js, React, MongoDB Atlas, Tailwind CSS, AWS, RazorPay Gateway",
    image: "/images/FooderuuImage.png",
    github: "https://github.com/Joyyojpeed/Fooderuu",
    live: "https://fooderuu.vercel.app/",
  },
];

export default function Projects() {
  const [preview, setPreview] = useState({
    visible: false,
    x: 0,
    y: 0,
    src: "",
  });
  const [previewEnabled, setPreviewEnabled] = useState(false);

  useEffect(() => {
    setPreviewEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const handleMouseEnter = (src) => {
    if (!previewEnabled) {
      return;
    }

    setPreview((prev) => ({ ...prev, visible: true, src }));
  };

  const handleMouseMove = (event) => {
    if (!previewEnabled) {
      return;
    }

    setPreview((prev) => ({
      ...prev,
      x: event.clientX + 28,
      y: event.clientY - 92,
    }));
  };

  const handleMouseLeave = () => {
    if (!previewEnabled) {
      return;
    }

    setPreview((prev) => ({ ...prev, visible: false }));
  };

  return (
    <section className="page-shell">
      <div className="page-inner">
        <div className="section-header">
          <span className="section-number">02</span>
          <h1 className="section-title">
            <span className="gridless-zone">Projects</span>
          </h1>
          <div className="section-divider" />
        </div>

        <div className="projects-list">
          {projectData.map((project) => (
            <article
              key={project.id}
              className="project-row snap-card"
              onMouseEnter={() => handleMouseEnter(project.image)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="project-serial">{project.serial}</div>

              <div>
                <h2 className="project-name">{project.name}</h2>
                <div className="project-category">{project.category}</div>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.techStack.split(",").map((tag) => (
                    <span className="project-tag" key={`${project.id}-${tag.trim()}`}>
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-links">
                <a
                  className="project-link snap-control"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} live demo`}
                >
                  <FiExternalLink size={17} />
                </a>
                <a
                  className="project-link snap-control"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.name} source code`}
                >
                  <FiGithub size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {previewEnabled && (
        <div
          className={`projects-preview${preview.visible ? " show" : ""}`}
          style={{ left: `${preview.x}px`, top: `${preview.y}px` }}
          aria-hidden="true"
        >
          {preview.src ? <img src={preview.src} alt="Project preview" /> : null}
        </div>
      )}
    </section>
  );
}
