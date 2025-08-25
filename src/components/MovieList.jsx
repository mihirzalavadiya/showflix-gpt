import React, { useState, useRef } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 320; // Width of one card + gap

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
    const newPage = Math.round(container.scrollLeft / (320 * itemsPerPage));
    setCurrentPage(newPage);
  };

  return (
    <div className="">
      {/* Header with Navigation Buttons */}
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
          {/* <p className="text-gray-400">Discover the latest movies</p> */}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            disabled={!showLeftArrow}
            className={`bg-transparent/80 hover:bg-transparent border-1 border-white text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-5xl ${
              !showLeftArrow
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            <svg
              className="w-2 h-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            disabled={!showRightArrow}
            className={`bg-transparent/80 hover:bg-transparent border-1 border-white text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-5xl ${
              !showRightArrow
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            <svg
              className="w-2 h-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Movie Carousel */}
      <div className="px-6 pb-8">
        {/* Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: { display: 'none' },
          }}
        >
          {movies.map((movie, index) => (
            <MovieCard key={movie.id + index} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
