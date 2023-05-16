import React from 'react';
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
        const wasSaved = savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
        return (
          <MoviesCard
            movie={movie}
            currentLocation={currentLocation}
            key={movie.nameEN}
            wasSaved={wasSaved}
            onCardLike={onCardLike}
            onCardUnlike={onCardUnlike}
          />
        );
      })}
    </ul>
  );
}

export default MoviesCardList;
