import { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';

const useMovieDetails = (id) => {
  const [movieDetail, setMovieDetail] = useState(null);
  const fetchDetails = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}`,
        API_OPTIONS
      );
      const data = await res.json();
      setMovieDetail(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);
  return movieDetail;
};

export default useMovieDetails;
