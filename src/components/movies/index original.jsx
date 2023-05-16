import './index.css';
import { useState, useEffect } from 'react';
import SearchForm from './search-form';
import MoviesCardList from './movies-card-list';
import Preloader from '../preloader';
import { getMovies } from '../../utils/MoviesApi';

function Movies({ currentLocation, onSearchSubmit }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const [searchSuccses, setSearchSuccses] = useState(false);
  const [filterData, setFilterData] = useState({ params: '', short: false });
  const [moviesCount, setMoviesCount] = useState(0);
  const [resultMessage, setResultMessage] = useState('');
  const [moviesToDisplay, setMoviesToDisplay] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);

  function handleCheckboxClick(updatedStatus) {
    setFilterData((prevFilterData) => {
      return { ...prevFilterData, short: updatedStatus };
    });
    filterMovies(initialMovies, filterData.params, updatedStatus);
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', () => setTimeout(handleResize, 3000));
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedMoviesToDisplay = localStorage.getItem('moviesToDisplay');
    const storedFilterData = localStorage.getItem('filterData');

    if (storedMoviesToDisplay && storedFilterData) {
      setMoviesToDisplay(JSON.parse(storedMoviesToDisplay));
      setFilterData(JSON.parse(storedFilterData));
      setSearchSuccses(true);
    }
  }, []);

  useEffect(() => {
    if (searchSuccses && initialMovies.length === 0 && moviesToDisplay.length === 0) {
      setResultMessage(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
      );
    } else if (searchSuccses && moviesToDisplay.length === 0) {
      setResultMessage('Ничего не найдено');
    } else {
      setResultMessage('');
    }
  }, [searchSuccses, moviesToDisplay, initialMovies]);

  useEffect(() => {
    if (moviesToDisplay.length !== 0 && filterData.params !== '') {
      localStorage.setItem('moviesToDisplay', JSON.stringify(moviesToDisplay));
      localStorage.setItem('filterData', JSON.stringify(filterData));
    }
  }, [moviesToDisplay, filterData]);

  // function handleSearchSubmit(data, short) {
  //   setSearchSuccses(false);
  //   setIsLoading(true);
  //   getMovies()
  //     .then((movies) => {
  //       setInitialMovies(movies);
  //       setFilterData({ params: data, short: short });
  //       filterMovies(movies, data, short);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setSearchSuccses(true);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }

  useEffect(() => {
    if (windowWidth < 940) {
      setMoviesCount(8);
    }
    if (windowWidth < 520) {
      setMoviesCount(5);
    }
    if (windowWidth > 940) {
      setMoviesCount(12);
    }
  }, [windowWidth]);

  function handleMoviesCount() {
    if (windowWidth < 940) {
      setMoviesCount(moviesCount + 2);
    } else {
      setMoviesCount(moviesCount + 3);
    }
  }

  function filterMovies(movies, data, short) {
    setMoviesToDisplay(
      movies.filter((movie) => movie.nameRU.includes(data) && (short ? movie.duration < 40 : true)),
    );
    setSearchSuccses(true);
  }

  return (
    <section className='movies'>
      <SearchForm onSearchSubmit={onSearchSubmit} onCheckboxClick={handleCheckboxClick} />

      {isLoading ? <Preloader /> : null}

      {searchSuccses && moviesToDisplay.length !== 0 ? (
        <MoviesCardList
          moviesForLayout={moviesToDisplay.slice(0, moviesCount)}
          currentLocation={currentLocation}
        />
      ) : null}

      {resultMessage && <h1 className='movies__message'>{resultMessage}</h1>}

      {searchSuccses && moviesToDisplay.length > moviesCount && (
        <div className='more'>
          <button className='more__button' onClick={handleMoviesCount}>
            Ещё
          </button>
        </div>
      )}
    </section>
  );
}

export default Movies;
