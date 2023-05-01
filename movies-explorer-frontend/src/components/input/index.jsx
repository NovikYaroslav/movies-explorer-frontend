function Input({ minLength, maxLength, type, name, placeholder, Ref, formValidator }) {
  return (
    <>
      <p className='forms-fieldset__input-title'>{placeholder}</p>
      <input
        className={`forms-fieldset__input register-fieldset__input_value_name ${
          formValidator.errors[name] ? 'forms-fieldset__input_status_invalid' : ''
        }`}
        required
        minLength={minLength}
        maxLength={maxLength}
        type={type}
        name={name}
        value={formValidator.values[name] || ''}
        onChange={formValidator.handleChange}
        ref={Ref}
      />
      <span className='forms-fieldset__error'>{formValidator.errors[name]}</span>
    </>
  );
}

export default Input;
