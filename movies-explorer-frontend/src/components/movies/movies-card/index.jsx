import { useState } from 'react';
import './index.css';

function MoviesCard({ movie, currentLocation, onCardLike, onCardUnlike, wasSaved }) {
  const [isLiked, setIsLiked] = useState(wasSaved);

  function formatTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const paddedHours = hours > 0 ? `${hours}ч ` : '';
    const paddedMinutes = minutes.toString().padStart(2, '0') + 'м';
    return `${paddedHours}${paddedMinutes}`;
  }

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
