import './index.css';
import { useState, useEffect } from 'react';
import SearchForm from './search-form';
import MoviesCardList from './movies-card-list';
import Preloader from '../preloader';

function Movies({
  currentLocation,
  onSearchSubmit,
  onCheckcboxClick,
  isLoading,
  searchSuccses,
  moviesToDisplay,
  savedMovies,
  initialMovies,
  onCardLike,
  onCardUnlike,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moviesCount, setMoviesCount] = useState(0);
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', () => setTimeout(handleResize, 3000));
    return () => window.removeEventListener('resize', handleResize);
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

  return (
    <section className='movies'>
      <SearchForm onSearchSubmit={onSearchSubmit} onCheckboxClick={onCheckcboxClick} />

      {isLoading ? <Preloader /> : null}

      {searchSuccses && moviesToDisplay.length !== 0 ? (
        <MoviesCardList
          moviesForLayout={moviesToDisplay.slice(0, moviesCount)}
          savedMovies={savedMovies}
          currentLocation={currentLocation}
          onCardLike={onCardLike}
          onCardUnlike={onCardUnlike}
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
