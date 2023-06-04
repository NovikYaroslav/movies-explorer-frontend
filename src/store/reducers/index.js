import { combineReducers } from '@reduxjs/toolkit';
import { MoviesSlice } from './movies';
import { SavedMoviesSlice } from './saved-movies';
import { authorizationSlice } from './authorization';

export const rootReducer = combineReducers({
  movies: MoviesSlice.reducer,
  savedMovies: SavedMoviesSlice.reducer,
  authorization: authorizationSlice.reducer,
});

export default rootReducer;
