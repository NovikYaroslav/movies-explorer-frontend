import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import menuPopupButton from '../../images/menu-popup-button.svg';
import logo from '../../images/logo.svg';
import Navigation from '../navigation';

function Header({ currentLocation, onNavButtonClick, onCloseButtonClick, visability, loggedIn }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={`header ${currentLocation === '/' ? '' : 'header_location_main'}`}>
      <Link className='header__logo' to='/'>
        <img src={logo} alt='logo' />
      </Link>
      {currentLocation === '/' && !loggedIn ? (
        <div className='header__buttons-bar'>
          <Link className='header__button-registrate' to='/signup'>
            Регистрация
          </Link>

          <Link className='header__button-login' to='/signin'>
            Войти
          </Link>
        </div>
      ) : windowWidth < 800 ? (
        <img
          onClick={() => {
            onNavButtonClick();
          }}
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
              Фильмы
            </Link>
            <Link
              className={`header__button-movies ${
                currentLocation === '/saved-movies' ? 'header__button-movies_active' : ''
              }`}
              to='/saved-movies'>
              Сохраненые фильмы
            </Link>
          </nav>
          <Link className='header__button-account' to='/profile'>
            Аккаунт
            <div className='header__account-logo' alt='account logo'></div>
          </Link>
        </div>
      )}
      <Navigation opened={visability} onCloseButtonClick={onCloseButtonClick} />
    </header>
  );
}

export default Header;
