import { useState, useCallback } from 'react';

const handleCustomError = (value, name) => {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const nameRegex = /^[A-Za-zА-Яа-яЁё\\s-]*$/;
  if (name === 'Email') {
    if (!emailRegex.test(value)) {
      return 'Email must be valid, e.g. "example@example.com"';
    }
  }
  if (name === 'Name') {
    if (!nameRegex.test(value)) {
      return 'The field must contain only Latin, Cyrillic, space or hyphen';
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
    const error = customError || target.validationMessage;
    const isFormValid = target.closest('form').checkValidity();
    setValues({ ...values, [name]: value });
    setIsValid(isFormValid && !error);
    setErrors({ ...errors, [name]: error });
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
