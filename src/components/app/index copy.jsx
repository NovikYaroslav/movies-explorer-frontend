import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  filtredInitialMoviesSelector,
  initialMoviesSearchParamsSelector,
  setStateFromStorage,
} from '../../store/reducers/movies';
import {
  savedMoviesSearchParamsSelector,
  savedMoviesSelector,
  setSavedStateFromStorage,
} from '../../store/reducers/saved-movies';
import { authorizationSelector } from '../../store/reducers/authorization';
import { fetchMovies, fetchSavedMovies, fetchUserData, checkAuth } from '../../store/api-actions';
import { saveSavedSearchParams, saveSearchParams } from '../../utils/localStorageHandler';

import Footer from '../footer';
import Header from '../header';
import Login from '../login';
import Main from '../main';
import Movies from '../movies/index';
import NotFound from '../not-found/not-found';
import Register from '../register';
import Profile from '../profile';
import SavedMovies from '../saved-movies';
import ProtectedRoute from '../protected-route';

// Настроить навигацию корректно.
// Обработать ошибки с сервера.
// Перепроверить функционал.
// Оптимизировать

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState('');
  const savedMovies = useSelector(savedMoviesSelector);
  const authorized = useSelector(authorizationSelector);
  const filtredMovies = useSelector(filtredInitialMoviesSelector);
  const moviesSearchParams = useSelector(initialMoviesSearchParamsSelector);
  const savedSearchParams = useSelector(savedMoviesSearchParamsSelector);

  useEffect(() => {
    dispatch(checkAuth());
    handleNavigation();
  }, []);

  useEffect(() => {
    if (authorized) {
      dispatch(fetchMovies());
      dispatch(fetchSavedMovies());
      dispatch(fetchUserData());
    }
  }, [authorized, dispatch]);

  useEffect(() => {
    if (savedMovies.length !== 0) {
      saveSavedSearchParams(savedSearchParams);
    }
    if (filtredMovies.length !== 0) {
      saveSearchParams(moviesSearchParams);
    }
  }, [filtredMovies, savedMovies, moviesSearchParams, savedSearchParams]);

  useEffect(() => {
    const storedSearchParams = localStorage.getItem('searchParams');
    const storedSavedSearchParams = localStorage.getItem('savedSearchParams');
    if (storedSearchParams) {
      dispatch(setStateFromStorage(JSON.parse(storedSearchParams)));
    }
    if (storedSavedSearchParams) {
      dispatch(setSavedStateFromStorage(JSON.parse(storedSavedSearchParams)));
    }
  }, [dispatch]);

  function handleNavigation() {
    if (location.pathname !== '/signin' && location.pathname !== '/signup') {
      navigate(location.pathname, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }

  return (
    <>
      {location.pathname === '/' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies' ||
      location.pathname === '/profile' ? (
        <Header currentLocation={location.pathname} />
      ) : null}
      <main className='content'>
        <Routes>
          <Route path='/signin' element={<Login serverError={serverMessage} />} />
          <Route path='/signup' element={<Register serverError={serverMessage} />} />
          <Route path='/' element={<Main />} />
          <Route path='/*' element={<NotFound />} />
          <Route
            path='/movies'
            element={<ProtectedRoute element={<Movies currentLocation={location.pathname} />} />}
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute element={<SavedMovies currentLocation={location.pathname} />} />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute element={<Profile message={serverMessage} />} loggedIn={authorized} />
            }
          />
        </Routes>
      </main>
      {location.pathname === '/' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies' ? (
        <Footer />
      ) : null}
    </>
  );
}

export default App;
