import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';
import { fetchMovies } from '../api-actions';
import { filterMovies } from '../../utils/movieFilter';

const moviesInitialState = {
  initialMovies: [],
  initialMoviesSearchParams: {
    params: '',
    short: false,
  },
  searchSuccses: false,
};

export const MoviesSlice = createSlice({
  name: 'movies',
  initialState: moviesInitialState,
  reducers: {
    clearMoviesInitialState: (state) => {
      state.initialMovies = [];
    },
    clearInitialMoviesSearchParams: (state) => {
      state.initialMoviesSearchParams = {
        params: '',
        short: false,
      };
    },
    clearSearchSuccsesInitialState: (state) => {
      state.searchSuccses = false;
    },
    setSearchParams: (state, action) => {
      state.initialMoviesSearchParams = action.payload;
    },
    setSearchSuccses: (state, action) => {
      state.searchSuccses = action.payload;
    },
    setShortState: (state, action) => {
      state.initialMoviesSearchParams = {
        params: state.initialMoviesSearchParams.params,
        short: action.payload,
      };
    },
    setStateFromStorage: (state, action) => {
      state.searchSuccses = true;
      state.initialMoviesSearchParams = action.payload;
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
const selectSearchSuccses = (state) => state.movies.searchSuccses;

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
      return [];
    }
    console.log('использую функцию фильрации');
    return filterMovies(
      initialMovies,
      initialMoviesSearchParams.params,
      initialMoviesSearchParams.short,
    );
  },
);

const searchSuccsesSelector = createDraftSafeSelector(
  selectSearchSuccses,
  (searchSuccses) => searchSuccses,
);

export {
  moviesSelector,
  initialMoviesSearchParamsSelector,
  filtredInitialMoviesSelector,
  searchSuccsesSelector,
};
export const {
  clearMoviesInitialState,
  clearInitialMoviesSearchParams,
  clearSearchSuccsesInitialState,
  setSearchParams,
  setSearchSuccses,
  setShortState,
  setStateFromStorage,
} = MoviesSlice.actions;
