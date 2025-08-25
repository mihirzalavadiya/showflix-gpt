import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../slice/userSlice';
import moviesReducer from '../slice/moviesSlice';
import gptReducer from '../slice/gptSlice';
import configReducer from '../slice/configSlice';

const appStore = configureStore({
  reducer: {
    user: useReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});

export default appStore;
