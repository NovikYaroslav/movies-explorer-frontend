import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
import { ONE_HOUR_IN_MINUTES, LENGTH_OF_MINUTES_TO_DISPLAY } from '../../../utils/const';
import { savedMoviesSelector } from '../../../store/reducers/saved-movies';
import { deleteSavedMovie, postSavedMovie } from '../../../store/api-actions';

function MoviesCard({ movie, currentLocation }) {
  const dispatch = useDispatch();
  const savedMovies = useSelector(savedMoviesSelector);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (savedMovies.some((savedMovie) => savedMovie.movieId === movie.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [savedMovies, movie.id]);

  function formatTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / ONE_HOUR_IN_MINUTES);
    const minutes = totalMinutes % ONE_HOUR_IN_MINUTES;
    const paddedHours = hours > 0 ? `${hours}ч ` : '';
    const paddedMinutes = minutes.toString().padStart(LENGTH_OF_MINUTES_TO_DISPLAY, '0') + 'м';
    return `${paddedHours}${paddedMinutes}`;
  }

  function handleCardUnlike(movie) {
    if (movie._id) {
      dispatch(deleteSavedMovie(movie._id));
    } else {
      const movieToDelete = savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
      dispatch(deleteSavedMovie(movieToDelete._id));
    }
  }

  function handleMovieLike() {
    if (isLiked === false) {
      setIsLiked(true);
      dispatch(postSavedMovie(movie));
    }
    if (isLiked === true) {
      handleCardUnlike(movie);
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
              handleCardUnlike(movie);
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
          alt='movie preview'
        />
      </a>
    </li>
  );
}

export default MoviesCard;
