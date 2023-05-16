import { useNavigate } from 'react-router-dom';
import './index.css';

function NotFound() {
  const navigate = useNavigate();
  function handleBackButtonClick() {
    navigate(-1);
  }
  return (
    <div className='not-found'>
      <p className='not-found__title'>404</p>
      <p className='not-found__subtitle'>Страница не найдена</p>
      <button onClick={handleBackButtonClick} className='not-found__button'>
        Назад
      </button>
    </div>
  );
}

export default NotFound;
