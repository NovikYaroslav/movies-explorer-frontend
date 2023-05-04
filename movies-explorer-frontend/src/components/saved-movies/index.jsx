import MoviesCardList from '../movies/movies-card-list';
import { favoriteMockCards } from '../../data/mockCards';
import SearchForm from '../movies/search-form';

function SavedMovies({ currentLocation }) {
  return (
    <section className='saved-movies'>
      <SearchForm />
      <MoviesCardList moviesForLayout={favoriteMockCards} currentLocation={currentLocation} />
    </section>
  );
}

export default SavedMovies;
