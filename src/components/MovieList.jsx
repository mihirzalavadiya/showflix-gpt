import React, { useState, useRef, useEffect } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollAmount, setScrollAmount] = useState(320);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Update scroll amount and items per page based on screen size
  useEffect(() => {
    const updateScrollSettings = () => {
      const width = window.innerWidth;

      if (width < 640) {
        // Mobile
        setScrollAmount(280); // Card width + gap for mobile
        setItemsPerPage(1);
      } else if (width < 768) {
        // Small tablet
        setScrollAmount(300);
        setItemsPerPage(2);
      } else if (width < 1024) {
        // Tablet
        setScrollAmount(320);
        setItemsPerPage(3);
      } else if (width < 1280) {
        // Desktop
        setScrollAmount(320);
        setItemsPerPage(4);
      } else {
        // Large desktop
        setScrollAmount(320);
        setItemsPerPage(5);
      }
    };

    updateScrollSettings();
    window.addEventListener('resize', updateScrollSettings);

    return () => window.removeEventListener('resize', updateScrollSettings);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      if (currentPage > 0) setCurrentPage(currentPage - 1);
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      const maxPage = Math.ceil(movies.length / itemsPerPage) - 1;
      if (currentPage < maxPage) setCurrentPage(currentPage + 1);
    }
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );

    // Update current page based on scroll position
    const newPage = Math.round(
      container.scrollLeft / (scrollAmount * itemsPerPage)
    );
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full">
      {/* Header with Navigation Buttons */}
      <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex justify-between items-center">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 truncate">
            {title}
          </h1>
          {/* <p className="text-gray-400 text-sm hidden sm:block">Discover the latest movies</p> */}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2 flex-shrink-0">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            disabled={!showLeftArrow}
            className={`bg-transparent/80 hover:bg-transparent border border-white text-white 
                       p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 
                       hover:scale-110 shadow-lg ${
                         !showLeftArrow
                           ? 'opacity-50 cursor-not-allowed'
                           : 'cursor-pointer hover:border-primary'
                       }`}
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            disabled={!showRightArrow}
            className={`bg-transparent/80 hover:bg-transparent border border-white text-white 
                       p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 
                       hover:scale-110 shadow-lg ${
                         !showRightArrow
                           ? 'opacity-50 cursor-not-allowed'
                           : 'cursor-pointer hover:border-primary'
                       }`}
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Movie Carousel */}
      <div className="px-3 sm:px-4 md:px-6 pb-6 sm:pb-8">
        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth
                     snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' },
          }}
        >
          {movies.map((movie, index) => (
            <div key={movie.id + index} className="flex-shrink-0 snap-start">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
