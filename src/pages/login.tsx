import type { NextPage } from 'next';
import React, { useEffect } from 'react';
import { LoginForm } from '@/components';
import { userState } from '@/states/user';
import { useRecoilValue } from 'recoil';
import router from 'next/router';

const LoginPage: NextPage = () => {
  const userInfo = useRecoilValue(userState);
  const isLoggedIn = userInfo;

  useEffect(() => {
    if (isLoggedIn) {
      alert('이미 로그인 되었습니다! 홈으로 이동합니다');
      router.push(`/`, undefined, { shallow: true });
    }
  }, []);

  return <LoginForm />;
};

export default LoginPage;
