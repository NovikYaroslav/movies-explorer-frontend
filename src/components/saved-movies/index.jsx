import { useEffect, useState } from 'react';
import MoviesCardList from '../movies/movies-card-list';
import SearchForm from '../movies/search-form';

function SavedMovies({
  currentLocation,
  savedMovies,
  searchSuccses,
  onSavedSearchSubmit,
  onSavedCheckcboxClick,
  onCardUnlike,
}) {
  const [resultMessage, setResultMessage] = useState('');

  console.log(searchSuccses);

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
