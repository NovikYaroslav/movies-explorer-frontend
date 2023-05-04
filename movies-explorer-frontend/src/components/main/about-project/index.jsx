import './index.css';

function AboutProject() {
  return (
    <div className='about-project' id='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__text-block'>
        <div>
          <h3 className='about-project__text-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>
            Составление плана, работу над бэкэндом, вёрстку, добавление функциональности и финальная
            доработка
          </p>
        </div>
        <div>
          <h3 className='about-project__text-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__schedule'>
        <li className='about-project__schedule-element'>1 неделя</li>
        <li className='about-project__schedule-element'>4 недели</li>
        <li className='about-project__schedule-element'>Back-end</li>
        <li className='about-project__schedule-element'>Front-end</li>
      </div>
    </div>
  );
}

export default AboutProject;
