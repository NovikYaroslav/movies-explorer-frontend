import './index.css';

function Techs() {
  return (
    <div className='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <div className='techs__text-block'>
        <div className='techs__text-block-element'>
          <h3 className='techs__text-title'>7 технологий</h3>
          <p className='techs__text'>
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
        </div>
        <ul className='techs__list'>
          <li className='techs__list-element'>HTML</li>
          <li className='techs__list-element'>CSS</li>
          <li className='techs__list-element'>JS</li>
          <li className='techs__list-element'>React</li>
          <li className='techs__list-element'>Git</li>
          <li className='techs__list-element'>Express.js</li>
          <li className='techs__list-element'>mongoDB</li>
        </ul>
      </div>
    </div>
  );
}

export default Techs;
