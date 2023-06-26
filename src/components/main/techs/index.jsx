import './index.css';

function Techs() {
  return (
    <div className='techs'>
      <h2 className='techs__title'>Technologies</h2>
      <div className='techs__text-block'>
        <h3 className='techs__text-title'>7 technologies</h3>
        <p className='techs__text'>
          In the course of web development, we have mastered the technologies that used in the
          diploma project.
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
        <li className='techs__list-element' style={{ color: '#3cdc84' }}>
          Redux(RTK)
        </li>
      </ul>
      <div className='techs__text-block'>
        <p className='techs__text' style={{ color: '#3cdc84' }}>
          * Additionally implemented, after graduated
        </p>
      </div>
    </div>
  );
}

export default Techs;
