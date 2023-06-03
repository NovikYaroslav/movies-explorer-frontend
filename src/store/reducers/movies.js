import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';
import { fetchMovies, fetchSavedMovies } from '../api-actions';

// ПОПРОБУЙ СОЗДАТЬ ВТОРОЙ СЛАЙ, такой же, но с сохраненными фильмами.

const moviesInitialState = {
  initialMovies: [],
  savedMovies: [],
};

export const MoviesSlice = createSlice({
  name: 'movies',
  initialState: moviesInitialState,
  reducers: {
    cleanMoviesInitialState: (state) => {
      state.initialMovies = [];
      state.savedMovies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.initialMovies = action.payload;
      })
      .addCase(fetchSavedMovies.fulfilled, (state, action) => {
        state.savedMovies = action.payload;
      });
  },
});

const selectMovies = (state) => state.movies.initialMovies;
const selectSavedMovies = (state) => state.movies.savedMovies;
const moviesSelector = createDraftSafeSelector(selectMovies, (initialMovies) => initialMovies);
const savedMoviesSelector = createDraftSafeSelector(
  selectSavedMovies,
  (savedMovies) => savedMovies,
);

export { moviesSelector, savedMoviesSelector };
export const { cleanMoviesInitialState } = MoviesSlice.actions;
