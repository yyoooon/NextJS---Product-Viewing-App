import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks';
import { testIdValidation, testPasswordValidation, errorMessage } from '@/utilities/formValidate';

type ValuesType = { [key: string]: string };
type UseLoginFormArgType = {
  defaultValue: ValuesType;
};

const useLoginForm = ({ defaultValue }: UseLoginFormArgType) => {
  const router = useRouter();
  const { login } = useUser();

  const [values, setValues] = useState(defaultValue);
  const [errorsState, setErrorsState] = useState(defaultValue);

  const errorsRef = useRef<ValuesType>({});
  const errors = errorsRef.current;

  const saveMessageInErrorsRef = (key: string, message: string) => {
    errors[key] = message;
  };

  const removeMessageInErrorsRef = (key: string) => {
    delete errors[key];
  };

  const renderErrorMessageToInput = (inputName: string, message: string) => {
    setErrorsState({ ...errorsState, [inputName]: message });
  };

  const removeErrorMessageToInput = (inputName: string) => {
    setErrorsState({ ...errorsState, [inputName]: '' });
  };

  type Validate = {
    name: string;
    value: string;
    validationTester: (value: string) => boolean;
  };

  // 유효성 검사 후 에러 메세지 저장/렌더링
  const validate = ({ name, value, validationTester }: Validate) => {
    if (value && !validationTester(value)) {
      saveMessageInErrorsRef(name, errorMessage[name]);
      return;
    }
    removeMessageInErrorsRef(name);
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

  const handleFocusOut = (event: React.FocusEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { id, password } = values;
    try {
      await login(id, password);
      alert('로그인이 완료되었습니다!');
      router.push('/');
    } catch (error: any) {
      alert(error.message);
    }
  };

  return { values, errorsState, handleChange, handleFocusOut, handleSubmit, checkLoginActive };
};

export default useLoginForm;
