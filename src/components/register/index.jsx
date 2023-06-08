import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from '../form';
import Input from '../input';
import useFormWithValidation from '../../utils/formValidator';
import logo from '../../images/logo.svg';
import { registrateAndAuthorize } from '../../store/api-actions';

export default function Register({ serverError }) {
  const dispatch = useDispatch();
  const formValidator = useFormWithValidation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(serverError);

  function handleSubmit(e) {
    e.preventDefault();
    if (!formValidator.isValid) {
      setMessage('Пожалуйста, укажите корректные данные!');
      return;
    }
    dispatch(
      registrateAndAuthorize({
        name: formValidator.values['Name'],
        email: formValidator.values['Email'],
        password: formValidator.values['Password'],
      }),
    );
    formValidator.resetForm();
    navigate('/movies', { replace: true });
  }

  return (
    <section className='entry'>
      <div className='entry__container'>
        <Link className='header__logo' to='/'>
          <img src={logo} alt='логотип' />
        </Link>
        <h2 className='entry__title'>Welcome!</h2>
        <Form
          name='email'
          onSubmit={handleSubmit}
          isValid={formValidator.isValid}
          buttonText='Register'
          registration={true}
          message={message}>
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
