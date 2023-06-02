import './index.css';
import { useState, useEffect } from 'react';
import SearchForm from './search-form';
import MoviesCardList from './movies-card-list';
import Preloader from '../preloader';
import {
  MOVIES_TO_SHOW_INITIAL,
  MOVIES_TO_SHOW_ON_WIDTH_MORE_THEN_940,
  MOVIES_TO_SHOW_ON_WIDTH_LESS_THEN_940,
  MOVIES_TO_SHOW_ON_WIDTH_LESS_THEN_520,
  AMOUNT_TO_ADD_ON_WIDTH_LESS_THEN_940,
  AMOUNT_TO_ADD_ON_WIDTH_MORE_THEN_940,
} from '../../utils/const';

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
  const [moviesCount, setMoviesCount] = useState(MOVIES_TO_SHOW_INITIAL);
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
        'During the request, an error occurred.Perhaps the problem with the connection or the server is not available.Wait a bit and try again',
      );
    } else if (searchSuccses && moviesToDisplay.length === 0) {
      setResultMessage('Nothing found');
    } else {
      setResultMessage('');
    }
  }, [searchSuccses, moviesToDisplay, initialMovies]);

  useEffect(() => {
    if (windowWidth < 940) {
      setMoviesCount(MOVIES_TO_SHOW_ON_WIDTH_LESS_THEN_940);
    }
    if (windowWidth < 520) {
      setMoviesCount(MOVIES_TO_SHOW_ON_WIDTH_LESS_THEN_520);
    }
    if (windowWidth > 940) {
      setMoviesCount(MOVIES_TO_SHOW_ON_WIDTH_MORE_THEN_940);
    }
  }, [windowWidth]);

  function handleMoviesCount() {
    if (windowWidth < 940) {
      setMoviesCount(moviesCount + AMOUNT_TO_ADD_ON_WIDTH_LESS_THEN_940);
    } else {
      setMoviesCount(moviesCount + AMOUNT_TO_ADD_ON_WIDTH_MORE_THEN_940);
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
            More
          </button>
        </div>
      )}
    </section>
  );
}

export default Movies;
