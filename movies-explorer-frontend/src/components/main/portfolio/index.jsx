import arrow from '../../../images/link-arrow.svg';
import './index.css';

function Portfolio() {
  return (
    <div className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__links'>
        <a
          className='portfolio__link'
          href='https://novikyaroslav.github.io/how-to-learn/'
          target='_blank'
          rel='noreferrer'>
          Статичный сайт
          <img className='portfolio__link-arrow' src={arrow} alt='' />
        </a>
        <a
          className='portfolio__link'
          href='https://novikyaroslav.github.io/russian-travel/'
          target='_blank'
          rel='noreferrer'>
          Адаптивный сайт
          <img className='portfolio__link-arrow' src={arrow} alt='' />
        </a>
        <a
          className='portfolio__link'
          href='https://mesto.novik.nomoredomains.work/'
          target='_blank'
          rel='noreferrer'>
          Одностраничное приложение
          <img className='portfolio__link-arrow' src={arrow} alt='' />
        </a>
      </ul>
    </div>
  );
}

export default Portfolio;
