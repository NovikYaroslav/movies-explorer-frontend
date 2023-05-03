import './index.css';

function MoviesCard({ title, duration, preview, active, currentLocation }) {
  return (
    <div className='card'>
      <div className='card__header'>
        <div className='card__header-text'>
          <h3 className='card__title'>{title}</h3>
          <p className='card__duration'>{duration}</p>
        </div>
        <button
          className={`card__button ${
            currentLocation === '/saved-movies'
              ? 'card__button_delete'
              : active
              ? 'card__button_active'
              : ''
          }`}></button>
      </div>
      <img className='card__preview' src={preview} alt='превью фильма' />
    </div>
  );
}

export default MoviesCard;
