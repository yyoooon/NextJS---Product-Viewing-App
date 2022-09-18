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
    userInfo && setIsLogin(true);
  }, [userInfo]);

  return (
    <StyledHeader>
      <Link href='/'>
        <Title>HAUS</Title>
      </Link>

      <div>
        {isLogin ? (
          <>
            <strong>{userInfo?.name}</strong>
            <span
              onClick={() => {
                logout();
              }}
            >
              logout
            </span>
          </>
        ) : (
          <Link href='/login'>
            <span>login</span>
          </Link>
        )}
      </div>
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
`;
