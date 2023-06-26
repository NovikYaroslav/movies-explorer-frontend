import { authorizationMessageSelector } from '../../store/reducers/authorization';
import { useSelector } from 'react-redux';

function Form({ name, onSubmit, isValid, buttonText, children, registration }) {
  const error = useSelector(authorizationMessageSelector);

  return (
    <form className='forms' name={`user-${name}`} onSubmit={onSubmit} noValidate>
      <fieldset className='forms-fieldset'>{children}</fieldset>
      <p className='form__message'>{error}</p>
      <button
        className={`forms__save_entry ${
          registration ? 'forms__save_entry_location_registration' : ' '
        } ${!isValid ? 'forms__save_entry_status_inactive' : ''}`}
        type='submit'
        disabled={!isValid}>
        {buttonText}
      </button>
    </form>
  );
}

export default Form;
