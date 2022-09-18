import { signIn } from '@/api/auth';
import { TOKEN_NAME } from '@/constants';
import { userState } from '@/states/user';
import { useSetRecoilState } from 'recoil';

const useUser = () => {
  const setUserState = useSetRecoilState(userState);

  const login = async (id: string, password: string) => {
    const { data } = await signIn({ id, password });
    const { accessToken, user } = data.data;

    sessionStorage.setItem(TOKEN_NAME, JSON.stringify(accessToken));
    setUserState({ id: user.ID, name: user.NAME });
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_NAME);
    setUserState(null);
  };

  return { login, logout };
};

export default useUser;
