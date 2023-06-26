import { createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';
import { fetchSavedMovies, postSavedMovie, deleteSavedMovie } from '../api-actions';
import { filterMovies } from '../../utils/movieFilter';

const savedMoviesInitialState = {
  savedMovies: [],
  savedMoviesSearchParams: {
    params: '',
    short: false,
  },
  savedSearchSuccses: false,
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
    clearSavedSearchSuccsesInitialState: (state) => {
      state.savedSearchSuccses = false;
    },
    setSavedMoviesSearchParams: (state, action) => {
      state.savedMoviesSearchParams = action.payload;
    },
    setSavedSearchSuccses: (state, action) => {
      state.savedSearchSuccses = action.payload;
    },
    setSavedShortState: (state, action) => {
      state.savedSearchSuccses = true;
      state.savedMoviesSearchParams = {
        params: state.savedMoviesSearchParams.params,
        short: action.payload,
      };
    },
    setSavedStateFromStorage: (state, action) => {
      state.savedSearchSuccses = true;
      state.savedMoviesSearchParams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedMovies.fulfilled, (state, action) => {
        state.savedMovies = action.payload;
      })
      .addCase(postSavedMovie.fulfilled, (state, action) => {
        console.log(action.payload);
        state.savedMovies.push(action.payload);
      })
      .addCase(deleteSavedMovie.fulfilled, (state, action) => {
        state.savedMovies = state.savedMovies.filter(
          (savedMovie) => savedMovie._id !== action.payload,
        );
      });
  },
});

const selectSavedMovies = (state) => state.savedMovies.savedMovies;
const selectSavedMoviesSearchParams = (state) => state.savedMovies.savedMoviesSearchParams;
const selectSavedSearchSuccses = (state) => state.movies.searchSuccses;

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

const searchSavedSuccsesSelector = createDraftSafeSelector(
  selectSavedSearchSuccses,
  (savedSearchSuccses) => savedSearchSuccses,
);

export {
  savedMoviesSelector,
  savedMoviesSearchParamsSelector,
  filtredSavedMoviesSelector,
  searchSavedSuccsesSelector,
};
export const {
  clearSavedMoviesInitialState,
  clearSavedMoviesSearchParams,
  clearSavedSearchSuccsesInitialState,
  setSavedMoviesSearchParams,
  setSavedSearchSuccses,
  setSavedShortState,
  setSavedStateFromStorage,
} = SavedMoviesSlice.actions;
