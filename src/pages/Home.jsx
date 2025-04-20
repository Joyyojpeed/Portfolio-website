import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GitHub, Instagram } from "react-feather";
import { Linkedin as LinkedIn } from "react-feather";

export default function Home() {
  // Experience counters state
  const [loading, setLoading] = useState(true);
  const experienceData = [
    { value: 5, label: "years of experience" },
    { value: 10, label: "projects completed" },
    { value: 3, label: "tech stacks" },
    { value: 100, label: "cups of coffee" },
  ];
  const [counts, setCounts] = useState(experienceData.map(() => 0));

  // Typewriter effect state
  const [displayedName, setDisplayedName] = useState("");
  const fullName = "Joydeep Sen.";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const typingSpeed = isDeleting ? 75 : 150; 

  // Cursor blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Typewriter animation
  useEffect(() => {
    let timeout;

    if (!isDeleting && currentIndex < fullName.length) {
      // Typing forward
      timeout = setTimeout(() => {
        setDisplayedName(prev => prev + fullName[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
    } else if (isDeleting && currentIndex > 0) {
      // Deleting backward
      timeout = setTimeout(() => {
        setDisplayedName(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
      }, typingSpeed);
    } else if (currentIndex === fullName.length) {
      // Switch to deleting after pause
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (currentIndex === 0) {
      // Switch back to typing after pause
      timeout = setTimeout(() => setIsDeleting(false), 1000);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, typingSpeed]);

  // Experience counters animation
  useEffect(() => {
    const calculateDuration = (value) => {
      return 2000 + (6000 - 2000) * (value / 100);
    };

    const durations = experienceData.map(item => calculateDuration(item.value));
    const maxDuration = Math.max(...durations);
    const startTime = Date.now();
    let animationFrame;

    const animateCounters = () => {
      const elapsed = Date.now() - startTime;
      
      setCounts(prevCounts => {
        return prevCounts.map((_, index) => {
          const item = experienceData[index];
          const duration = calculateDuration(item.value);
          const progress = Math.min(elapsed / duration, 1);
          return Math.floor(progress * item.value);
        });
      });

      if (elapsed < maxDuration) {
        animationFrame = requestAnimationFrame(animateCounters);
      } else {
        setLoading(false);
      }
    };

    animationFrame = requestAnimationFrame(animateCounters);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/joydeep_sen_cv.pdf';
    link.download = 'Joydeep_Sen_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
      className="min-h-screen px-10 pt-2 pb-6 bg-white dark:bg-gray-900 text-black dark:text-white flex flex-col items-center"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-7xl gap-2 mt-2">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.h1
            className="text-4xl mb-1 sm:text-5xl lg:text-6xl font-extrabold text-blue-800 dark:text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Hello, I'm
          </motion.h1>

          {/* Typewriter Name */}
<div className="relative inline-block">
  <motion.h2
    className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-blue-600 dark:text-blue-400 mt-1 inline-flex items-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.2 }}
  >
    {displayedName}
    <span 
      className={`inline-block ml-1 h-12 sm:h-14 lg:h-16 w-1 bg-blue-600 dark:bg-blue-400 ${
        showCursor ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transition: 'opacity 0.1s ease',
        alignSelf: 'center' 
      }}
    />
  </motion.h2>
</div>

          <motion.p
            className="mt-12 text-lg sm:text-xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            A passionate developer with a keen interest in web technologies.
          </motion.p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <motion.button
              onClick={downloadCV}
              className="px-6 py-3 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-900 border-2 border-blue-600 dark:border-blue-400 rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Download CV
            </motion.button>
            <div className="flex space-x-3 items-center">
              <motion.a
                href="https://www.linkedin.com/in/joydeep-sen-518a38232/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              >
                <LinkedIn size={30} />
              </motion.a>
              
              <motion.a
                href="https://github.com/Joyyojpeed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              >
                <GitHub size={30} />
              </motion.a>
              
              <motion.a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1.2 }}
              >
                <Instagram size={30} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 flex justify-center items-start">
          <motion.div
            className="relative rounded-full w-[90%] sm:w-[80%] max-w-xs aspect-square overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 50, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              rotate: 0,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 255, 0.25)"
            }}
            transition={{ 
              duration: 1.5, 
              delay: 0.8,
              rotate: {
                type: "spring",
                stiffness: 50,
                damping: 10
              }
            }}
          >
            <motion.img
              src="/images/Profile.jpg"
              alt="Your Photo"
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
            <motion.div 
              className="absolute inset-0 rounded-full border-4 border-blue-400 opacity-0"
              animate={{
                opacity: [0, 0.3, 0],
                scale: [1, 1.05, 1.1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                delay: 1.5
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="mt-14 w-full max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {experienceData.map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md min-h-[70px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 + index * 0.2 }}
            >
              <div className="text-4xl font-bold text-blue-700 dark:text-blue-500">
                {Math.floor(counts[index])}+
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-300">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}