import me from '../../../images/me.jpg';
import Portfolio from '../portfolio';
import './index.css';

function AboutMe() {
  return (
    <div className='about-me'>
      <h2 className='about-me__title'>Student</h2>
      <div className='about-me__main'>
        <div className='about-me__text-block'>
          <h2 className='about-me__text-title'>Yaroslav</h2>
          <h3 className='about-me__text-subtitle'>Frontend-developer, 33 years old</h3>
          <p className='about-me__text'>
            I was born in St-Peterburg, Russia, graduated from the Russian customs academy. Worked
            in many international companies.My last position was as a manager at Electrolux. For the
            last years, I have been doing front-end development and I am going to develop myself in
            this direction.
          </p>
          <a
            className='about-me__link'
            href='https://github.com/NovikYaroslav'
            target='_blank'
            rel='noreferrer'>
            Github
          </a>
        </div>
        <img className='about-me__photo' src={me} alt='Student photo'/>
      </div>
      <Portfolio />
    </div>
  );
}

export default AboutMe;
