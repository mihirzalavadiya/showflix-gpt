import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import {
  setNowPlayingMovies,
  setPopulerMovies,
  setTopRatedMovies,
  setUpcomingMovies,
} from '../redux/slice/moviesSlice';

const useNowMoviePlaying = (type) => {
  const dispatch = useDispatch();
  const fetchMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${type}?page=1`,
        API_OPTIONS
      );
      const data = await res.json();
      switch (type) {
        case 'now_playing':
          dispatch(setNowPlayingMovies(data?.results || []));
          break;

        case 'popular':
          dispatch(setPopulerMovies(data?.results || []));
          break;

        case 'top_rated':
          dispatch(setTopRatedMovies(data?.results || []));
          break;

        case 'upcoming':
          dispatch(setUpcomingMovies(data?.results || []));
          break;

        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);
};

export default useNowMoviePlaying;
