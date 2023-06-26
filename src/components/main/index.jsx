import AboutMe from './about-me';
import AboutProject from './about-project';
import Promo from './promo';
import Techs from './techs';

function Main() {
  return (
    <section className='introduction'>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </section>
  );
}

export default Main;
