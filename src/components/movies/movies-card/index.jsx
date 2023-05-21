import { useEffect, useState } from 'react';
import './index.css';
import { ONE_HOUR_IN_MINUTES, LENGTH_OF_MINUTES_TO_DISPLAY } from '../../../utils/const';

function MoviesCard({ movie, currentLocation, onCardLike, onCardUnlike, wasSaved, savedMovies }) {
  const [isLiked, setIsLiked] = useState(false);

  function formatTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / ONE_HOUR_IN_MINUTES);
    const minutes = totalMinutes % ONE_HOUR_IN_MINUTES;
    const paddedHours = hours > 0 ? `${hours}ч ` : '';
    const paddedMinutes = minutes.toString().padStart(LENGTH_OF_MINUTES_TO_DISPLAY, '0') + 'м';
    return `${paddedHours}${paddedMinutes}`;
  }

  useEffect(() => {
    if (savedMovies.some((savedMovie) => savedMovie.movieId === movie.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [savedMovies, movie.id]);

  function handleMovieLike() {
    if (isLiked === false) {
      setIsLiked(true);
      onCardLike(movie);
    }
    if (isLiked === true) {
      onCardUnlike(movie);
      setIsLiked(false);
    }
  }

  return (
    <li className='card'>
      <div className='card__header'>
        <div className='card__header-text'>
          <h3 className='card__title'>{movie.nameRU}</h3>
          <div className='card__link'></div>
          <p className='card__duration'>{formatTime(movie.duration)}</p>
        </div>

        {currentLocation === '/saved-movies' ? (
          <button
            className='card__button card__button_delete'
            onClick={() => {
              onCardUnlike(movie);
            }}></button>
        ) : (
          <button
            className={`card__button ${isLiked ? 'card__button_active' : ''}`}
            onClick={handleMovieLike}></button>
        )}
      </div>
      <a className='card__link' href={movie.trailerLink} target='_blank' rel='noopener noreferrer'>
        <img
          className='card__preview'
          src={
            currentLocation === '/saved-movies'
              ? movie.image
              : `https://api.nomoreparties.co/${movie.image.url}`
          }
          alt='превью фильма'
        />
      </a>
    </li>
  );
}

export default MoviesCard;
