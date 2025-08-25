import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useMovieDetails from '../hooks/useMovieDetails';
import Header from './Header';
import { useSelector } from 'react-redux';

const MovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const movieDetail = useMovieDetails(id);

  const showGptSearch = useSelector((state) => state.gpt.showGptSearch);
  useEffect(() => {
    if (showGptSearch) {
      navigate('/browse'); // lowercase path (same as router config)
    }
  }, [showGptSearch, navigate]);

  if (!movieDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-gray-900 to-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mb-4"></div>
          <p className="text-white text-lg">Loading Movie Details...</p>
        </div>
      </div>
    );
  }

  const {
    title,
    overview,
    poster_path,
    backdrop_path,
    release_date,
    runtime,
    vote_average,
    vote_count,
    genres,
    production_companies,
    budget,
    revenue,
    tagline,
    spoken_languages,
    homepage,
  } = movieDetail;

  const formatCurrency = (amount) => {
    // return new Intl.NumberFormat('en-US', {
    //   style: 'currency',
    //   currency: 'USD',
    //   minimumFractionDigits: 0,
    // }).format(amount);
    if (amount >= 1_00_00_000) {
      // Crore
      return `₹${(amount / 1_00_00_000).toFixed(1)} Cr`;
    } else if (amount >= 1_00_000) {
      // Lakh
      return `₹${(amount / 1_00_000).toFixed(1)} L`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-400';
    if (rating >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-gray-900 to-black">
      <Header />
      {/* Backdrop Image with Overlay */}
      <div className="relative h-screen">
        {backdrop_path && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </>
        )}

        {/* Movie Content */}
        <div className="relative z-10 flex items-center min-h-screen px-6 lg:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12 items-center">
            {/* Movie Poster */}
            <div className="flex justify-center lg:justify-start">
              {poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                  alt={title}
                  className="w-80 max-w-full rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-80 h-[480px] bg-gray-800 rounded-2xl flex items-center justify-center">
                  <span className="text-gray-400">No Poster</span>
                </div>
              )}
            </div>

            {/* Movie Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Tagline */}
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {title}
                </h1>
                {tagline && (
                  <p className="text-lg text-accent font-medium italic">
                    "{tagline}"
                  </p>
                )}
              </div>

              {/* Movie Stats */}
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span
                    className={`text-lg font-bold ${getRatingColor(
                      vote_average
                    )}`}
                  >
                    {vote_average?.toFixed(1)}
                  </span>
                  <span className="text-gray-400">
                    ({vote_count?.toLocaleString()} votes)
                  </span>
                </div>

                {release_date && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-white font-medium">
                      {new Date(release_date).getFullYear()}
                    </span>
                  </div>
                )}

                {runtime && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-white font-medium">
                      {formatRuntime(runtime)}
                    </span>
                  </div>
                )}
              </div>

              {/* Genres */}
              {genres && genres.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-4 py-2 bg-primary/20 text-white/80 border border-primary/90 rounded-full text-sm font-medium hover:bg-primary/30 transition-colors duration-300 shadow-2xl cursor-pointer"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              {overview && (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Overview
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {overview}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="bg-gradient-to-r from-primary to-accent text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-primary/25 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Watch Trailer
                </button>

                {/* <button className="bg-gray-800/80 text-white font-semibold px-8 py-3 rounded-xl border border-gray-600 hover:bg-gray-700/80 hover:border-primary/50 transition-all duration-300 flex items-center gap-2">
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Add to Wishlist
                </button> */}

                {homepage && (
                  <a
                    href={homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800/80 text-white font-semibold px-8 py-3 rounded-xl border border-gray-600 hover:bg-gray-700/80 hover:border-accent/50 transition-all duration-300 flex items-center gap-2"
                  >
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
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Official Site
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-gray-900/50 py-16 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Production Companies */}
            {production_companies && production_companies.length > 0 && (
              <div className="bg-gray-800/60 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                <h4 className="text-xl font-bold text-white mb-4">
                  Production
                </h4>
                <div className="space-y-3">
                  {production_companies.slice(0, 3).map((company) => (
                    <div key={company.id} className="flex items-center gap-3">
                      {company.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                          alt={company.name}
                          className="w-8 h-8 object-contain bg-white/10 rounded p-1"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-300">?</span>
                        </div>
                      )}
                      <span className="text-gray-300 text-sm">
                        {company.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Financial Info */}
            <div className="bg-gray-800/60 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
              <h4 className="text-xl font-bold text-white mb-4">Box Office</h4>
              <div className="space-y-3">
                {budget > 0 && (
                  <div>
                    <p className="text-gray-400 text-sm">Budget</p>
                    <p className="text-white font-semibold">
                      {formatCurrency(budget)}
                    </p>
                  </div>
                )}
                {revenue > 0 && (
                  <div>
                    <p className="text-gray-400 text-sm">Revenue</p>
                    <p className="text-green-400 font-semibold">
                      {formatCurrency(revenue)}
                    </p>
                  </div>
                )}
                {budget > 0 && revenue > 0 && (
                  <div>
                    <p className="text-gray-400 text-sm">Profit</p>
                    <p className="text-accent font-semibold">
                      {formatCurrency(revenue - budget)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Languages */}
            {spoken_languages && spoken_languages.length > 0 && (
              <div className="bg-gray-800/60 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
                <h4 className="text-xl font-bold text-white mb-4">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {spoken_languages.map((lang, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/30"
                    >
                      {lang.english_name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Movie Stats */}
            <div className="bg-gray-800/60 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50">
              <h4 className="text-xl font-bold text-white mb-4">Statistics</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm">Rating</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-lg font-bold ${getRatingColor(
                        vote_average
                      )}`}
                    >
                      {vote_average?.toFixed(1)}/10
                    </span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(vote_average / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Votes</p>
                  <p className="text-white font-semibold">
                    {vote_count?.toLocaleString()}
                  </p>
                </div>
                {release_date && (
                  <div>
                    <p className="text-gray-400 text-sm">Release Date</p>
                    <p className="text-white font-semibold">
                      {new Date(release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
