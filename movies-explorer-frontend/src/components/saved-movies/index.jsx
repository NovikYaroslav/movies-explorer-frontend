import MoviesCardList from '../movies/movies-card-list';
import { favoriteMockCards } from '../../data/mockCards';
import SearchForm from '../movies/search-form';

function SavedMovies({ currentLocation }) {
  return (
    <>
      <SearchForm />
      <MoviesCardList moviesForLayout={favoriteMockCards} currentLocation={currentLocation} />
    </>
  );
}

export default SavedMovies;
