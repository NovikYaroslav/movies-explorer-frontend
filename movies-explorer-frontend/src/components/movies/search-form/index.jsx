import { useState, useEffect } from 'react';
import './index.css';
import SearchIcon from '../../../images/search-icon.svg';

function SearchForm({ onSearchSubmit }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchData, setSearchData] = useState('');
  const [shortSelected, setShortSelected] = useState(false);
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    const storedFilterData = localStorage.getItem('filterData');
    if (storedFilterData) {
      setSearchData(JSON.parse(storedFilterData).params);
      setShortSelected(JSON.parse(storedFilterData).short);
    }
  }, []);

  const formFillHandle = (event) => {
    const value = event.target.value;
    if (value) {
      setSearchError('');
    }
    setSearchData(value);
  };

  const formSubmitHandle = (evt) => {
    evt.preventDefault();
    if (!searchData) {
      setSearchError('Нужно ввести ключевое слово');
    } else {
      onSearchSubmit(searchData, shortSelected);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='search'>
      <form className='search__form' name='search' onSubmit={formSubmitHandle}>
        {windowWidth < 550 ? null : (
          <img className='search__form-image' src={SearchIcon} alt='иконка поиска' />
        )}
        <input
          placeholder='Фильм'
          name='search'
          className='search__form-input'
          type='text'
          value={searchData}
          onChange={formFillHandle}></input>
        <button className='search__form-button' type='submit'>
          Найти
        </button>
      </form>
      <span className='search__form-error'>{searchError}</span>
      <div className='search__slider'>
        <input
          className={`search__slider-button ${shortSelected ? 'search__slider-button_active' : ''}`}
          type='checkbox'
          name='short'
          checked={shortSelected}
          onChange={() => setShortSelected(!shortSelected)}></input>
        <label className='search__slider-title'>Короткометражки</label>
      </div>
    </div>
  );
}

export default SearchForm;
