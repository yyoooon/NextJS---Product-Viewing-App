import { Input } from '@/components';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';

type ErrorsType = { [key: string]: string } | null;

const LoginForm = () => {
  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<ErrorsType>(null);

  const handleBlur = (e: any) => {
    const { name } = e.target;
    // 유효하지 않은 경우 - 입력 값이 없을 떄 || 검사 리턴 값이 false일 떄
    // setErrors({ ...errors, [name]: `유효하지 않은 ${name}입니다.` });

    // 유효한 경우 - 입력 값이 있으면서 && 검사 리턴 값이 true일 때
    setErrors({});
  };

  const handleSubmit = () => {
    // 로그인 api 실행
    // 성공 시
    // 1. 받아온 값 전역으로 저장
    // 2. home으로 이동
    // 실패 시
    // 1. 경고창 띄우기
  };

  const checkCanLogin = (errors: ErrorsType) => {
    return errors && !Object.keys(errors).length ? true : false;
  };

  return (
    <Form>
      <IdInput
        ref={idInputRef}
        name='id'
        label='아이디'
        type='text'
        errorMessage={errors?.id}
        onBlur={handleBlur}
      />
      <PasswordInput
        ref={passwordInputRef}
        name='password'
        label='비밀번호'
        type='password'
        errorMessage={errors?.password}
        onBlur={handleBlur}
      />
      <LoginButton disabled={!checkCanLogin(errors)}>로그인</LoginButton>
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
