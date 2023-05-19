import { useState, useCallback } from 'react';

const handleCustomError = (value, name) => {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const nameRegex = /^[A-Za-zА-Яа-яЁё\\s-]*$/;
  if (name === 'Email') {
    if (!emailRegex.test(value)) {
      return 'Email должен быть корретным, например "example@example.com"';
    }
  }
  if (name === 'Name') {
    if (!nameRegex.test(value)) {
      return 'Поле должно содержать только латиницу, кириллицу, пробел или дефис';
    }
  }
  return null;
};

export default function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const customError = handleCustomError(value, name);
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: customError || target.validationMessage });
    setIsValid(
      Object.values({ ...errors, [name]: customError || target.validationMessage }).every(
        (error) => !error,
      ),
    );
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return { values, handleChange, errors, isValid, resetForm };
}
