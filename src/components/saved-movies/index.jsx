import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MoviesCardList from '../movies/movies-card-list';
import SearchForm from '../movies/search-form';
import {
  filtredSavedMoviesSelector,
  searchSavedSuccsesSelector,
} from '../../store/reducers/saved-movies';

function SavedMovies({ currentLocation }) {
  const [resultMessage, setResultMessage] = useState('');
  const savedMovies = useSelector(filtredSavedMoviesSelector);
  const searchSuccses = useSelector(searchSavedSuccsesSelector);

  useEffect(() => {
    if (savedMovies.length === 0) {
      setResultMessage('No movies found');
    } else {
      setResultMessage('');
    }
  }, [searchSuccses, savedMovies]);

  return (
    <section className='saved-movies'>
      <SearchForm currentLocation={currentLocation} />
      {savedMovies.length !== 0 ? (
        <MoviesCardList moviesForLayout={savedMovies} currentLocation={currentLocation} />
      ) : null}
      {resultMessage && <h1 className='movies__message'>{resultMessage}</h1>}
    </section>
  );
}

export default SavedMovies;
