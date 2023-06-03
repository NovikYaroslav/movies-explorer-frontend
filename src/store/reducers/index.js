import { combineReducers } from '@reduxjs/toolkit';
import { MoviesSlice } from './movies';
import { authorizationSlice } from './authorization';

export const rootReducer = combineReducers({
  movies: MoviesSlice.reducer,
  authorization: authorizationSlice.reducer,
});

export default rootReducer;
