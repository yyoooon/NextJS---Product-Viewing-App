import Input from './Input';
import styled from '@emotion/styled';
import React from 'react';
import useLoginForm from './useLoginForm';

const DEFAULT_VALUE = { id: '', password: '' };

const LoginForm = ({ ...props }) => {
  const { values, errorsState, handleChange, handleFocusEvent, checkLoginActive, handleSubmit } =
    useLoginForm({
      defaultValue: DEFAULT_VALUE,
    });

  return (
    <Form {...props} onSubmit={handleSubmit}>
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
        autoComplete='on'
      />
      <LoginButton disabled={!checkLoginActive()}>로그인</LoginButton>
    </Form>
  );
};

export default LoginForm;

const Form = styled.form`
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
