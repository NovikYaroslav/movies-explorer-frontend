import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../form';
import Input from '../input';
import useFormWithValidation from '../../utils/formValidator';
import logo from '../../images/logo.svg';
import { registrateAndAuthorize } from '../../store/api-actions';
import {
  authorizationSelector,
  waitingSeletor,
  clearMessageState,
  setMessageState,
  setWaitingState,
} from '../../store/reducers/authorization';

export default function Register() {
  const dispatch = useDispatch();
  const formValidator = useFormWithValidation();
  const navigate = useNavigate();
  const authorized = useSelector(authorizationSelector);
  const waitingForResponse = useSelector(waitingSeletor);

  useEffect(() => {
    formValidator.resetForm();
    return () => {
      formValidator.resetForm();
    };
  }, []);

  useEffect(() => {
    dispatch(clearMessageState());
  }, [dispatch]);

  useEffect(() => {
    if (authorized) {
      navigate('/movies', { replace: true });
    }
  }, [authorized, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setWaitingState());
    if (!formValidator.isValid) {
      dispatch(setMessageState('Please, enter valid data!'));
      return;
    }
    dispatch(
      registrateAndAuthorize({
        name: formValidator.values['Name'],
        email: formValidator.values['Email'],
        password: formValidator.values['Password'],
      }),
    );
  }

  return (
    <section className='entry'>
      <div className='entry__container'>
        <Link className='header__logo' to='/'>
          <img src={logo} alt='logo' />
        </Link>
        <h2 className='entry__title'>Welcome!</h2>
        <Form
          name='email'
          onSubmit={handleSubmit}
          isValid={formValidator.isValid}
          buttonText='Register'
          registration={true}
          disabled={waitingForResponse}>
          <Input
            minLength={'2'}
            maxLength={'50'}
            type={'name'}
            name={'Name'}
            placeholder={'Name'}
            formValidator={formValidator}
          />
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
          Already registered?
          <button
            onClick={() => {
              navigate('/signin', { replace: true });
            }}
            className='entry__login-button'>
            Login
          </button>
        </p>
      </div>
    </section>
  );
}
