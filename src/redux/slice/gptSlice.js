import { createSlice } from '@reduxjs/toolkit';

const gptSlice = createSlice({
  name: 'gpt',
  initialState: {
    showGptSearch: false,
    addGptMovies: [],
  },
  reducers: {
    toggleGptSearchView(state) {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovies(state, action) {
      state.addGptMovies.push(action.payload);
    },
    clearGptMovies(state) {
      state.addGptMovies = [];
    },
  },
});

export const { toggleGptSearchView, addGptMovies, clearGptMovies } =
  gptSlice.actions;
export default gptSlice.reducer;
