import { useState, useEffect } from 'react';
import menuPopupButton from '../../images/menu-popup-button.svg';
import logo from '../../images/logo.svg';

function Header({ currentLocation }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`header ${currentLocation === '/' ? '' : 'header_location_main'}`}>
      <img className='header__logo' src={logo} alt='logo' />
      {currentLocation === '/' ? (
        <div className='header__buttons-bar'>
          <button className='header__button-registrate'>Регистрация</button>
          <button className='header__button-login'>Войти</button>
        </div>
      ) : windowWidth < 800 ? (
        <img className='header__button-menu' src={menuPopupButton} alt='иконка кнопки меню' />
      ) : (
        <div className='header__buttons-bar'>
          <nav className='header__movies-navigator'>
            <button className='header__button-movies header__button-movies_active'>Фильмы</button>
            <button className='header__button-movies'>Сохраненые фильмы</button>
          </nav>
          <button className='header__button-account'>
            Аккаунт
            <div className='header__account-logo' alt='account logo'></div>
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
