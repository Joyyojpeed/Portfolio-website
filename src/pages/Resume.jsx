import { useState } from "react";
import {
  SiAngular,
  SiExpress,
  SiFlask,
  SiGit,
  SiGithub,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";

const educationItems = [
  {
    date: "2021 - 2025",
    title: "B.Tech in Computer Science",
    location: "Chandigarh University",
    details: ["Specialization in Full Stack Development"],
  },
  {
    date: "2020 - 2021",
    title: "Higher Secondary (CBSE)",
    location: "B.D.M International",
  },
  {
    date: "2019 - 2020",
    title: "Secondary School (CBSE)",
    location: "B.D.M International",
  },
];

const experienceItems = [
  {
    date: "2021 - Present",
    title: "Angular Developer",
    location: "Reliance, Navi Mumbai",
  },
  {
    date: "2022 - 2023",
    title: "Intern - Web Dev",
    location: "Startup Inc",
  },
  {
    date: "2021",
    title: "Freelancer",
    location: "Remote",
  },
  {
    date: "2020",
    title: "Open Source Contributor",
    location: "GitHub",
  },
];

const skillCategories = {
  Frontend: [
    { name: "Angular", icon: <SiAngular className="text-red-500" /> },
    { name: "React", icon: <SiReact className="text-blue-500" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-black dark:text-white" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
  ],
  Backend: [
    { name: "Node.js", icon: <SiNodedotjs className="text-green-600" /> },
    { name: "Express", icon: <SiExpress className="text-gray-800 dark:text-gray-300" /> },
    { name: "Python", icon: <SiPython className="text-blue-400" /> },
    { name: "Flask", icon: <SiFlask className="text-gray-400" /> },
  ],
  Databases: [
    { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
  ],
  Tools: [
    { name: "Git", icon: <SiGit className="text-orange-600" /> },
    { name: "GitHub", icon: <SiGithub className="text-black dark:text-white" /> },
    { name: "REST APIs", icon: <SiPostman className="text-orange-500" /> },
  ],
};

const aboutMe = [
  { label: "Name", value: "Joydeep Sen" },
  { label: "Experience", value: "Skillfully-Fresher" },
  { label: "Nationality", value: "Indian" },
  { label: "Phone", value: "+91 7596923557" },
  { label: "Email", value: "jds472016@gmail.com" },
  { label: "Languages", value: "English, Hindi, Bengali" },
  { label: "Freelance", value: "Available" },
  { label: "GitHub", value: "https://github.com/Joyyojpeed" },
];

function TimelineList({ items }) {
  return (
    <div>
      {items.map((item) => (
        <article key={`${item.date}-${item.title}`} className="timeline-item">
          <div className="timeline-date">{item.date}</div>
          <h3 className="timeline-title">{item.title}</h3>
          <div className="timeline-location">{item.location}</div>
          {item.details?.length ? <p className="timeline-desc">{item.details.join(" ")}</p> : null}
        </article>
      ))}
    </div>
  );
}

export default function Resume() {
  const [activeSkillCategory, setActiveSkillCategory] = useState("Frontend");

  return (
    <section className="page-shell">
      <div className="page-inner">
        <div className="section-header">
          <span className="section-number">01</span>
          <h1 className="section-title">
            <span className="gridless-zone">Resume</span>
          </h1>
          <div className="section-divider" />
        </div>

        <div className="card-surface about-card resume-block snap-card">
          <div>
            <div className="resume-col-title" style={{ marginBottom: "14px" }}>
              Why Hire Me?
            </div>
            <p className="about-text">
              I&apos;m a passionate developer who blends creativity and technical skill to build intuitive, impactful digital experiences.
            </p>
          </div>
        </div>

        <div className="resume-grid resume-block">
          <div>
            <div className="resume-col-title">Education</div>
            <TimelineList items={educationItems} />
          </div>

          <div>
            <div className="resume-col-title">Experience</div>
            <TimelineList items={experienceItems} />
          </div>
        </div>

        <div className="resume-block">
          <div className="section-header" style={{ marginBottom: "14px" }}>
            <span className="section-number" />
            <h2 className="section-title" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              <span className="gridless-zone">Skills</span>
            </h2>
            <div className="section-divider" />
          </div>

          <p className="section-kicker">Technologies I use</p>

          <div className="skills-tabs">
            {Object.keys(skillCategories).map((category) => (
              <button
                key={category}
                type="button"
                className={`skill-tab snap-control${activeSkillCategory === category ? " active" : ""}`}
                onClick={() => setActiveSkillCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="skills-grid">
            {skillCategories[activeSkillCategory].map((skill) => (
              <div className="skill-card snap-card" key={skill.name}>
                <div className="skill-icon">{skill.icon}</div>
                <div className="skill-name">{skill.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="resume-block">
          <div className="resume-col-title">About Me</div>
          <div className="about-details">
            {aboutMe.map((item) => (
              <div className="about-item snap-card" key={item.label}>
                <div className="about-label">{item.label}</div>
                <div className="about-value">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
