import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import languages from '../utils/languageConstants';
import useGroqApi from '../hooks/useGroqApi';
import { API_OPTIONS } from '../utils/constants';
import MovieList from './MovieList';
import useMoviesByName from '../hooks/useMoviesByName';
import { clearGptMovies } from '../redux/slice/gptSlice';

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const addGptMovies = useSelector((state) => state.gpt.addGptMovies);
  const lang = useSelector((state) => state.config.lang);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('');

  const { loading } = useGroqApi(searchType);

  const { searchResults, clearResults } = useMoviesByName(addGptMovies);

  const handleSearch = async (e) => {
    clearResults();
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchType(searchQuery);
    dispatch(clearGptMovies());
  };

  const clearSearch = () => {
    setSearchQuery('');
    clearResults();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-gray-900 to-black pt-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {/* ShowFlix <span className="text-primary">GPT</span> */}
          </h1>
          <p className="text-gray-400 text-lg md:text-lg mb-8">
            {languages?.[lang]?.description}
          </p>
        </div>

        {/* Search Container */}
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-700/50 mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={languages?.[lang]?.gptSearchPlaceholder}
                className="w-full bg-gray-900/70 border border-gray-600 rounded-xl px-6 py-4 text-white placeholder-gray-400 text-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
              />

              {/* Clear Button */}
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute cursor-pointer right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!searchQuery.trim() || loading}
                className="bg-gradient-to-r from-primary to-accent text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-primary/25 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="opacity-25"
                      ></circle>
                      <path
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        className="opacity-75"
                      ></path>
                    </svg>
                    {languages?.[lang]?.loading}
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    {languages?.[lang]?.search}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Popular Queries */}
        {searchResults.length === 0 && !loading && (
          <div className="mb-8">
            <h3 className="text-white text-xl font-semibold mb-4">
              {languages?.[lang]?.populer}
            </h3>
            <div className="flex flex-wrap gap-3">
              {languages?.[lang]?.popularQueries?.map((query, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(query)}
                  className="bg-gray-800/60 hover:bg-gray-700/60 text-gray-300 hover:text-white px-4 py-2 rounded-full text-xs transition-all duration-300 border border-gray-600/50 hover:border-primary/50"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {/* {data?.length > 0 && (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/30">
            <h3 className="text-white text-xl font-semibold mb-6">
              Search Results
            </h3>
            <div className="space-y-6">
              {data.map((categoryData, categoryIndex) => (
                <div key={categoryIndex} className="space-y-3">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                    <h4 className="text-lg font-semibold text-white">
                      {categoryData.category}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ml-6">
                    {categoryData.items.map((movie, movieIndex) => (
                      <div
                        key={movieIndex}
                        className="bg-gray-900/50 rounded-lg p-3 hover:bg-gray-900/70 transition-all duration-300 cursor-pointer border border-gray-600/30 hover:border-primary/30 group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-accent rounded-full group-hover:bg-primary transition-colors duration-300"></div>
                          <span className="text-gray-200 font-medium text-sm group-hover:text-white transition-colors duration-300">
                            {movie}
                          </span>
                          <div className="ml-auto">
                            <svg
                              className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-700/30">
              <p className="text-gray-400 text-sm text-center">
                Found{' '}
                {data.reduce(
                  (total, category) => total + category.items.length,
                  0
                )}{' '}
                movies across {data.length} categories
              </p>
            </div>
          </div>
        )} */}

        {searchResults?.length > 0 &&
          searchResults?.map((result, index) => (
            <MovieList
              key={`${result?.category}-${index}`}
              title={result?.category}
              movies={result?.items}
            />
          ))}
      </div>
    </div>
  );
};

export default GptSearchBar;
