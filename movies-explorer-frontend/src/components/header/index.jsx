import { useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './index.css';

function Header() {
  const location = useLocation();
  const landing = location.pathname !== '/';

  return (
    <div className={landing ? 'header' : 'header_location_main'}>
      <img className='header__logo' src={logo} alt='logo' />
      {/* <div className='header__buttons-bar'>
        <button className='header__button-registrate'>Регистрация</button>
        <button className='header__button-login'>Войти</button>
      </div> */}
      {/* <div className='header__buttons-bar'>
        <nav className='header__movies-navigator'>
          <button className='header__button-movies header__button-movies_active'>Фильмы</button>
          <button className='header__button-movies'>Сохраненые фильмы</button>
        </nav>
        <button className='header__button-account'>
          Аккаунт
          <div className='header__account-logo' alt='account logo'></div>
        </button>
      </div> */}
    </div>
  );
}

export default Header;
