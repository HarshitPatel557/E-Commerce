import React, { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/images/hero1.jpg",
    title: "Welcome to Your Store",
    subtitle: "Discover amazing deals and products every day."
  },
  {
    id: 2,
    image: "/images/hero2.jpg",
    title: "Shop Smart, Live Better",
    subtitle: "Fast delivery, great prices."
  },
  {
    id: 3,
    image: "/images/hero3.jpg",
    title: "New Arrivals",
    subtitle: "Find the latest trends curated for you."
  }
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay content */}
          <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent flex flex-col justify-center px-12 md:px-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-lg md:text-2xl text-teal-200 mt-3">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-teal-600/60 hover:bg-teal-600 text-white p-3 rounded-full"
      >
        ❮
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-teal-600/60 hover:bg-teal-600 text-white p-3 rounded-full"
      >
        ❯
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`cursor-pointer w-3 h-3 rounded-full transition-all ${
              current === index
                ? "bg-teal-300 scale-125"
                : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default HeroSlider;
