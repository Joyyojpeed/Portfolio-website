import React, { useState } from "react";
import { FiGithub, FiExternalLink, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

const projectData = [
  {
    id: 1,
    serial: "01",
    category: "Frontend Project",
    name: "Portfolio Website",
    description: "A sleek and responsive portfolio showcasing animation, interactivity, and modern tech.",
    techStack: "React, Tailwind CSS, Framer Motion, GSAP",
    image: "",
    github: "https://github.com/your-repo",
    live: "https://your-live-project.com",
  },
  {
    id: 2,
    serial: "02",
    category: "Full Stack Project",
    name: "Fooderu",
    description: "Food ordering platform with multi-user functionality and real-time menu management.",
    techStack: "Next.js, React, MongoDB Atlas, Tailwind CSS, AWS, RazorPay Gateway",
    image: "",
    github: "https://github.com/your-taskmanager",
    live: "https://your-taskmanager.com",
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const project = projectData[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? projectData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projectData.length - 1 ? 0 : prev + 1));
  };

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
      className="w-full flex justify-center pt-8 px-6 pb-16" // Reduced top padding
    >
      <div className="max-w-[1100px] w-full flex flex-col lg:flex-row justify-between gap-6">
        {/* Left Section - Moved up */}
        <div className="lg:w-1/2 w-full lg:pr-6 mt-4"> {/* Reduced top margin */}
          {/* Mobile Navigation Arrows - Moved closer to content */}
          <div className="lg:hidden flex gap-6 mb-2"> {/* Reduced bottom margin */}
            <button
              onClick={handlePrev}
              className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <FiArrowLeft className="text-xl text-gray-800 dark:text-white" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <FiArrowRight className="text-xl text-gray-800 dark:text-white" />
            </button>
          </div>

          <h1 className="text-8xl lg:text-9xl font-bold text-blue-600 dark:text-blue-300 opacity-40 mb-1"> {/* Reduced bottom margin */}
            {project.serial}
          </h1>
          <h2 className="text-3xl lg:text-4xl font-semibold mb-2 text-gray-700 dark:text-gray-300"> {/* Reduced bottom margin */}
            {project.category}
          </h2>
          <div className="mb-4"> {/* Reduced bottom margin */}
            <p className="text-sm lg:text-lg text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
          </div>
          <div className="mb-4"> {/* Reduced bottom margin */}
            <span className="text-sm uppercase tracking-widest text-blue-500">
              {project.techStack}
            </span>
          </div>
          <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-3" /> {/* Reduced bottom margin */}
          <div className="flex gap-4">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <FiExternalLink className="text-xl text-gray-800 dark:text-white" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <FiGithub className="text-xl text-gray-800 dark:text-white" />
            </a>
          </div>
        </div>

        {/* Right Section - Moved up and closer */}
        <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-end mt-0"> {/* Removed top margin */}
          <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center relative">
            <span className="text-gray-400 dark:text-gray-600 text-sm">Project Image</span>
          </div>
          
          {/* Desktop Navigation Arrows - Moved up */}
          <div className="hidden lg:flex gap-4 mt-2"> {/* Reduced top margin */}
            <button
              onClick={handlePrev}
              className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <FiArrowLeft className="text-xl text-gray-800 dark:text-white" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              <FiArrowRight className="text-xl text-gray-800 dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;