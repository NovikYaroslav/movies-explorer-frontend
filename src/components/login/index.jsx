import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../form';
import Input from '../input';
import logo from '../../images/logo.svg';
import { authorizate } from '../../store/api-actions';
import { authorizationSelector } from '../../store/reducers/authorization';
import useFormWithValidation from '../../utils/formValidator';

export default function Login({ serverError }) {
  const dispatch = useDispatch();
  const formValidator = useFormWithValidation();
  const navigate = useNavigate();
  const authorized = useSelector(authorizationSelector);

  useEffect(() => {
    if (authorized) {
      navigate('/movies', { replace: true });
    }
  }, [authorized, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      authorizate({
        email: formValidator.values['Email'],
        password: formValidator.values['Password'],
      }),
    );
    formValidator.resetForm();
  }

  return (
    <section className='entry'>
      <div className='entry__container'>
        <Link className='entry__logo' to='/'>
          <img src={logo} alt='логотип' />
        </Link>
        <h2 className='entry__title'>Glad to see you!</h2>
        <Form
          name='email'
          onSubmit={handleSubmit}
          isValid={formValidator.isValid}
          buttonText='Login'
          registration={false}
          message={serverError}>
          <Input
            minLength={'2'}
            maxLength={'50'}
            type={'email'}
            name={'Email'}
            placeholder={'Email'}
            formValidator={formValidator}
          />
          <Input
            minLength={'2'}
            maxLength={'200'}
            type={'password'}
            name={'Password'}
            placeholder={'Password'}
            formValidator={formValidator}
          />
        </Form>
        <p className='entry__question'>
          Not yet registered?
          <button
            onClick={() => {
              navigate('/signup', { replace: true });
            }}
            className='entry__login-button'>
            Registration
          </button>
        </p>
      </div>
    </section>
  );
}
