import Link from 'next/link';
import type { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';
import { LoginForm } from '@/components';

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
      <LoginForm />
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
