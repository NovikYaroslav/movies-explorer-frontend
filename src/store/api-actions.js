import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies } from '../utils/MoviesApi';
import {
  getSavedMovies,
  register,
  authorize,
  checkToken,
  getUserInfoFromServer,
  editUserData,
  deleteMovie,
  addMovie,
} from '../utils/MainApi';
import { getJwt } from '../utils/jwtHandler';

export const fetchMovies = createAsyncThunk('GET beatfilm-movies/', async () => {
  console.log('getMovies()');
  try {
    const response = await getMovies();
    return response;
  } catch (error) {
    throw Error('Failed to fetch movies');
  }
});

export const checkAuth = createAsyncThunk('GET /users/me with token', async () => {
  const jwt = getJwt();
  try {
    const response = await checkToken(jwt);
    return response;
  } catch (error) {
    throw Error('Failed to login');
  }
});

export const registrate = createAsyncThunk('POST /signup', async ({ name, email, password }) => {
  console.log('register(name, email, password');
  try {
    const response = await register(name, email, password);
    return response;
  } catch (error) {
    throw Error('Failed to regitrate');
  }
});

export const authorizate = createAsyncThunk('POST /signin', async ({ email, password }) => {
  console.log('authorize(email, password)');
  try {
    const response = await authorize(email, password);
    return response;
  } catch (error) {
    throw Error('Failed to regitrate');
  }
});

export const registrateAndAuthorize =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      const registrationResponse = await dispatch(registrate({ name, email, password }));
      if (registrationResponse.meta.requestStatus === 'fulfilled') {
        dispatch(authorizate({ email, password }));
      }
    } catch (error) {
      throw Error('Failed to register and authorize');
    }
  };

export const fetchUserData = createAsyncThunk('GET /users/me', async () => {
  console.log('getUserInfoFromServer()');
  try {
    const response = await getUserInfoFromServer();
    return response;
  } catch (error) {
    throw Error('Failed to regitrate');
  }
});

export const fetchSavedMovies = createAsyncThunk('GET /movies', async () => {
  console.log('getSavedMovies()');
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

export const deleteSavedMovie = createAsyncThunk('DELETE /movies/_id', async (_id) => {
  try {
    await deleteMovie(_id);
    return _id;
  } catch (error) {
    throw Error('Failed to regitrate');
  }
});
