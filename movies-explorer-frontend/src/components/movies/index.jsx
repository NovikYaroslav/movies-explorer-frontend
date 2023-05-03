import SearchForm from './search-form';
import MoviesCardList from './movies-card-list';
import Preloader from './preloader';
import { mockCards } from '../../data/mockCards';

function Movies({ currentLocation }) {
  return (
    <>
      <SearchForm />
      <MoviesCardList moviesForLayout={mockCards} currentLocation={currentLocation} />
      <Preloader />
    </>
  );
}

export default Movies;
