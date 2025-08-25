import React from 'react';
import Header from './Header';
import useNowMoviePlaying from '../hooks/useNowMoviePlaying';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  const showGptSearch = useSelector((state) => state.gpt.showGptSearch);

  useNowMoviePlaying('now_playing');
  useNowMoviePlaying('popular');
  useNowMoviePlaying('top_rated');
  useNowMoviePlaying('upcoming');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-textmain">
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
