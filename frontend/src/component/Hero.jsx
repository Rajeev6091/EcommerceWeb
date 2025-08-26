import React, { useEffect, useState } from 'react';
import { FaCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Background from './Background';

function Hero() {
  const [heroCount, setHeroCount] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Manual previous and next
  const handlePrev = () => {
    setHeroCount((prev) => (prev - 1 + 4) % 4);
  };

  const handleNext = () => {
    setHeroCount((prev) => (prev + 1) % 4);
  };

  return (
    <div className="relative w-full min-h-fit overflow-hidden mt-[150px]">
      {/* Background Image */}
      <Background heroCount={heroCount} />

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-3 rounded-full z-20 hover:bg-opacity-60 transition"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-3 rounded-full z-20 hover:bg-opacity-60 transition"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        {[0, 1, 2, 3].map((index) => (
          <FaCircle
            key={index}
            className={`w-[10px] h-[10px] cursor-pointer transition-all duration-300 ${heroCount === index ? 'fill-orange-400 scale-110' : 'fill-white'
              }`}
            onClick={() => setHeroCount(index)}
          />
        ))}
      </div>
    </div>


  );
}

export default Hero;
