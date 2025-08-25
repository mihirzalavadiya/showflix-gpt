import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const SecondaryContainer = () => {
  const movies = useSelector((state) => state.movies);
  const isLoading = useSelector((state) => state.movies?.isLoading);

  // Loading state check karo
  if (isLoading || !movies) {
    return (
      <div className="-mt-40 relative z-20">
        <div className="pl-12">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    );
  }

  // Agar koi movies nahi hai to message show karo
  const hasMovies =
    movies?.nowPlayingMovies?.length > 0 ||
    movies?.populerMovies?.length > 0 ||
    movies?.topRatedMovies?.length > 0 ||
    movies?.upcomingMovies?.length > 0;

  if (!hasMovies) {
    return (
      <div className="-mt-40 relative z-20">
        <div className="pl-12">
          <div className="flex justify-center items-center h-96">
            <p className="text-white text-xl">No movies available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:-mt-40 mt-[450px] sm:mt-[370px] md:mt-[200px] relative z-20">
      <div className="pl-3 md:pl-12 sm:pl-4">
        {movies?.nowPlayingMovies && (
          <MovieList title="Now Playing" movies={movies.nowPlayingMovies} />
        )}
        {movies?.populerMovies && (
          <MovieList title="Popular Movies" movies={movies.populerMovies} />
        )}
        {movies?.topRatedMovies && (
          <MovieList title="Top Rated Movies" movies={movies.topRatedMovies} />
        )}
        {movies?.upcomingMovies && (
          <MovieList title="Upcoming Movies" movies={movies.upcomingMovies} />
        )}
      </div>
    </div>
  );
};

export default SecondaryContainer;
