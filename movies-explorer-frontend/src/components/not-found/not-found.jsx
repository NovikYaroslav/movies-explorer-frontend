import './index.css';

function NotFound() {
  return (
    <div className='not-found'>
      <p className='not-found__title'>404</p>
      <p className='not-found__subtitle'>Страница не найдена</p>
      <button className='not-found__button'>Назад</button>
    </div>
  );
}

export default NotFound;
