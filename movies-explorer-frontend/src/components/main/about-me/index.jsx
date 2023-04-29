import photo from '../../../images/photo.png';
import Portfolio from '../portfolio';
import './index.css';

function AboutMe() {
  return (
    <div className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__main'>
        <div className='about-me__text-block'>
          <h2 className='about-me__text-title'>Ярослав</h2>
          <h3 className='about-me__text-subtitle'>Фронтенд-разработчик, 33 года</h3>
          <p className='about-me__text'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className='about-me__link'
            href='https://github.com/NovikYaroslav'
            target='_blank'
            rel='noreferrer'>
            Github
          </a>
        </div>
        <img className='about-me__photo' src={photo} alt='Фото студента' />
      </div>
      <Portfolio />
    </div>
  );
}

export default AboutMe;
