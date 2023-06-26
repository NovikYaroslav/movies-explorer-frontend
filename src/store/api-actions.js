import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies } from '../utils/moviesApi';
import {
  getSavedMovies,
  register,
  authorize,
  checkToken,
  getUserInfoFromServer,
  editUserData,
  deleteMovie,
  addMovie,
} from '../utils/mainApi';
import { getJwt } from '../utils/localStorageHandler';

export const fetchMovies = createAsyncThunk('GET beatfilm-movies/', async () => {
  try {
    const response = await getMovies();
    return response;
  } catch (error) {
    return Promise.reject(error.message || 'Failed to fetch movies');
  }
});

export const checkAuth = createAsyncThunk('GET /users/me with token', async () => {
  const jwt = getJwt();
  try {
    const response = await checkToken(jwt);
    return response;
  } catch (error) {
    return Promise.reject(error.message || 'Failed to login');
  }
});

export const registrate = createAsyncThunk('POST /signup', async ({ name, email, password }) => {
  try {
    const response = await register(name, email, password);
    return response;
  } catch (error) {
    return Promise.reject(error.message || 'Failed to registrate');
  }
});

export const authorizate = createAsyncThunk('POST /signin', async ({ email, password }) => {
  try {
    const response = await authorize(email, password);
    return response;
  } catch (error) {
    return Promise.reject(error.message || 'Failed to authorize');
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
      return Promise.reject(error.message || 'Failed to registrate');
    }
  };

export const fetchUserData = createAsyncThunk('GET /users/me', async () => {
  try {
    const response = await getUserInfoFromServer();
    return response;
  } catch (error) {
    return Promise.reject(error.message || 'Failed to fetch User Data');
  }
});

export const fetchSavedMovies = createAsyncThunk('GET /movies', async () => {
  try {
    const response = await getSavedMovies();
    return response;
  } catch (error) {
    return Promise.reject(error.message || 'Failed to fetch saved movies');
  }
});

export const removeSavedMovie = createAsyncThunk('DELETE /movies/_id', async (_id) => {
  try {
    const response = await deleteMovie(_id);
    return response;
  } catch (error) {
    return Promise.reject(error.message || 'Failed to delete movie');
  }
});

export const postUserData = createAsyncThunk('PATCH /users/me', async (updatedUserData) => {
  try {
    const { data } = await editUserData(updatedUserData);
    return data;
  } catch (error) {
    return Promise.reject(error.message || 'Failed to update user data');
  }
});

export const postSavedMovie = createAsyncThunk('POST /movies', async (newMovie) => {
  try {
    const response = await addMovie(newMovie);
    return response;
  } catch (error) {
    return Promise.reject(error.message || 'Failed to post movie');
  }
});

export const deleteSavedMovie = createAsyncThunk('DELETE /movies/_id', async (_id) => {
  try {
    await deleteMovie(_id);
    return _id;
  } catch (error) {
    return Promise.reject(error.message || 'Failed to delete movie');
  }
});
