import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin } from "react-feather";
import { 
  SiAngular, SiReact, SiNextdotjs, SiTypescript,
  SiNodedotjs, SiExpress, SiPython, SiFlask,
  SiMysql, SiMongodb, SiGit, SiGithub, SiPostman
} from "react-icons/si";

const resumeSections = ["Education", "Experience", "Skills", "About Me"];

export default function Resume() {
  const [activeSection, setActiveSection] = useState("Education");
  const [activeSkillCategory, setActiveSkillCategory] = useState("Frontend");

  const educationItems = [
    { 
      date: "2021 - 2025", 
      title: "B.Tech in Computer Science", 
      location: "Chandigarh University",
      details: ["Specialization in Full Stack Development"]
    },
    { 
      date: "2020 - 2021", 
      title: "Higher Secondary (CBSE)", 
      location: "B.D.M International" 
    },
    { 
      date: "2019 - 2020", 
      title: "Secondary School (CBSE)", 
      location: "B.D.M International" 
    }
  ];

  const experienceItems = [
    {  
      date: "2021 - Present", 
      title: "Angular Developer", 
      location: "Reliance, Navi Mumbai", },
    { date: "2022 - 2023", title: "Intern - Web Dev", location: "Startup Inc" },
    { date: "2021", title: "Freelancer", location: "Remote" },
    { date: "2020", title: "Open Source Contributor", location: "GitHub" },
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
    ]
  };

  const aboutMe = [
    { label: "Name", value: "Joydeep Sen" },
    { label: "Experience", value: "5 Years" },
    { label: "Nationality", value: "Indian" },
    { label: "Phone", value: "+91 1234567890" },
    { label: "Email", value: "joydeep@example.com" },
    { label: "Languages", value: "English, Hindi" },
    { label: "Freelance", value: "Available" },
    { label: "GitHub", value: "github.com/joydeepsen" },
  ];

 // Resume.jsx

const renderGrid = (items, type) => (
  <div
    className={`
      grid 
      ${type === 'Skills' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'} 
      gap-3 
      max-h-[400px] 
      overflow-y-auto 
      custom-scrollbar
    `}
  >
    {items.map((item, index) => (
      <motion.div
        key={index}
        className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm h-full min-h-[100px] flex flex-col justify-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        {type === "Skills" ? (
          <div className="flex flex-col items-center justify-center gap-2 p-2">
            <div className="text-3xl">{item.icon}</div>
            <div className="text-center text-sm font-medium text-blue-600 dark:text-blue-400 break-words">
              {item.name}
            </div>
          </div>
        ) : (
          <>
            <div className="text-xs font-semibold text-gray-500">{item.date}</div>
            <div className="text-sm font-bold text-blue-700 mt-1 break-words">{item.title}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1 mt-1">
              <MapPin size={12} /> {item.location}
            </div>
          </>
        )}
      </motion.div>
    ))}
  </div>
);


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        duration: 0.5
      }}
      className="min-h-screen px-6 pt-12 pb-8 bg-white dark:bg-gray-900 text-black dark:text-white"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-6rem)]">
        {/* Left Nav */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          <h2 className="text-4xl font-bold text-blue-600">Why Hire Me?</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            I'm a passionate developer who blends creativity and technical skill to build intuitive, impactful digital experiences.
          </p>
          <div className="flex flex-col gap-2">
            {resumeSections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`text-left px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
                  activeSection === section
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-2/3 flex flex-col">
          {activeSection === "Education" && (
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-blue-700">Education</h3>
              <p className="text-xs text-gray-500 dark:text-gray-300">My academic journey</p>
              {renderGrid(educationItems)}
            </div>
          )}

          {activeSection === "Experience" && (
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-blue-700">Experience</h3>
              <p className="text-xs text-gray-500 dark:text-gray-300">Work history</p>
              {renderGrid(experienceItems)}
            </div>
          )}

          {activeSection === "Skills" && (
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-blue-700">Skills</h3>
              <p className="text-xs text-gray-500 dark:text-gray-300">Technologies I use</p>
              
              {/* Skill Category Buttons */}
              <div className="flex flex-wrap gap-2 mt-4">
                {Object.keys(skillCategories).map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveSkillCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeSkillCategory === category
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Skills Grid */}
              {renderGrid(skillCategories[activeSkillCategory], "Skills")}
            </div>
          )}

          {activeSection === "About Me" && (
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-blue-700">About Me</h3>
              <p className="text-xs text-gray-500 dark:text-gray-300">Personal details</p>
              <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {aboutMe.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="text-sm font-semibold text-blue-600 min-w-[100px]">{item.label}:</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}