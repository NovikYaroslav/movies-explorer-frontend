import { Link, useNavigate } from 'react-router-dom';
import Form from '../form';
import Input from '../input';
import useFormWithValidation from '../../utils/formValidator';
import logo from '../../images/logo.svg';

export default function Login({ onLogin, serverError }) {
  const formValidator = useFormWithValidation();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(formValidator.values['Email'], formValidator.values['Password']);
    formValidator.resetForm();
  }

  return (
    <section className='entry'>
      <div className='entry__container'>
        <Link className='entry__logo' to='/'>
          <img src={logo} alt='логотип' />
        </Link>
        <h2 className='entry__title'>Рады видеть!</h2>
        <Form
          name='email'
          onSubmit={handleSubmit}
          isValid={formValidator.isValid}
          buttonText='Войти'
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
            placeholder={'Пароль'}
            formValidator={formValidator}
          />
        </Form>
        <p className='entry__question'>
          Ещё не зарегистрированы?
          <button
            onClick={() => {
              navigate('/signup', { replace: true });
            }}
            className='entry__login-button'>
            Регистрация
          </button>
        </p>
      </div>
    </section>
  );
}
