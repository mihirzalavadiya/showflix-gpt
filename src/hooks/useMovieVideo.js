import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setTrailerVideo } from '../redux/slice/moviesSlice';

const useMovieVideo = (id) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((state) => state.movies?.trailerVideo);
  const fetchVideo = async () => {
    try {
      const res = await fetch(`/api/movie/${id}/videos`);
      const data = await res.json();
      const filterData = data?.results.filter(
        (video) => video.type === 'Trailer'
      );
      {
        !trailerVideo &&
          dispatch(
            setTrailerVideo(
              filterData?.length > 0 ? filterData[0] : data?.results[0]
            )
          );
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  useEffect(() => {
    fetchVideo();
  }, [id]);
};

export default useMovieVideo;
