import './index.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__title'>Educational project Yandex.Practicum х BeatFilm.</p>
      <div className='footer__wrapper'>
        <p className='footer__date'>&#169; 2022</p>
        <div className='footer__links'>
          <a
            href='https://practicum.yandex.ru'
            target='_blank'
            rel='noreferrer'
            className='footer__link'>
            Yandex.Practicum
          </a>
          <a
            href='https://github.com/NovikYaroslav'
            target='_blank'
            rel='noreferrer'
            className='footer__link'>
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
