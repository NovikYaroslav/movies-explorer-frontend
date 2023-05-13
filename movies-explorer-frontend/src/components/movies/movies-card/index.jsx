import { useState } from 'react';
import './index.css';
import { addMovie } from '../../../utils/MainApi';

function MoviesCard({ movie, currentLocation }) {
  const [isLiked, setIsLiked] = useState(false);

  function formatTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const paddedHours = hours > 0 ? `${hours}ч ` : '';
    const paddedMinutes = minutes.toString().padStart(2, '0') + 'м';
    return `${paddedHours}${paddedMinutes}`;
  }
  // неработающий код
  function handleMovieLike() {
    if (isLiked) {
      setIsLiked(!isLiked);
      // deleteMovie(movie.id).catch((error) => console.log(error));
    }
    setIsLiked(!isLiked);
    addMovie(movie).catch((error) => console.log(error));
  }

  return (
    <li className='card'>
      <div className='card__header'>
        <div className='card__header-text'>
          <h3 className='card__title'>{movie.nameRU}</h3>
          <div className='card__link'></div>
          <p className='card__duration'>{formatTime(movie.duration)}</p>
        </div>
        <button
          className={`card__button ${
            currentLocation === '/saved-movies'
              ? 'card__button_delete'
              : isLiked
              ? 'card__button_active'
              : ''
          }`}
          onClick={handleMovieLike}></button>
      </div>
      <a className='card__link' href={movie.trailerLink} target='_blank' rel='noopener noreferrer'>
        <img
          className='card__preview'
          src={`https://api.nomoreparties.co/${movie.image.url}`}
          alt='превью фильма'
        />
      </a>
    </li>
  );
}

export default MoviesCard;
