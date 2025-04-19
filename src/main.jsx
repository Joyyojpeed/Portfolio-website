import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // Import BrowserRouter
import App from "./App"; // Your main App component
import "./index.css"; // Tailwind and other styles
import AOS from 'aos'; // AOS animation library
import 'aos/dist/aos.css'; // AOS CSS

// Initialize AOS inside a functional component
function Main() {
  useEffect(() => {
    AOS.init({
      duration: 800,  // Animation duration in ms
      once: true,  // Animation happens once when the element comes into view
    });
  }, []);  // Empty dependency array means it runs only once after the first render

  return (
    <BrowserRouter>  {/* Wrap App in BrowserRouter */}
      <App />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
