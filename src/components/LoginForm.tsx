import { Input } from '@/components';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { vaildateId, vaildatePassword } from '@/utilities/formValidate';

type ErrorsType = { [key: string]: string } | null;

const LoginForm = () => {
  const [values, setValues] = useState({ id: '', password: '' });
  const [errors, setErrors] = useState<ErrorsType>({ id: '', password: '' });

  const handleBlur = (e: any) => {};
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value.trim() });
  };

  return (
    <Form>
      <IdInput
        name='id'
        label='아이디'
        type='text'
        value={values.id}
        errorMessage={errors?.id}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <PasswordInput
        name='password'
        label='비밀번호'
        type='password'
        value={values.password}
        errorMessage={errors?.password}
        onChange={handleChange}
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
