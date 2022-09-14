import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';
import Input from '@/components/Input';

const LoginPage: NextPage = () => {
  return (
    <>
      <Header>
        <Link href='/'>
          <Title>HAUS</Title>
        </Link>
        <Link href='/login'>
          <p>login</p>
        </Link>
      </Header>
      <Form>
        <IdInput
          label='아이디'
          type='password'
          errorMessage='올바른 아이디 형식으로 입력해주세요'
        />
        <PasswordInput
          label='비밀번호'
          type='password'
          errorMessage='올바른 비밀번호 형식으로 입력해주세요'
        />
        <LoginButton disabled>로그인</LoginButton>
      </Form>
    </>
  );
};

export default LoginPage;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.a`
  font-size: 48px;
`;

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
