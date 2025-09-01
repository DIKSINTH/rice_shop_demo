import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  const [text, setText] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    AOS.init({
      duration: 700, // animation duration in ms
      once: true, // whether animation should happen only once
    });
  }, []);

  const phrases = [
    "Welcome to My Rice Shop - Fresh & Premium Quality!",
    "Get the Best Rice Delivered to Your Doorstep.",
    "Healthy, Organic, and Delicious Rice for Your Family.",
  ];

  const typingSpeed = 100;
  const pauseTime = 1500;

  const navLinks = ["Home", "About", "Services", "Contact"];

  // Slideshow images from public folder
  const slides = [
    "/slide1.jpg",
    "/slide2.jpg",
    "/slide3.jpg",
    "/slide4.jpg",
    "/slide5.jpg",
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  // Typing effect
  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let typing = true;

    const type = () => {
      if (typing) {
        setText((prev) => prev + phrases[phraseIndex][charIndex]);
        charIndex++;
        if (charIndex === phrases[phraseIndex].length) {
          typing = false;
          setShowButton(true);
          setTimeout(type, pauseTime);
          return;
        }
      } else {
        setText((prev) => prev.slice(0, -1));
        charIndex--;
        if (charIndex === 0) {
          typing = true;
          setShowButton(false);
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
      setTimeout(type, typingSpeed);
    };

    type();
  }, []);

  // Simple slideshow auto-change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="relative w-full bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/rice.jpg')" }}
    >
      {/* Navbar */}
      <header className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-white font-bold text-2xl tracking-wider z-20">
              MyBrand
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8 z-20">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-white px-3 py-2 font-medium text-lg hover:text-purple-300 transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-20"
              onClick={toggleMenu}
            >
              <span
                className={`block h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-white transition-all duration-300 ease-in-out ${
                  isOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-full bg-white transform transition duration-300 ease-in-out ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-16 left-0 w-full bg-black/70 backdrop-blur-md overflow-hidden transition-all duration-500 ${
            isOpen ? "max-h-60" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white py-2 px-3 rounded-md font-medium hover:bg-white hover:text-purple-600 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Typing Text + Button */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen space-y-6">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center tracking-wide">
          {text}
          <span className="animate-blink">|</span>
        </h1>

        <a
          href="#shop"
          className={`bg-white text-purple-600 font-bold px-6 py-3 rounded-full text-lg transition-all duration-700 ${
            showButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          } hover:bg-purple-600 hover:text-white`}
        >
          Shop Now
        </a>
      </div>

      {/* Story Section */}
      <section className="relative w-full py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div
              className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-lg transform transition duration-700 hover:scale-105"
              data-aos="fade-right"
            >
              <img
                src="/rice2.jpg"
                alt="Rice"
                className="w-full h-auto object-cover"
              />
            </div>

            <div
              className="w-full md:w-1/2 text-white space-y-4"
              data-aos="fade-left"
            >
              <h2 className="text-3xl md:text-4xl font-bold">Our Rice Story</h2>
              <p className="text-lg md:text-xl leading-relaxed">
                For generations, our family has been dedicated to bringing
                premium quality rice directly to your table. Each grain is
                carefully selected, cleaned, and packed to ensure freshness,
                taste, and nutrition.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Whether it's for daily meals or special occasions, we promise
                rice that enhances every dish. Taste the difference and enjoy
                the richness of pure, wholesome grains with every bite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Slideshow */}
      <section
        className="relative w-[70vw] h-[80vh] max-w-4xl mx-auto py-20 bg-black/80 rounded-lg"
        data-aos="fade-up-left"
      >
        <div className="relative flex items-center justify-center">
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full"
          >
            &#10094;
          </button>

          <img
            src={slides[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-64 md:h-96 object-cover rounded-full"
          />

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full"
          >
            &#10095;
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-white" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* Animations */}
      <style>
        {`
          @keyframes blink {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0; }
          }
          .animate-blink { display: inline-block; animation: blink 1s infinite; }
        `}
      </style>
    </div>
  );
};

export default Header;
