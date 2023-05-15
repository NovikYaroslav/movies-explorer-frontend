import MoviesCardList from '../movies/movies-card-list';
import SearchForm from '../movies/search-form';

function SavedMovies({
  currentLocation,
  savedMovies,
  onSavedSearchSubmit,
  onSavedCheckcboxClick,
  onCardUnlike,
}) {
  return (
    <section className='saved-movies'>
      <SearchForm onSearchSubmit={onSavedSearchSubmit} onCheckboxClick={onSavedCheckcboxClick} />
      <MoviesCardList
        savedMovies={savedMovies}
        moviesForLayout={savedMovies}
        currentLocation={currentLocation}
        onCardUnlike={onCardUnlike}
      />
    </section>
  );
}

export default SavedMovies;
