import Form from '../form';
import Input from '../input';
import useFormWithValidation from '../../utils/formValidator';
import logo from '../../images/logo.svg';

export default function Register({ onAuthoriz }) {
  const formValidator = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onAuthoriz(formValidator.values['Email'], formValidator.values['Password']);
    formValidator.resetForm();
  }

  return (
    <section className='entry'>
      <div className='entry__container'>
        <img src={logo} alt='логотип' />
        <h2 className='entry__title'>Добро пожаловать!</h2>
        <Form
          name='email'
          onSubmit={handleSubmit}
          isValid={formValidator.isValid}
          buttonText='Зарегистрироваться'
          registration={true}>
          <Input
            minLength={'2'}
            maxLength={'50'}
            type={'name'}
            name={'Name'}
            placeholder={'Имя'}
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
            placeholder={'Пароль'}
            formValidator={formValidator}
          />
        </Form>
        <p className='entry__question'>
          Уже зарегистрированы?
          <button className='entry__login-button'>Войти</button>
        </p>
      </div>
    </section>
  );
}
