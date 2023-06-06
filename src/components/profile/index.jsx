import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import useFormWithValidation from '../../utils/formValidator';
import { userDataSelector } from '../../store/reducers/authorization';
import { postUserData } from '../../store/api-actions';

function Profile({ onLogout, message }) {
  const dispatch = useDispatch();
  const userData = useSelector(userDataSelector);
  const formValidator = useFormWithValidation();

  function checkDataIsSame() {
    const sameName = formValidator.values['Name'] === userData.name;
    const sameEmail = formValidator.values['Email'] === userData.email;
    if (sameName && sameEmail) {
      return true;
    } else {
      return false;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      postUserData({
        name: formValidator.values['Name'],
        email: formValidator.values['Email'],
      }),
    );
  }

  useEffect(() => {
    console.log(userData);
    formValidator.resetForm({ Name: userData.name, Email: userData.email }, {}, true);
  }, [userData.name, userData.email]);

  return (
    <div className='profile'>
      <h1 className='profile__title'>{`Hi, ${userData.name}!`}</h1>
      <h2 className='profile__message'>{message}</h2>
      <form className='profile__data-container' name='profile' onSubmit={handleSubmit} noValidate>
        <div className='profile__data'>
          <p className='profile__data-text'>Name</p>
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
            Edit
          </button>
          <button onClick={() => onLogout()} className='profile__button profile__button_logout'>
            Leave the account
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
