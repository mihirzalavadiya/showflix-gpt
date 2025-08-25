import React from 'react';
import { useSelector } from 'react-redux';

const VideoTitle = ({ title, overview }) => {
  // If no props passed, use first movie from Redux store
  const movies = useSelector((state) => state.movies?.nowPlayingMovies);
  const movie = movies?.[0];

  const displayTitle = title || movie?.title || 'Jurassic World';
  const displayOverview =
    overview ||
    movie?.overview ||
    'Experience the thrill of dinosaurs in this epic adventure where past meets present in spectacular fashion.';

  return (
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent">
      <div className="flex flex-col justify-center h-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 pt-16 sm:pt-20 md:pt-16 lg:pt-0">
        {/* Movie Logo/Title */}
        <div className="mb-4 sm:mb-6 max-w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-3 md:mb-4 drop-shadow-2xl leading-tight">
            {displayTitle}
          </h1>
          <p
            className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 drop-shadow-2xl 
                      w-full sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] 
                      leading-relaxed line-clamp-3 sm:line-clamp-4 md:line-clamp-none"
          >
            {displayOverview}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 md:space-x-4 relative max-w-full">
          {/* Play Button */}
          <button
            className="flex items-center justify-center sm:justify-start space-x-2 
                           bg-white text-black px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 
                           rounded-md font-semibold text-sm sm:text-base 
                           hover:bg-gray-200 transition-all duration-200 
                           transform hover:scale-105 shadow-lg 
                           w-full sm:w-auto min-w-[120px]"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Play</span>
          </button>

          {/* More Info Button */}
          <button
            className="flex items-center justify-center sm:justify-start space-x-2 
                           bg-gray-600/70 text-white px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 
                           rounded-md font-semibold text-sm sm:text-base 
                           hover:bg-gray-600/90 transition-all duration-200 
                           transform hover:scale-105 backdrop-blur-sm shadow-lg
                           w-full sm:w-auto min-w-[140px]"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>More Info</span>
          </button>
        </div>

        {/* Mobile Overview - Show on small screens */}
        <div className="block sm:hidden mt-4 max-w-full">
          <div className="bg-gray-900/80 backdrop-blur-sm text-white p-3 rounded-lg border border-gray-700">
            <h3 className="text-sm font-bold mb-1">{displayTitle}</h3>
            <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
              {displayOverview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
