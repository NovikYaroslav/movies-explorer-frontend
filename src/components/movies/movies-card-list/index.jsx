import './index.css';
import MoviesCard from '../movies-card';

function MoviesCardList({ moviesForLayout, currentLocation }) {
  return (
    <ul className='movies-list'>
      {moviesForLayout.map((movie) => {
        return <MoviesCard movie={movie} currentLocation={currentLocation} key={movie.nameEN} />;
      })}
    </ul>
  );
}

export default MoviesCardList;
