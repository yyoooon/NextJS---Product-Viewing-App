import { Input } from '@/components';
import styled from '@emotion/styled';
import { useRef } from 'react';

const LoginForm = () => {
  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    console.log(idInputRef.current?.value);
    console.log(passwordInputRef.current?.value);
  };

  return (
    <Form>
      <IdInput
        ref={idInputRef}
        label='아이디'
        type='text'
        errorMessage='올바른 아이디 형식으로 입력해주세요'
        onBlur={handleBlur}
      />
      <PasswordInput
        ref={passwordInputRef}
        label='비밀번호'
        type='password'
        errorMessage='올바른 비밀번호 형식으로 입력해주세요'
        onBlur={handleBlur}
      />
      <LoginButton disabled>로그인</LoginButton>
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
