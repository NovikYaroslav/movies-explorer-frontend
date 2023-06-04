import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import {
  moviesSelector,
  clearMoviesInitialState,
  clearInitialMoviesSearchParams,
  filtredInitialMoviesSelector,
  initialMoviesSearchParamsSelector,
} from '../../store/reducers/movies';
import {
  savedMoviesSelector,
  clearSavedMoviesInitialState,
  clearSavedMoviesSearchParams,
  filtredSavedMoviesSelector,
  savedMoviesSearchParamsSelector,
} from '../../store/reducers/saved-movies';

import {
  authorizationSelector,
  userDataSelector,
  clearAuthorizationState,
} from '../../store/reducers/authorization';

import { fetchMovies, fetchSavedMovies, fetchUserData, checkAuth } from '../../store/api-actions';

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
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import {
  register,
  authorize,
  getUserInfoFromServer,
  checkToken,
  editUserData,
  addMovie,
  deleteMovie,
  getSavedMovies,
} from '../../utils/MainApi';
import { getMovies } from '../../utils/MoviesApi';
import { filterMovies } from '../../utils/movieFilter';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [navigationOpened, setNavigationOpened] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  // const [jwt, setJwt] = useState('');
  // const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [initialMovies, setInitialMovies] = useState([]);
  const [filterData, setFilterData] = useState({ params: '', short: false });
  const [searchSuccses, setSearchSuccses] = useState(false);
  const [searchSavedSuccses, setSearchSavedSuccses] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesToDisplay, setSavedMoviesToDisplay] = useState([]);
  const [filterSavedData, setFilterSavedData] = useState({ params: '', short: false });
  // Фильмы с бит сервера
  const initials = useSelector(moviesSelector);
  // Сохраненные фильмы
  const saved = useSelector(savedMoviesSelector);
  // статус авторизации
  const authorized = useSelector(authorizationSelector);
  // данные пользователя
  const user = useSelector(userDataSelector);

  console.log(authorized);
  console.log(user);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    setServerMessage('');
    tokenCheck();
  }, []);

  function handleNavigation() {
    if (location.pathname !== '/signin' && location.pathname !== '/signup') {
      navigate(location.pathname, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // setJwt(jwt);
      dispatch(checkAuth(jwt))
        .then((res) => {
          if (res) {
            handleNavigation();
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  useEffect(() => {
    if (authorized) {
      dispatch(fetchMovies());
      dispatch(fetchSavedMovies());
    }
  }, [authorized, dispatch]);

  // useEffect(() => {
  //   if (savedMovies.length !== 0 && filterSavedData.params !== '') {
  //     localStorage.setItem('filterSavedData', JSON.stringify(filterSavedData));
  //   }
  //   if (moviesToDisplay.length !== 0 && filterData.params !== '') {
  //     localStorage.setItem('moviesToDisplay', JSON.stringify(moviesToDisplay));
  //     localStorage.setItem('filterData', JSON.stringify(filterData));
  //   }
  // }, [moviesToDisplay, filterData, filterSavedData]);

  // useEffect(() => {
  //   const storedMoviesToDisplay = localStorage.getItem('moviesToDisplay');
  //   const storedFilterData = localStorage.getItem('filterData');
  //   if (storedMoviesToDisplay && storedFilterData) {
  //     setMoviesToDisplay(JSON.parse(storedMoviesToDisplay));
  //     setFilterData(JSON.parse(storedFilterData));
  //     setSearchSuccses(true);
  //   }
  // }, []);

  function handleNavMenuVisability() {
    setNavigationOpened(!navigationOpened);
  }

  function handleAuthorization(email, password) {
    authorize(email, password)
      .then(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
          dispatch(fetchUserData());
        }
        // setJwt(jwt);
        // setLoggedIn(true);
      })
      .catch((error) => {
        setServerMessage(error.message);
      });
  }

  function handleRegistration(name, email, password) {
    register(name, email, password)
      .then((res) => {
        setServerMessage('');
        // setUserData({ name: name, email: email });
        // setLoggedIn(true);
        handleAuthorization(email, password);
        navigate('/movies', { replace: true });
      })
      .catch((error) => {
        setServerMessage(error.message);
      });
  }

  function handleUpdateUser(profileInputsData) {
    editUserData(profileInputsData)
      .then(() => {
        setUserData({
          name: profileInputsData.name,
          email: profileInputsData.email,
        });
        setServerMessage('Data successfully updated!');
      })
      .catch((error) => console.log(error.message));
  }

  function handleLogout() {
    if (authorized) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('moviesToDisplay');
      localStorage.removeItem('filterData');
      localStorage.removeItem('filterSavedData');

      dispatch(clearAuthorizationState());
      dispatch(clearMoviesInitialState());
      dispatch(clearSavedMoviesInitialState());
      dispatch(clearInitialMoviesSearchParams());
      dispatch(clearSavedMoviesSearchParams());

      setSearchSuccses(false);
      setSearchSavedSuccses(false);
      navigate('/', { replace: true });
    }
  }

  function handleSearchSubmit(data, short) {
    setSearchSuccses(false);
    setIsLoading(true);
    getMovies()
      .then((movies) => {
        setInitialMovies(movies);
        setFilterData({ params: data, short: short });
        setMoviesToDisplay(filterMovies(movies, data, short).filtredMovies);
        setSearchSuccses(filterMovies(movies, data, short).serchResult);
      })
      .catch((error) => {
        console.log(error);
        setSearchSuccses(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCheckboxClick(updatedStatus) {
    setFilterData((prevFilterData) => {
      return { params: prevFilterData.params, short: updatedStatus };
    });
    if (initialMovies.length === 0) {
      setSearchSuccses(false);
      setIsLoading(true);
      getMovies()
        .then((movies) => {
          setInitialMovies(movies);
          setMoviesToDisplay(filterMovies(movies, filterData.params, updatedStatus).filtredMovies);
          setSearchSuccses(filterMovies(movies, filterData.params, updatedStatus).serchResult);
        })
        .catch((error) => {
          console.log(error);
          setSearchSuccses(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setMoviesToDisplay(
        filterMovies(initialMovies, filterData.params, updatedStatus).filtredMovies,
      );
      setSearchSuccses(filterMovies(initialMovies, filterData.params, updatedStatus).serchResult);
    }
  }

  function handleSavedSearchSubmit(data, short) {
    setSearchSavedSuccses(false);
    setIsLoading(true);
    getSavedMovies()
      .then((movies) => {
        setFilterSavedData({ params: data, short: short });
        setSavedMoviesToDisplay(filterMovies(movies, data, short).filtredMovies);
        setSearchSavedSuccses(filterMovies(movies, data, short).serchResult);
      })
      .catch((error) => {
        console.log(error);
        setSearchSavedSuccses(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSavedCheckboxClick(updatedStatus) {
    setFilterSavedData((prevFilterData) => {
      return { params: prevFilterData.params, short: updatedStatus };
    });
    setSearchSavedSuccses(false);
    getSavedMovies()
      .then((movies) => {
        setSavedMoviesToDisplay(
          filterMovies(movies, filterData.params, updatedStatus).filtredMovies,
        );
        setSearchSavedSuccses(filterMovies(movies, filterData.params, updatedStatus).serchResult);
      })
      .catch((error) => {
        console.log(error);
        setSearchSavedSuccses(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function movieRemover(_id) {
    deleteMovie(_id)
      .then((res) => {
        console.log(res);
        getSavedMovies()
          .then((data) => {
            setSavedMoviesToDisplay(data);
            setSavedMovies(data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function handleCardLike(movie) {
    addMovie(movie)
      .then((savedMovie) => {
        setSavedMoviesToDisplay((prevSavedMoviesToShow) => [...prevSavedMoviesToShow, savedMovie]);
        setSavedMovies((prevSavedMovies) => [...prevSavedMovies, savedMovie]);
      })
      .catch((error) => console.log(error));
  }

  function handleCardUnlike(movie) {
    if (movie._id) {
      movieRemover(movie._id);
    } else {
      const movieToDelete = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
      movieRemover(movieToDelete._id);
    }
  }

  return (
    <CurrentUserContext.Provider value={userData}>
      <>
        {location.pathname === '/' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ||
        location.pathname === '/profile' ? (
          <Header
            currentLocation={location.pathname}
            onNavButtonClick={handleNavMenuVisability}
            onCloseButtonClick={handleNavMenuVisability}
            visability={navigationOpened}
            loggedIn={authorized}
          />
        ) : null}
        <main className='content'>
          <Routes>
            <Route
              path='/signin'
              element={<Login onLogin={handleAuthorization} serverError={serverMessage} />}
            />
            <Route
              path='/signup'
              element={<Register onRegistration={handleRegistration} serverError={serverMessage} />}
            />
            <Route path='/' element={<Main />} />
            <Route path='/*' element={<NotFound />} />
            <Route
              path='/movies'
              element={
                <ProtectedRoute
                  element={
                    <Movies
                      currentLocation={location.pathname}
                      onSearchSubmit={handleSearchSubmit}
                      onCheckcboxClick={handleCheckboxClick}
                      isLoading={isLoading}
                      searchSuccses={searchSuccses}
                      filterData={filterData}
                      moviesToDisplay={moviesToDisplay}
                      savedMovies={savedMovies}
                      initialMovies={initialMovies}
                      onCardLike={handleCardLike}
                      onCardUnlike={handleCardUnlike}
                    />
                  }
                  loggedIn={authorized}
                />
              }
            />

            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute
                  element={
                    <SavedMovies
                      currentLocation={location.pathname}
                      loggedIn={authorized}
                      savedMovies={savedMoviesToDisplay}
                      onSavedSearchSubmit={handleSavedSearchSubmit}
                      onSavedCheckcboxClick={handleSavedCheckboxClick}
                      onCardUnlike={handleCardUnlike}
                      searchSuccses={searchSavedSuccses}
                    />
                  }
                  loggedIn
                />
              }
            />

            <Route
              path='/profile'
              element={
                <ProtectedRoute
                  element={
                    <Profile
                      onLogout={handleLogout}
                      onProfileSubmit={handleUpdateUser}
                      message={serverMessage}
                    />
                  }
                  loggedIn={authorized}
                />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
