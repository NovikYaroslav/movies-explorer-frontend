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
  const [searchSavedSuccses, setSearchSavedSuccses] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filterSavedData, setFilterSavedData] = useState({ params: '', short: false });

  console.log(` сохраненные ${savedMovies}`);
  console.log(` отображаемые ${moviesToDisplay}`);
  console.log(` искомые ${initialMovies}`);

  useEffect(() => {
    setServerMessage('');
    tokenCheck();
  }, []);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setJwt(jwt);
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserData({ name: res.name, email: res.email });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  useEffect(() => {
    if (jwt) {
      Promise.all([getUserInfoFromServer(), getSavedMovies()])
        .then(([userData, savedMovies]) => {
          setUserData(userData);
          const userMovies = savedMovies.filter((movie) => movie.owner === userData._id);
          setSavedMovies(userMovies);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [jwt]);

  useEffect(() => {
    if (savedMovies.length !== 0 && filterSavedData.params !== '') {
      localStorage.setItem('filterSavedData', JSON.stringify(filterSavedData));
    }
    if (moviesToDisplay.length !== 0 && filterData.params !== '') {
      localStorage.setItem('moviesToDisplay', JSON.stringify(moviesToDisplay));
      localStorage.setItem('filterData', JSON.stringify(filterData));
    }
  }, [moviesToDisplay, filterData, filterSavedData]);

  useEffect(() => {
    const storedMoviesToDisplay = localStorage.getItem('moviesToDisplay');
    const storedFilterData = localStorage.getItem('filterData');
    console.log(` отображаемые в хранилище ${JSON.parse(storedMoviesToDisplay)}`);
    if (storedMoviesToDisplay && storedFilterData) {
      setMoviesToDisplay(JSON.parse(storedMoviesToDisplay));
      setFilterData(JSON.parse(storedFilterData));
      setSearchSuccses(true);
    }
  }, []);

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
      localStorage.removeItem('moviesToDisplay');
      localStorage.removeItem('filterData');
      localStorage.removeItem('filterSavedData');
      setMoviesToDisplay([]);
      setFilterData({ params: '', short: false });
      setFilterSavedData({ params: '', short: false });
      setSearchSuccses(false);
      setSearchSavedSuccses(false);
      setLoggedIn(false);
      navigate('/', { replace: true });
    }
  }

  function handleSearchSubmit(data, short) {
    console.log('сработал поиск по форме');
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
    console.log('сработал чекбокс');
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
    console.log('сработал чекбокс по сохраненным');
    setSearchSavedSuccses(false);
    setIsLoading(true);
    getSavedMovies()
      .then((movies) => {
        setFilterSavedData({ params: data, short: short });
        setSavedMovies(filterMovies(movies, data, short).filtredMovies);
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
    console.log('сработал поиск по сохраненным');
    setFilterSavedData((prevFilterData) => {
      return { params: prevFilterData.params, short: updatedStatus };
    });
    setSearchSavedSuccses(false);
    getSavedMovies()
      .then((movies) => {
        setSavedMovies(filterMovies(movies, filterData.params, updatedStatus).filtredMovies);
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
                  loggedIn={loggedIn}
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
