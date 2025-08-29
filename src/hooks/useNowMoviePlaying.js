import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  setNowPlayingMovies,
  setPopulerMovies,
  setTopRatedMovies,
  setUpcomingMovies,
} from '../redux/slice/moviesSlice';

const useNowMoviePlaying = (type) => {
  const dispatch = useDispatch();
  const { nowPlayingMovies, populerMovies, topRatedMovies, upcomingMovies } =
    useSelector((state) => state.movies);

  const fetchMovies = async () => {
    try {
      const res = await fetch(`/api/movies/${type}`);
      const data = await res.json();

      switch (type) {
        case 'now_playing':
          if (!nowPlayingMovies || nowPlayingMovies.length === 0) {
            dispatch(setNowPlayingMovies(data?.results || []));
          }
          break;
        case 'popular':
          if (!populerMovies || populerMovies.length === 0) {
            dispatch(setPopulerMovies(data?.results || []));
          }
          break;
        case 'top_rated':
          if (!topRatedMovies || topRatedMovies.length === 0) {
            dispatch(setTopRatedMovies(data?.results || []));
          }
          break;
        case 'upcoming':
          if (!upcomingMovies || upcomingMovies.length === 0) {
            dispatch(setUpcomingMovies(data?.results || []));
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    if (!type) return;
    fetchMovies();
  }, [type]);
};

export default useNowMoviePlaying;
