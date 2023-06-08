import './index.css';
import MoviesCard from '../movies-card';

function MoviesCardList({
  moviesForLayout,
  savedMovies,
  currentLocation,
  onCardLike,
  onCardUnlike,
}) {
  return (
    <ul className='movies-list'>
      {moviesForLayout.map((movie) => {
        return (
          <MoviesCard
            movie={movie}
            currentLocation={currentLocation}
            key={movie.nameEN}
            // savedMovies={savedMovies}
            onCardLike={onCardLike}
            onCardUnlike={onCardUnlike}
          />
        );
      })}
    </ul>
  );
}

export default MoviesCardList;
