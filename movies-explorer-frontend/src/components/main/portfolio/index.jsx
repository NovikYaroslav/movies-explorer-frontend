import arrow from '../../../images/link-arrow.svg';
import './index.css';

function Portfolio() {
  return (
    <div className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__links'>
        <li className='portfolio__link'>
          Статичный сайт
          <img src={arrow} alt='' />
        </li>
        <li className='portfolio__link'>
          Адаптивный сайт
          <img src={arrow} alt='' />
        </li>
        <li className='portfolio__link'>
          Одностраничное приложение
          <img src={arrow} alt='' />
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
