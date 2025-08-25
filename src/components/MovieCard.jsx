import React from 'react';
import { TMDB_IMAGE_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleGptSearchView } from '../redux/slice/gptSlice';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gptSearch = useSelector((state) => state.gpt.showGptSearch);

  const goToDetails = () => {
    if (gptSearch) {
      dispatch(toggleGptSearchView());
    }
    navigate(`/movie/${movie.id}`);
  };

  return movie?.poster_path ? (
    <div
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 flex-shrink-0"
      onClick={goToDetails}
    >
      {/* Movie Poster */}
      <div className="relative overflow-hidden rounded-xl bg-gray-800 shadow-2xl">
        <img
          src={`${TMDB_IMAGE_URL}${movie?.poster_path}`}
          alt={movie?.title}
          className="w-full h-56 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
                {movie?.title}
              </h3>
              <p className="text-gray-300 text-xs">
                {new Date(movie.release_date).getFullYear()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MovieCard;
