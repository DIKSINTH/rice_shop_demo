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
      duration: 700,
      once: true,
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

  // Slideshow auto-change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="text-white font-bold text-lg sm:text-2xl tracking-wider z-20">
              MyBrand
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6 z-20">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-white px-2 sm:px-3 py-2 font-medium text-base sm:text-lg hover:text-purple-300 transition-colors duration-300"
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

        {/* Mobile Nav */}
        <div
          className={`md:hidden absolute top-14 sm:top-16 left-0 w-full bg-black/70 backdrop-blur-md overflow-hidden transition-all duration-500 ${
            isOpen ? "max-h-60" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col px-4 py-3 space-y-2">
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

      {/* Hero Section */}
      <section className="relative w-full h-[90vh] sm:h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            className={`w-full h-full object-cover transition-opacity duration-1000 ease-in-out absolute top-0 left-0 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}

        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-20 px-3 sm:px-6 text-center">
          <h1 className="text-white text-2xl sm:text-4xl md:text-6xl font-bold tracking-wide leading-snug sm:leading-tight">
            {text}
            <span className="animate-blink">|</span>
          </h1>
          <a
            href="#shop"
            className={`mt-4 sm:mt-6 bg-white text-purple-600 font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full text-base sm:text-lg transition-all duration-700 ${
              showButton
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            } hover:bg-purple-600 hover:text-white`}
          >
            Shop Now
          </a>
        </div>

        {/* Hero Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/40 p-2 sm:p-3 rounded-full hover:bg-purple-600 transition z-20"
        >
          &#10094;
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/40 p-2 sm:p-3 rounded-full hover:bg-purple-600 transition z-20"
        >
          &#10095;
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 sm:bottom-10 w-full flex justify-center space-x-2 sm:space-x-3 z-20">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-2.5 sm:w-4 h-2.5 sm:h-4 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-gray-400"
              }`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="relative w-full py-12 sm:py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
          <div
            className="w-full md:w-1/2 overflow-hidden rounded-lg shadow-lg transform transition duration-700 hover:scale-105"
            data-aos="fade-right"
          >
            <img
              src="/rice2.jpg"
              alt="Rice"
              className="w-full h-auto object-cover rounded-2xl"
              data-aos="flip-left"
            />
          </div>

          <div
            className="w-full md:w-1/2 text-white space-y-4 text-center md:text-left"
            data-aos="fade-left"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              Our Rice Story
            </h2>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed">
              For generations, our family has been dedicated to bringing premium
              quality rice directly to your table. Each grain is carefully
              selected, cleaned, and packed to ensure freshness, taste, and
              nutrition.
            </p>
            <p className="text-base sm:text-lg md:text-xl leading-relaxed">
              Whether it's for daily meals or special occasions, we promise rice
              that enhances every dish. Taste the difference and enjoy the
              richness of pure, wholesome grains with every bite.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        className="relative w-full py-12 sm:py-20 bg-gray-50"
        data-aos="fade-up"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 sm:mb-12"
            data-aos="flip-left"
          >
            FEATURED PRODUCT CATEGORIES
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Product 1 */}
            <div
              className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
              data-aos="fade-left"
            >
              <img
                src="/shop1.png"
                alt="Rice 1"
                className="w-full h-44 sm:h-56 object-cover rounded"
                data-aos="flip-left"
              />
              <h3 className="text-lg sm:text-xl font-semibold mt-4">Rice 1</h3>
              <p className="text-red-600 font-bold mt-2 text-sm sm:text-base">
                ₹399.00
              </p>
              <button className="mt-3 sm:mt-4 w-full bg-gray-900 text-white py-2 rounded hover:bg-purple-600 transition text-sm sm:text-base">
                🛒 ADD TO CART
              </button>
            </div>

            {/* Product 2 */}
            <div
              className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
              data-aos="fade-up"
            >
              <img
                src="/shop2.png"
                alt="Rice 2"
                className="w-full h-44 sm:h-56 object-cover rounded"
                data-aos="flip-left"
              />
              <h3 className="text-lg sm:text-xl font-semibold mt-4">Rice 2</h3>
              <p className="text-red-600 font-bold mt-2 text-sm sm:text-base">
                ₹499.00
              </p>
              <button className="mt-3 sm:mt-4 w-full bg-gray-900 text-white py-2 rounded hover:bg-purple-600 transition text-sm sm:text-base">
                🛒 ADD TO CART
              </button>
            </div>

            {/* Product 3 */}
            <div
              className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105"
              data-aos="fade-right"
            >
              <img
                src="/shop3.png"
                alt="Rice 3"
                className="w-full h-44 sm:h-56 object-cover rounded"
                data-aos="flip-left"
              />
              <h3 className="text-lg sm:text-xl font-semibold mt-4">Rice 3</h3>
              <p className="text-red-600 font-bold mt-2 text-sm sm:text-base">
                ₹799.00
              </p>
              <button className="mt-3 sm:mt-4 w-full bg-gray-900 text-white py-2 rounded hover:bg-purple-600 transition text-sm sm:text-base">
                🛒 ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 sm:py-8 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <h2 className="text-white font-bold text-lg sm:text-xl tracking-wide">
              MyBrand
            </h2>
            <div className="flex flex-wrap justify-center md:justify-start space-x-4 sm:space-x-6">
              <a
                href="#home"
                className="hover:text-purple-500 transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                className="hover:text-purple-500 transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="hover:text-purple-500 transition-colors"
              >
                Services
              </a>
              <a
                href="#contact"
                className="hover:text-purple-500 transition-colors"
              >
                Contact
              </a>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">
              © {new Date().getFullYear()} MyBrand. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Blinking cursor animation */}
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
