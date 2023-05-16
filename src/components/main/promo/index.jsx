import landingLogo from '../../../images/landing-logo.svg';
import './index.css';

function Promo() {
  return (
    <div className='promo'>
      <div className='promo__main'>
        <div className='promo__text-block'>
          <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
          <p className='promo__text'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
        <img className='promo__logo' src={landingLogo} alt='Логотип' />
      </div>
      <a href='#about-project'>
        <button className='promo__button'>Узнать больше</button>
      </a>
    </div>
  );
}

export default Promo;
