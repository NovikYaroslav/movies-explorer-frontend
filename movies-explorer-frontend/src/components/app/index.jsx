import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  const [navigationOpened, setNavigationOpened] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [jwt, setJwt] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [initialMovies, setInitialMovies] = useState([]);
  const [filterData, setFilterData] = useState({ params: '', short: false });
  const [searchSuccses, setSearchSuccses] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  // Отображение лайков после перезагрузки не работает. Он не обновляет Save Movies проверь.
  // поиск по сохраненным проверь. Чек бокс не работает.

  console.log(initialMovies);

  useEffect(() => {
    if (jwt) {
      getUserInfoFromServer()
        .then((userData) => {
          setUserData(userData);
        })
        .catch((error) => {
          console.log(error.message);
        });
      getSavedMovies()
        .then((data) => {
          setSavedMovies(data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [loggedIn, jwt, savedMovies]);

  useEffect(() => {
    setServerMessage('');
    tokenCheck();
  }, []);

  useEffect(() => {
    if (moviesToDisplay.length !== 0 && filterData.params !== '') {
      localStorage.setItem('moviesToDisplay', JSON.stringify(moviesToDisplay));
      localStorage.setItem('filterData', JSON.stringify(filterData));
    }
  }, [moviesToDisplay, filterData]);

  useEffect(() => {
    const storedMoviesToDisplay = localStorage.getItem('moviesToDisplay');
    const storedFilterData = localStorage.getItem('filterData');

    if (storedMoviesToDisplay && storedFilterData) {
      setMoviesToDisplay(JSON.parse(storedMoviesToDisplay));
      setFilterData(JSON.parse(storedFilterData));
      setSearchSuccses(true);
    }
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setJwt(jwt);
      checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserData({ name: res.name, email: res.email });
          navigate('/movies', { replace: true });
        }
      });
    }
  }

  function handleNavMenuVisability() {
    setNavigationOpened(!navigationOpened);
  }
  function handleAuthorization(email, password) {
    authorize(email, password)
      .then(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
          getUserInfoFromServer().then((userData) => {
            Promise.resolve(setUserData({ name: userData.name, email: userData.email })).catch(
              (error) => {
                setServerMessage(error.message);
              },
            );
          });
          setJwt(jwt);
          setLoggedIn(true);
          navigate('/movies', { replace: true });
        }
      })
      .catch((error) => {
        setServerMessage(error.message);
      });
  }

  function handleRegistration(name, email, password) {
    register(name, email, password)
      .then(() => {
        setServerMessage('');
        setUserData({ name: name, email: email });
        setLoggedIn(true);
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
        setServerMessage('Данные успешно обновлены!');
      })
      .catch((error) => console.log(error.message));
  }

  function handleLogout() {
    if (loggedIn) {
      localStorage.removeItem('jwt');
      setLoggedIn(false);
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

  function handleCardLike(movie) {
    addMovie(movie)
      .then((savedMovie) => {
        setSavedMovies((prevSavedMovies) => [...prevSavedMovies, savedMovie]);
      })
      .catch((error) => console.log(error));
  }

  function movieRemover(_id) {
    deleteMovie(_id)
      .then((res) => {
        console.log(res);
        getSavedMovies()
          .then((data) => {
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

  function handleCardUnlike(movie) {
    if (movie._id) {
      movieRemover(movie._id);
    } else {
      const movieToDelete = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
      movieRemover(movieToDelete._id);
    }
  }

  function handleSavedSearchSubmit(data, short) {
    setSearchSuccses(false);
    setIsLoading(true);
    getSavedMovies()
      .then((movies) => {
        setFilterData({ params: data, short: short });
        setSavedMovies(filterMovies(movies, data, short).filtredMovies);
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
            loggedIn={loggedIn}
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
                  loggedIn={loggedIn}
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
                      loggedIn={loggedIn}
                      savedMovies={savedMovies}
                      onSavedSearchSubmit={handleSavedSearchSubmit}
                      onCardUnlike={handleCardUnlike}
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
                  loggedIn={loggedIn}
                />
              }
            />
            <Route path='/*' element={<NotFound />} />
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
