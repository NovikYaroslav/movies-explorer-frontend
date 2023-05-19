import { useEffect, useContext } from 'react';
import './index.css';
import useFormWithValidation from '../../utils/formValidator';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile({ onLogout, onProfileSubmit, message }) {
  const currentUser = useContext(CurrentUserContext);
  const formValidator = useFormWithValidation();

  function checkDataIsSame() {
    const sameName = formValidator.values['Name'] === currentUser.name;
    const sameEmail = formValidator.values['Email'] === currentUser.email;
    if (sameName && sameEmail) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onProfileSubmit({
      name: formValidator.values['Name'],
      email: formValidator.values['Email'],
    });
  }

  useEffect(() => {
    formValidator.resetForm({ Name: currentUser.name, Email: currentUser.email }, {}, true);
  }, [currentUser]);

  return (
    <div className='profile'>
      <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
      <h2 className='profile__message'>{message}</h2>
      <form className='profile__data-container' name='profile' onSubmit={handleSubmit} noValidate>
        <div className='profile__data'>
          <p className='profile__data-text'>Имя</p>
          <input
            className='profile__input'
            onChange={formValidator.handleChange}
            value={formValidator.values['Name'] || ''}
            minLength='2'
            maxLength='50'
            type='name'
            name='Name'
            required
          />
        </div>
        <span className='profile__input-error '>{formValidator.errors['Name']}</span>
        <div className='profile__data'>
          <p className='profile__data-text'>E-mail</p>
          <input
            className='profile__input'
            minLength={'2'}
            maxLength={'50'}
            type={'email'}
            name={'Email'}
            value={formValidator.values['Email'] || ''}
            onChange={formValidator.handleChange}
          />
        </div>
        <span className='profile__input-error '>{formValidator.errors['Email']}</span>

        <div className='profile__menu'>
          <button
            type='submit'
            disabled={!formValidator.isValid === !checkDataIsSame()}
            className={`profile__button ${
              !formValidator.isValid === !checkDataIsSame() ? 'profile__button_inactive' : ''
            }`}>
            Редактировать
          </button>
          <button onClick={() => onLogout()} className='profile__button profile__button_logout'>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
