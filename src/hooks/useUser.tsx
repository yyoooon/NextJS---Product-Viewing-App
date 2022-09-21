import { signIn } from '@/api/auth';
import { TOKEN_NAME } from '@/constants';
import { userState } from '@/states/user';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

const useUser = () => {
  const [userInfo, setUserInfo] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useState(userInfo ? true : false);

  const login = async (id: string, password: string) => {
    const { data } = await signIn({ id, password });
    const { accessToken, user } = data.data;
    sessionStorage.setItem(TOKEN_NAME, JSON.stringify(accessToken));
    setUserInfo({ id: user.ID, name: user.NAME });
    setIsLogin(true);
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_NAME);
    setUserInfo(null);
    setIsLogin(false);
  };

  return { isLogin, login, logout };
};

export default useUser;
