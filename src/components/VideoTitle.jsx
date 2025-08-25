import React from 'react';
import { useSelector } from 'react-redux';

const VideoTitle = ({ title, overview }) => {
  // const [showOverview, setShowOverview] = useState(false);

  // If no props passed, use first movie from Redux store
  const movies = useSelector((state) => state.movies?.nowPlayingMovies);
  const movie = movies?.[0];

  const displayTitle = title || movie?.title || 'Jurassic World';
  const displayOverview =
    overview ||
    movie?.overview ||
    'Experience the thrill of dinosaurs in this epic adventure where past meets present in spectacular fashion.';

  return (
    <div className="absolute inset-0 bg-gradient-to-r h-[calc(100vh-13rem)] from-black via-black/50 to-transparent z-10">
      <div className="flex flex-col justify-center h-[calc(100vh-10rem)] px-12 lg:px-20">
        {/* Movie Logo/Title */}
        <div className="mb-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
            {displayTitle}
          </h1>
          <p className="text-xs text-gray-300 drop-shadow-2xl w-[500px] leading-relaxed">
            {displayOverview}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 relative">
          {/* Play Button */}
          <button className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-md font-semibold text-base hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 shadow-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Play</span>
          </button>

          {/* More Info Button with Hover Tooltip */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 bg-gray-600/70 text-white px-6 py-3 rounded-md font-semibold text-base hover:bg-gray-600/90 transition-all duration-200 transform hover:scale-105 backdrop-blur-sm shadow-lg"
              // onMouseEnter={() => setShowOverview(true)}
              // onMouseLeave={() => setShowOverview(false)}
            >
              <svg
                className="w-5 h-5"
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

            {/* Overview Tooltip */}
            {/* {showOverview && (
              <div className="absolute top-full left-45 -mt-13 w-80 max-w-sm bg-gray-900/95 backdrop-blur-md text-white p-3 rounded-lg shadow-xl border border-gray-700 z-20 transform transition-all duration-300 ease-out">
                <div className="relative">
                  <div className="absolute -top-5 left-6 w-0 h-0 border-l-3 border-r-3 border-b-3 border-l-transparent border-r-transparent border-b-gray-900/95"></div>

                  <h3 className="text-base font-bold mb-2">{displayTitle}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {displayOverview}
                  </p>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
