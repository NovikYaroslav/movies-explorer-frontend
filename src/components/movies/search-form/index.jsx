import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import SearchIcon from '../../../images/search-icon.svg';
import {
  initialMoviesSearchParamsSelector,
  setSearchParams,
  setSearchSuccses,
  setShortState,
} from '../../../store/reducers/movies';

import {
  savedMoviesSearchParamsSelector,
  setSavedMoviesSearchParams,
  setSavedSearchSuccses,
  setSavedShortState,
} from '../../../store/reducers/saved-movies';

function SearchForm({ currentLocation }) {
  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchData, setSearchData] = useState('');
  const [shortSelected, setShortSelected] = useState(false);
  const [searchError, setSearchError] = useState('');
  const moviesSearchParams = useSelector(initialMoviesSearchParamsSelector);
  const savedMoviesSearchParams = useSelector(savedMoviesSearchParamsSelector);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentLocation === '/saved-movies') {
      setSearchData(savedMoviesSearchParams.params);
      setShortSelected(savedMoviesSearchParams.short);
    } else {
      setSearchData(moviesSearchParams.params);
      setShortSelected(moviesSearchParams.short);
    }
  }, []);

  function searchButtonRenderHandler() {
    if (currentLocation === '/saved-movies') {
      if (searchData === '' && !shortSelected) {
        return 'Search all';
      } else {
        return 'Search';
      }
    } else {
      return 'Search';
    }
  }

  const formFillHandle = (event) => {
    const value = event.target.value;
    if (value) {
      setSearchError('');
    }
    setSearchData(value);
  };

  function handleCheckboxChange() {
    setShortSelected(!shortSelected);
    if (currentLocation === '/movies') {
      dispatch(setShortState(!shortSelected));
    } else {
      dispatch(setSavedShortState(!shortSelected));
    }
  }

  const formSubmitHandle = (evt) => {
    evt.preventDefault();
    if (currentLocation === '/movies') {
      if (!searchData) {
        setSearchError('You need to enter a keyword');
      } else {
        dispatch(setSearchParams({ params: searchData, short: shortSelected }));
        dispatch(setSearchSuccses(true));
      }
    } else {
      if (!searchData) {
        dispatch(setSavedMoviesSearchParams({ params: searchData, short: shortSelected }));
        dispatch(setSavedSearchSuccses(true));
      } else {
        dispatch(setSavedMoviesSearchParams({ params: searchData, short: shortSelected }));
        dispatch(setSavedSearchSuccses(true));
      }
      dispatch(setSavedMoviesSearchParams({ params: searchData, short: shortSelected }));
      dispatch(setSavedSearchSuccses(true));
    }
  };

  return (
    <div className='search'>
      <form className='search__form' name='search' onSubmit={formSubmitHandle}>
        {windowWidth < 550 ? null : (
          <img className='search__form-image' src={SearchIcon} alt='search icon' />
        )}
        <input
          placeholder='Movie'
          name='search'
          className='search__form-input'
          type='text'
          value={searchData}
          onChange={formFillHandle}></input>
        <button className='search__form-button' type='submit'>
          {searchButtonRenderHandler()}
        </button>
      </form>
      <span className='search__form-error'>{searchError}</span>
      <div className='search__slider'>
        <input
          className={`search__slider-button ${shortSelected ? 'search__slider-button_active' : ''}`}
          type='checkbox'
          name='short'
          checked={shortSelected}
          onChange={handleCheckboxChange}></input>
        <label className='search__slider-title'>Short films</label>
      </div>
    </div>
  );
}

export default SearchForm;
