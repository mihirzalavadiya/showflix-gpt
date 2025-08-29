import { useEffect, useState } from 'react';

const useMovieDetails = (id) => {
  const [movieDetail, setMovieDetail] = useState(null);
  const fetchDetails = async () => {
    try {
      const res = await fetch(`/api/movie/${id}`);
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
