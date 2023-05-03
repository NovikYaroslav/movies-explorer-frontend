import { useState, useEffect } from 'react';
import './index.css';
import SearchIcon from '../../../images/search-icon.svg';

function SearchForm() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div className='search'>
      <form className='search__form'>
        {windowWidth < 550 ? null : (
          <img className='search__form-image' src={SearchIcon} alt='иконка поиска' />
        )}
        <input placeholder='Фильм' className='search__form-input'></input>
        <button className='search__form-button'>Найти</button>
      </form>
      <div className='search__slider'>
        <button className='search__slider-button search__slider-button_active'></button>
        <p className='search__slider-title'>Короткометражки</p>
      </div>
    </div>
  );
}

export default SearchForm;
