import { Input } from '@/components';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { testIdValidation, testPasswordValidation, errorMessage } from '@/utilities/formValidate';

type ValuesType = { [key: string]: string };
const DEFAULT_VALUE: ValuesType = { id: '', password: '' };

const LoginForm = ({ ...props }) => {
  const [values, setValues] = useState(DEFAULT_VALUE);
  const [errorsState, setErrorsState] = useState(DEFAULT_VALUE);
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

  return (
    <Form {...props}>
      <IdInput
        name='id'
        label='아이디'
        type='text'
        value={values.id}
        errorMessage={errorsState?.id}
        onChange={handleChange}
        onBlur={handleFocusEvent}
      />
      <PasswordInput
        name='password'
        label='비밀번호'
        type='password'
        value={values.password}
        errorMessage={errorsState?.password}
        onChange={handleChange}
        onBlur={handleFocusEvent}
      />
      <LoginButton disabled={!checkLoginActive()}>로그인</LoginButton>
    </Form>
  );
};

export default LoginForm;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding: 0 20px 40px;
`;

const IdInput = styled(Input)`
  margin-bottom: 16px;
`;

const PasswordInput = styled(Input)``;

const LoginButton = styled.button`
  margin-top: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: #222;
  color: #fff;

  &:disabled {
    background-color: #e2e2ea;
  }
`;
