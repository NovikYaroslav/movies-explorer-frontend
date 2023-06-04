import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';
import { fetchSavedMovies } from '../api-actions';
import { filterMovies } from '../../utils/movieFilter';

// ПОПРОБУЙ СОЗДАТЬ ВТОРОЙ СЛАЙ, такой же, но с сохраненными фильмами.

const savedMoviesInitialState = {
  savedMovies: [],
  savedMoviesSearchParams: {
    params: '',
    short: false,
  },
};

export const SavedMoviesSlice = createSlice({
  name: 'movies',
  initialState: savedMoviesInitialState,
  reducers: {
    clearSavedMoviesInitialState: (state) => {
      state.savedMovies = [];
    },
    clearSavedMoviesSearchParams: (state) => {
      state.savedMoviesSearchParams = {
        params: '',
        short: false,
      };
    },
    setSavedMoviesSearchParams: (state, action) => {
      state.savedMoviesSearchParams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSavedMovies.fulfilled, (state, action) => {
      state.savedMovies = action.payload;
    });
  },
});

const selectSavedMovies = (state) => state.savedMovies.savedMovies;
const selectSavedMoviesSearchParams = (state) => state.savedMovies.savedMoviesSearchParams;

const savedMoviesSelector = createDraftSafeSelector(
  selectSavedMovies,
  (savedMovies) => savedMovies,
);

const savedMoviesSearchParamsSelector = createDraftSafeSelector(
  selectSavedMoviesSearchParams,
  (savedMoviesSearchParams) => savedMoviesSearchParams,
);

const filtredSavedMoviesSelector = createDraftSafeSelector(
  selectSavedMovies,
  selectSavedMoviesSearchParams,
  (savedMovies, savedMoviesSearchParams) => {
    if (savedMoviesSearchParams.params === '' && savedMoviesSearchParams.short === false) {
      return savedMovies;
    }
    return filterMovies(savedMovies, savedMoviesSearchParams.params, savedMoviesSearchParams.short);
  },
);

export { savedMoviesSelector, savedMoviesSearchParamsSelector, filtredSavedMoviesSelector };
export const { clearSavedMoviesInitialState, clearSavedMoviesSearchParams } =
  SavedMoviesSlice.actions;
