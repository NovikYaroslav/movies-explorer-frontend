import './index.css';

function AboutProject() {
  return (
    <div className='about-project' id='about-project'>
      <h2 className='about-project__title'>About the project</h2>
      <div className='about-project__text-block'>
        <div>
          <h3 className='about-project__text-title'>The diploma project included 5 stages</h3>
          <p className='about-project__text'>
            Drawing up a plan, backend development, layout, adding functionality and final
            improvment
          </p>
        </div>
        <div>
          <h3 className='about-project__text-title'>It took 5 weeks to fulfill the diploma</h3>
          <p className='about-project__text'>
            Each stage had a soft and hard deadline that had to be observed to successfully protect
            project.
          </p>
        </div>
      </div>
      <div className='about-project__schedule'>
        <li className='about-project__schedule-element'>1 week</li>
        <li className='about-project__schedule-element'>4 weeks</li>
        <li className='about-project__schedule-element'>Back-end</li>
        <li className='about-project__schedule-element'>Front-end</li>
      </div>
    </div>
  );
}

export default AboutProject;
