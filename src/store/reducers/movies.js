import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';
import { fetchMovies } from '../api-actions';
import { filterMovies } from '../../utils/movieFilter';

const moviesInitialState = {
  initialMovies: [],
  initialMoviesSearchParams: {
    params: '',
    short: false,
  },
};

export const MoviesSlice = createSlice({
  name: 'movies',
  initialState: moviesInitialState,
  reducers: {
    clearMoviesInitialState: (state) => {
      state.initialMovies = [];
    },
    clearInitialMoviesSearchParams: (state) => {
      state.savedMoviesSearchParams = {
        params: '',
        short: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.initialMovies = action.payload;
    });
  },
});

const selectMovies = (state) => state.movies.initialMovies;
const selectInitialMoviesSearchParams = (state) => state.movies.initialMoviesSearchParams;

const moviesSelector = createDraftSafeSelector(selectMovies, (initialMovies) => initialMovies);

const initialMoviesSearchParamsSelector = createDraftSafeSelector(
  selectInitialMoviesSearchParams,
  (savedMoviesSearchParams) => savedMoviesSearchParams,
);

const filtredInitialMoviesSelector = createDraftSafeSelector(
  selectMovies,
  selectInitialMoviesSearchParams,
  (initialMovies, initialMoviesSearchParams) => {
    if (initialMoviesSearchParams.params === '' && initialMoviesSearchParams.short === false) {
      return initialMovies;
    }
    return filterMovies(
      initialMovies,
      initialMoviesSearchParams.params,
      initialMoviesSearchParams.short,
    );
  },
);

export { moviesSelector, initialMoviesSearchParamsSelector, filtredInitialMoviesSelector };
export const { clearMoviesInitialState, clearInitialMoviesSearchParams } = MoviesSlice.actions;
