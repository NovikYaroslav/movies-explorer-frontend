import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies } from '../utils/MoviesApi';
import {
  getSavedMovies,
  register,
  checkToken,
  getUserInfoFromServer,
  editUserData,
} from '../utils/MainApi';

export const fetchMovies = createAsyncThunk('GET beatfilm-movies/', async () => {
  try {
    const response = await getMovies();
    return response;
  } catch (error) {
    throw Error('Failed to fetch movies');
  }
});

export const checkAuth = createAsyncThunk('GET /users/me with token', async (jwt) => {
  try {
    const response = await checkToken(jwt);
    console.log(response);
    return response;
  } catch (error) {
    throw Error('Failed to login');
  }
});

export const registrate = createAsyncThunk('POST /signup', async (name, email, password) => {
  try {
    const response = await register(name, email, password);
    return response;
  } catch (error) {
    throw Error('Failed to regitrate');
  }
});

export const fetchUserData = createAsyncThunk('GET /users/me', async () => {
  try {
    const response = await getUserInfoFromServer();
    return response;
  } catch (error) {
    throw Error('Failed to regitrate');
  }
});

export const fetchSavedMovies = createAsyncThunk('GET /movies', async () => {
  try {
    const response = await getSavedMovies();
    return response;
  } catch (error) {
    throw Error('Failed to fetch savedMovies');
  }
});

export const postUserData = createAsyncThunk('POST /users/me', async (updatedUserData) => {
  try {
    const response = await editUserData(updatedUserData);
    return response;
  } catch (error) {
    throw Error('Failed to regitrate');
  }
});
