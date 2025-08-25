import React from 'react';
import useMovieVideo from '../hooks/useMovieVideo';
import { YOUTUBE_BASE_URL } from '../utils/constants';
import { useSelector } from 'react-redux';

const VideoBackground = ({ id, title }) => {
  useMovieVideo(id);

  const data = useSelector((state) => state.movies?.trailerVideo);

  return (
    <div className="w-full">
      <iframe
        className="w-full aspect-video"
        src={`${YOUTUBE_BASE_URL}${data?.key}?autoplay=1&mute=1&loop=1&playlist=${data?.key}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        aria-controls="false"
        referrerPolicy="no-referrer"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
