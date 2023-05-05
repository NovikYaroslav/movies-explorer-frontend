import { Link } from 'react-router-dom';
import './index.css';

function Navigation({ opened, onCloseButtonClick }) {
  return (
    <div className={`navigation ${opened ? 'navigation_opened' : ''}`}>
      <div className='navigation__menu'>
        <button
          className='navigation__close-button'
          alt='кнопка закрытия меню'
          onClick={onCloseButtonClick}></button>
        <div className='navigation__menu-list'>
          <Link className='navigation__menu-item' to='/'>
            Главная
          </Link>
          <Link to='/movies' className='navigation__menu-item navigation__menu-item_active'>
            Фильмы
          </Link>
          <Link to='/saved-movies' className='navigation__menu-item'>
            Сохранённые фильмы
          </Link>
          <Link to='/profile' className='navigation__menu-item'>
            Аккаунт
            <div className='header__account-logo' alt='account logo'></div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
