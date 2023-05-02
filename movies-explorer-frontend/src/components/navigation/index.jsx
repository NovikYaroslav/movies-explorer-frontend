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
          <button className='navigation__menu-item'>Главная</button>
          <button className='navigation__menu-item navigation__menu-item_active'>Фильмы</button>
          <button className='navigation__menu-item'>Сохранённые фильмы</button>
          <button className='navigation__menu-item'>
            Аккаунт
            <div className='header__account-logo' alt='account logo'></div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
