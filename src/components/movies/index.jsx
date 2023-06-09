import './index.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Preloader from '../preloader';
import SearchForm from './search-form';
import MoviesCardList from './movies-card-list';
import {
  MOVIES_TO_SHOW_INITIAL,
  MOVIES_TO_SHOW_ON_WIDTH_MORE_THEN_940,
  MOVIES_TO_SHOW_ON_WIDTH_LESS_THEN_940,
  MOVIES_TO_SHOW_ON_WIDTH_LESS_THEN_520,
  AMOUNT_TO_ADD_ON_WIDTH_LESS_THEN_940,
  AMOUNT_TO_ADD_ON_WIDTH_MORE_THEN_940,
} from '../../utils/const';
import {
  filtredInitialMoviesSelector,
  moviesSelector,
  searchSuccsesSelector,
  loadingSelector,
} from '../../store/reducers/movies';

function Movies({ currentLocation }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moviesCount, setMoviesCount] = useState(MOVIES_TO_SHOW_INITIAL);
  const [resultMessage, setResultMessage] = useState('');
  const moviesToShow = useSelector(filtredInitialMoviesSelector);
  const initialMovies = useSelector(moviesSelector);
  const searchSuccses = useSelector(searchSuccsesSelector);
  const loaded = useSelector(loadingSelector);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', () => setTimeout(handleResize, 3000));
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (loaded && initialMovies.length === 0) {
      setResultMessage(
        'During the request, an error occurred. Perhaps the problem with the connection or the server is not available. Wait a bit and try again',
      );
    } else if (searchSuccses && moviesToShow.length === 0) {
      setResultMessage('Nothing found');
    } else if (searchSuccses && moviesToShow.length !== 0) {
      setResultMessage('');
    } else {
      setResultMessage(
        'Just enter a letter or word in the search box to find a movie from the BeatFilm database.',
      );
    }
  }, [searchSuccses, moviesToShow, initialMovies]);

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

  if (!loaded) {
    return <Preloader />;
  }

  return (
    <section className='movies'>
      <SearchForm currentLocation={currentLocation} />
      {searchSuccses && moviesToShow.length !== 0 ? (
        <MoviesCardList
          moviesForLayout={moviesToShow.slice(0, moviesCount)}
          currentLocation={currentLocation}
        />
      ) : null}

      {resultMessage && <h1 className='movies__message'>{resultMessage}</h1>}
      {moviesToShow.length > moviesCount && (
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
