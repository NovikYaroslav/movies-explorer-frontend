import { Link } from 'react-router-dom';
import './index.css';

function Navigation({ opened, onCloseButtonClick, currentLocation }) {
  return (
    <div className={`navigation ${opened ? 'navigation_opened' : ''}`}>
      <div className='navigation__menu'>
        <button
          className='navigation__close-button'
          alt='кнопка закрытия меню'
          onClick={onCloseButtonClick}></button>
        <div className='navigation__menu-list'>
          <Link
            onClick={onCloseButtonClick}
            className={`navigation__menu-item ${
              currentLocation === '/' ? 'navigation__menu-item_active' : ''
            }`}
            to='/'>
            Main
          </Link>
          <Link
            onClick={onCloseButtonClick}
            to='/movies'
            className={`navigation__menu-item ${
              currentLocation === '/movies' ? 'navigation__menu-item_active' : ''
            }`}>
            Movies
          </Link>
          <Link
            onClick={onCloseButtonClick}
            to='/saved-movies'
            className={`navigation__menu-item ${
              currentLocation === '/saved-movies' ? 'navigation__menu-item_active' : ''
            }`}>
            Saved movies
          </Link>
          <Link
            onClick={onCloseButtonClick}
            to='/profile'
            className={`navigation__menu-item ${
              currentLocation === '/profile' ? 'navigation__menu-item_active' : ''
            }`}>
            Account
            <div className='header__account-logo' alt='account logo'></div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
