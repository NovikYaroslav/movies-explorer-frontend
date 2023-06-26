import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from '../navigation';
import menuPopupButton from '../../images/menu-popup-button.svg';
import logo from '../../images/logo.svg';
import { authorizationSelector } from '../../store/reducers/authorization';

function Header({ currentLocation }) {
  const [navigationOpened, setNavigationOpened] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const authorized = useSelector(authorizationSelector);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleNavMenuVisability() {
    setNavigationOpened(!navigationOpened);
  }

  return (
    <header className={`header ${currentLocation === '/' ? '' : 'header_location_main'}`}>
      <Link className='header__logo' to='/'>
        <img src={logo} alt='logo' />
      </Link>
      {currentLocation === '/' && !authorized ? (
        <div className='header__buttons-bar'>
          <Link className='header__button-registrate' to='/signup'>
            Registration
          </Link>

          <Link className='header__button-login' to='/signin'>
            Login
          </Link>
        </div>
      ) : windowWidth < 800 ? (
        <img
          onClick={handleNavMenuVisability}
          className='header__button-menu'
          src={menuPopupButton}
          alt='иконка кнопки меню'
        />
      ) : (
        <div className='header__buttons-bar'>
          <nav className='header__movies-navigator'>
            <Link
              className={`header__button-movies ${
                currentLocation === '/movies' ? 'header__button-movies_active' : ''
              }`}
              to='/movies'>
              Movies
            </Link>
            <Link
              className={`header__button-movies ${
                currentLocation === '/saved-movies' ? 'header__button-movies_active' : ''
              }`}
              to='/saved-movies'>
              Saved movies
            </Link>
          </nav>
          <Link className='header__button-account' to='/profile'>
            Account
            <div className='header__account-logo' alt='account logo'></div>
          </Link>
        </div>
      )}
      <Navigation
        opened={navigationOpened}
        onCloseButtonClick={handleNavMenuVisability}
        currentLocation={currentLocation}
      />
    </header>
  );
}

export default Header;
