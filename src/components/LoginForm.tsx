import { Input } from '@/components';
import styled from '@emotion/styled';
import React, { useRef, useState } from 'react';
import { vaildateId, vaildatePassword } from '@/utilities/formValidate';

type ValuesType = { [key: string]: string };

const DEFAULT_VALUE: ValuesType = { id: '', password: '' };
const INPUT_LENGTH = Object.keys(DEFAULT_VALUE).length;

const LoginForm = () => {
  const [values, setValues] = useState(DEFAULT_VALUE);
  const [errorsState, setErrorsState] = useState(DEFAULT_VALUE);
  const errorsRef = useRef<ValuesType>({});
  const errors = errorsRef.current;

  const handleFocusEvent = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setErrorsState({ ...errorsState, [name]: errors[name] });
  };

  const idValidate = (id: string) => {
    if (!vaildateId(id)) {
      errors.id = '올바른 아이디 형식으로 입력해주세요.';
      return;
    }
    errors.id = '';
    setErrorsState({ ...errorsState, id: '' });
  };

  const passwordValidate = (password: string) => {
    if (!vaildatePassword(password)) {
      errors.password = '올바른 비밀번호 형식으로 입력해주세요.';
      return;
    }
    errors.password = '';
    setErrorsState({ ...errorsState, password: '' });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const trimedValue = value.trim();
    setValues({ ...values, [name]: trimedValue });

    if (name === 'id') {
      idValidate(trimedValue);
    }

    if (name === 'password') {
      passwordValidate(trimedValue);
    }
  };

  const checkLoginActive = () => {
    const errorsLength = Object.keys(errors).length;

    // 입력이 전부 안됐을 때
    if (errorsLength < INPUT_LENGTH) {
      return false;
    }

    // 입력이 됐지만 유효할 때
    for (const key in errors) {
      if (errors[key]) {
        return false;
      }
    }

    return true;
  };

  return (
    <Form>
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
      <LoginButton disabled={checkLoginActive() ? false : true}>로그인</LoginButton>
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
