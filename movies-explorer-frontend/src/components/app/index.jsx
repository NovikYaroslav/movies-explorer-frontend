import { useState } from 'react';
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
import { register } from '../../utils/MainApi';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [navigationOpened, setNavigationOpened] = useState(false);
  const [RegistrationMessage, setRegistrationMessage] = useState('');

  function handleNavMenuVisability() {
    setNavigationOpened(!navigationOpened);
  }

  function handleRegistration(name, email, password) {
    register(name, email, password)
      .then(() => {
        setRegistrationMessage('');
        navigate('/movies', { replace: true });
      })
      .catch((error) => {
        setRegistrationMessage(error.message);
      });
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
          <Route path='/signin' element={<Login />} />
          <Route
            path='/signup'
            element={
              <Register
                onRegistration={handleRegistration}
                registrationError={RegistrationMessage}
              />
            }
          />
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={<Movies currentLocation={location.pathname} />} />
          <Route
            path='/saved-movies'
            element={<SavedMovies currentLocation={location.pathname} />}
          />
          <Route path='/*' element={<NotFound />} />
          <Route path='/profile' element={<Profile />} />
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
