import React, { useRef, useState } from 'react';
import { testIdValidation, testPasswordValidation, errorMessage } from '@/utilities/formValidate';

type ValuesType = { [key: string]: string };
type UseLoginFormArgType = {
  defaultValue: ValuesType;
};

const useLoginForm = ({ defaultValue }: UseLoginFormArgType) => {
  const [values, setValues] = useState(defaultValue);
  const [errorsState, setErrorsState] = useState(defaultValue);
  const errorsRef = useRef<ValuesType>({});
  const errors = errorsRef.current;

  const putMessageInErrors = (key: string, message: string) => {
    errors[key] = message;
  };

  const removeMessageInErrors = (key: string) => {
    delete errors[key];
  };

  const renderErrorMessageToInput = (inputName: string, message: string) => {
    setErrorsState({ ...errorsState, [inputName]: message });
  };

  const removeErrorMessageToInput = (inputName: string) => {
    setErrorsState({ ...errorsState, [inputName]: '' });
  };

  const validate = ({
    name,
    value,
    validationTester,
  }: {
    name: string;
    value: string;
    validationTester: (value: string) => boolean;
  }) => {
    if (value && !validationTester(value)) {
      putMessageInErrors(name, errorMessage[name]);
      return;
    }
    removeMessageInErrors(name);
    removeErrorMessageToInput(name);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const trimedValue = value.trim();

    setValues({ ...values, [name]: trimedValue });

    if (name === 'id') {
      validate({
        name,
        value,
        validationTester: testIdValidation,
      });
    }

    if (name === 'password') {
      validate({
        name,
        value,
        validationTester: testPasswordValidation,
      });
    }
  };

  const handleFocusEvent = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    renderErrorMessageToInput(name, errors[name]);
  };

  const checkHaveAllInputValues = (values: ValuesType) => {
    for (const key in values) {
      if (!values[key]) {
        return false;
      }
    }
    return true;
  };

  const checkValidationAllInputValues = (errors: ValuesType) => {
    return Object.keys(errors).length ? false : true;
  };

  const checkLoginActive = () => {
    if (!checkHaveAllInputValues(values)) {
      return false;
    }
    if (!checkValidationAllInputValues(errors)) {
      return false;
    }

    return true;
  };

  return { values, errorsState, handleChange, handleFocusEvent, checkLoginActive };
};

export default useLoginForm;
