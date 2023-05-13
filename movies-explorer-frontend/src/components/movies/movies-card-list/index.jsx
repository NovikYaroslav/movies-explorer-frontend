import './index.css';
import MoviesCard from '../movies-card';

function MoviesCardList({ moviesForLayout, currentLocation }) {
  return (
    <ul className='movies-list'>
      {moviesForLayout.map((movie) => (
        <MoviesCard
          // title={movie.nameRU}
          // duration={movie.duration}
          // preview={`https://api.nomoreparties.co/${movie.image.url}`}
          // trailerLink={movie.trailerLink}
          movie={movie}
          currentLocation={currentLocation}
          key={movie.id}
        />
      ))}
    </ul>
  );
}

export default MoviesCardList;
