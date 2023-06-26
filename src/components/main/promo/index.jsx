import landingLogo from '../../../images/landing-logo.svg';
import './index.css';

function Promo() {
  return (
    <div className='promo'>
      <div className='promo__main'>
        <div className='promo__text-block'>
          <h1 className='promo__title'>
            Diploma project of the Yandex Web Development faculty student.
          </h1>
          <p className='promo__text'>
            Listen below to find out more about this project and its creator.
          </p>
        </div>
        <img className='promo__logo' src={landingLogo} alt='Логотип' />
      </div>
      <a className='promo__link' href='#about-project'>
        <button className='promo__button'>To learn more</button>
      </a>
    </div>
  );
}

export default Promo;
