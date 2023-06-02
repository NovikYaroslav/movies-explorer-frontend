import arrow from '../../../images/link-arrow.svg';
import './index.css';

function Portfolio() {
  return (
    <div className='portfolio'>
      <h2 className='portfolio__title'>Portfolio</h2>
      <ul className='portfolio__links'>
        <li className='portfolio__links-element'>
          <a
            className='portfolio__link'
            href='https://novikyaroslav.github.io/how-to-learn/'
            target='_blank'
            rel='noreferrer'>
            Statical site
            <img className='portfolio__link-arrow' src={arrow} alt='' />
          </a>
        </li>
        <li className='portfolio__links-element'>
          <a
            className='portfolio__link'
            href='https://novikyaroslav.github.io/russian-travel/'
            target='_blank'
            rel='noreferrer'>
            Adaptive site
            <img className='portfolio__link-arrow' src={arrow} alt='' />
          </a>
        </li>
        <li className='portfolio__links-element'>
          <a
            className='portfolio__link'
            href='https://mesto.novik.nomoredomains.work/'
            target='_blank'
            rel='noreferrer'>
            One-page application
            <img className='portfolio__link-arrow' src={arrow} alt='' />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
