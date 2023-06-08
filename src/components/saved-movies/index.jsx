import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MoviesCardList from '../movies/movies-card-list';
import SearchForm from '../movies/search-form';
import {
  savedMoviesSelector,
  filtredSavedMoviesSelector,
  savedMoviesSearchParamsSelector,
  searchSavedSuccsesSelector,
} from '../../store/reducers/saved-movies';

function SavedMovies({
  currentLocation,
  // savedMovies,
  // searchSuccses,
  onSavedSearchSubmit,
  onSavedCheckcboxClick,
  onCardUnlike,
}) {
  const [resultMessage, setResultMessage] = useState('');
  const savedMovies = useSelector(filtredSavedMoviesSelector);
  const searchSuccses = useSelector(searchSavedSuccsesSelector);
  console.log(savedMovies);

  useEffect(() => {
    if (searchSuccses && savedMovies.length === 0) {
      setResultMessage('Ничего не найдено');
    } else {
      setResultMessage('');
    }
  }, [searchSuccses, savedMovies]);

  return (
    <section className='saved-movies'>
      <SearchForm
        onSearchSubmit={onSavedSearchSubmit}
        onCheckboxClick={onSavedCheckcboxClick}
        currentLocation={currentLocation}
      />
      {savedMovies.length !== 0 ? (
        <MoviesCardList
          savedMovies={savedMovies}
          moviesForLayout={savedMovies}
          currentLocation={currentLocation}
          onCardUnlike={onCardUnlike}
        />
      ) : null}
      {resultMessage && <h1 className='movies__message'>{resultMessage}</h1>}
    </section>
  );
}

export default SavedMovies;
