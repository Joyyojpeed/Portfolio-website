import { motion } from "framer-motion";

export default function Footer({ visible = true }) {
  if (!visible) return null;

  return (
    <motion.footer 
      className={`w-full py-8 px-4 ${
        document.documentElement.classList.contains('dark') 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-blue-50 border-gray-200'
      } border-t`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }}
      exit={{ 
        opacity: 0, 
        y: 20,
        transition: { duration: 0.3 }
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Mobile View (centered) */}
        <div className="md:hidden flex flex-col items-center space-y-4 text-center">
          <p className={`text-sm ${
            document.documentElement.classList.contains('dark') 
              ? 'text-gray-300' 
              : 'text-gray-600'
          } flex items-center`}>
            Developed with <span className="text-red-500 mx-1 animate-pulse">❤</span> by Joydeep
          </p>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/Joyyojpeed" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${
                document.documentElement.classList.contains('dark') 
                  ? 'text-gray-300 hover:text-blue-400' 
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors`}
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/joydeep-sen-518a38232/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${
                document.documentElement.classList.contains('dark') 
                  ? 'text-gray-300 hover:text-blue-400' 
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors`}
            >
              LinkedIn
            </a>
            <a 
              href="mailto:jds472016@gmail.com" 
              className={`${
                document.documentElement.classList.contains('dark') 
                  ? 'text-gray-300 hover:text-blue-400' 
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors`}
            >
              Email
            </a>
          </div>
          
          <p className={`text-sm ${
            document.documentElement.classList.contains('dark') 
              ? 'text-gray-300' 
              : 'text-gray-600'
          }`}>
            © {new Date().getFullYear()} Joydeep Sen. All rights reserved.
          </p>
        </div>

        {/* Desktop View (left, center, right) - Shifted left with pl-8 */}
        <div className="hidden md:flex justify-between items-center pl-25"> {/* Added pl-8 here */}
          <div className="flex space-x-6">
            <a 
              href="https://github.com/Joyyojpeed" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${
                document.documentElement.classList.contains('dark') 
                  ? 'text-gray-300 hover:text-blue-400' 
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors`}
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/joydeep-sen-518a38232/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${
                document.documentElement.classList.contains('dark') 
                  ? 'text-gray-300 hover:text-blue-400' 
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors`}
            >
              LinkedIn
            </a>
            <a 
              href="mailto:jds472016@gmail.com" 
              className={`${
                document.documentElement.classList.contains('dark') 
                  ? 'text-gray-300 hover:text-blue-400' 
                  : 'text-gray-600 hover:text-blue-600'
              } transition-colors`}
            >
              Email
            </a>
          </div>
          
          <p className={`text-sm ${
            document.documentElement.classList.contains('dark') 
              ? 'text-gray-300' 
              : 'text-gray-600'
          }`}>
            © {new Date().getFullYear()} Joydeep Sen. All rights reserved.
          </p>
          
          <p className={`text-sm ${
            document.documentElement.classList.contains('dark') 
              ? 'text-gray-300' 
              : 'text-gray-600'
          } flex items-center`}>
            Developed with <span className="text-red-500 mx-1 animate-pulse">❤</span> by Joydeep
          </p>
        </div>
      </div>
    </motion.footer>
  );
}