import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    nowPlayingMovies: [],
    populerMovies: [],
    topRatedMovies: [],
    upcomingMovies: [],
    trailerVideo: null,
  },
  reducers: {
    setNowPlayingMovies(state, action) {
      state.nowPlayingMovies = action.payload;
    },
    setTrailerVideo(state, action) {
      state.trailerVideo = action.payload;
    },
    setPopulerMovies(state, action) {
      state.populerMovies = action.payload;
    },
    setTopRatedMovies(state, action) {
      state.topRatedMovies = action.payload;
    },
    setUpcomingMovies(state, action) {
      state.upcomingMovies = action.payload;
    },
  },
});

export const {
  setNowPlayingMovies,
  setTrailerVideo,
  setPopulerMovies,
  setTopRatedMovies,
  setUpcomingMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
