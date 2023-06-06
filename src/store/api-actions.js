import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies } from '../utils/MoviesApi';
import {
  getSavedMovies,
  register,
  checkToken,
  getUserInfoFromServer,
  editUserData,
  deleteMovie,
  addMovie,
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

export const removeSavedMovie = createAsyncThunk('DELETE /movies/_id', async (_id) => {
  try {
    const response = await deleteMovie(_id);
    return response;
  } catch (error) {
    throw Error('Failed to fetch savedMovies');
  }
});

export const postUserData = createAsyncThunk('POST /users/me', async (updatedUserData) => {
  try {
    const { data } = await editUserData(updatedUserData);
    return data;
  } catch (error) {
    throw Error('Failed to regitrate');
  }
});

export const postSavedMovie = createAsyncThunk('POST /movies', async (newMovie) => {
  try {
    const response = await addMovie(newMovie);
    return response;
  } catch (error) {
    throw Error('Failed to regitrate');
  }
});
