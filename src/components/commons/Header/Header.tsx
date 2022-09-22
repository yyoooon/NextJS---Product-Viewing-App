import styled from '@emotion/styled';
import Link from 'next/link';

import { userState } from '@/states/user';
import { useRecoilValue } from 'recoil';
import { useUser } from '@/hooks';
import { useEffect, useState } from 'react';

const Header = () => {
  const userInfo = useRecoilValue(userState);
  const { logout } = useUser();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setIsLogin(true);
      return;
    }
    setIsLogin(false);
  }, [userInfo]);

  const handleClickLogout = () => {
    if (confirm('로그아웃 하시겠습니까?') == true) {
      logout();
    } else {
      return;
    }
  };

  return (
    <StyledHeader>
      <Link href='/'>
        <Title>HAUS</Title>
      </Link>

      {isLogin ? (
        <InfoBox>
          <strong>{userInfo?.name}</strong>
          <span onClick={handleClickLogout}>logout</span>
        </InfoBox>
      ) : (
        <InfoBox>
          <Link href='/login'>
            <span>login</span>
          </Link>
        </InfoBox>
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 48px;
  cursor: pointer;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  & span,
  & strong {
    cursor: pointer;
  }
`;
