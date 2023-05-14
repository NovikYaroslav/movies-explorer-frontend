import { useState, useEffect } from 'react';
import Footer from '../footer';
import Header from '../header';
import Login from '../login';
import Main from '../main';
import Movies from '../movies';
import NotFound from '../not-found/not-found';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Register from '../register';
import Profile from '../profile';
import SavedMovies from '../saved-movies';
import {
  register,
  authorize,
  getUserInfoFromServer,
  checkToken,
  editUserData,
} from '../../utils/MainApi';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [navigationOpened, setNavigationOpened] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [jwt, setJwt] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });

  console.log(userData);

  useEffect(() => {
    console.log('проверяю токен');
    if (jwt) {
      getUserInfoFromServer()
        .then((userData) => {
          setUserData(userData);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [loggedIn, jwt]);

  useEffect(() => {
    setServerMessage('');
    tokenCheck();
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

  function handleRegistration(name, email, password) {
    register(name, email, password)
      .then(() => {
        setServerMessage('');
        setUserData({ name: name, email: email });
        navigate('/movies', { replace: true });
      })
      .catch((error) => {
        setServerMessage(error.message);
      });
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

  return (
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
          <Route path='/movies' element={<Movies currentLocation={location.pathname} />} />
          <Route
            path='/saved-movies'
            element={<SavedMovies currentLocation={location.pathname} />}
          />
          <Route path='/*' element={<NotFound />} />
          <Route
            path='/profile'
            element={
              <Profile
                onLogout={handleLogout}
                userInfo={userData}
                onProfileSubmit={handleUpdateUser}
                message={serverMessage}
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
  );
}

export default App;
