import './index.css';

function MoviesCard({ title, duration, preview, active, currentLocation }) {
  function formatTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const paddedHours = hours > 0 ? `${hours}ч ` : '';
    const paddedMinutes = minutes.toString().padStart(2, '0') + 'м';
    return `${paddedHours}${paddedMinutes}`;
  }

  return (
    <li className='card'>
      <div className='card__header'>
        <div className='card__header-text'>
          <h3 className='card__title'>{title}</h3>
          <p className='card__duration'>{formatTime(duration)}</p>
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
    </li>
  );
}

export default MoviesCard;
