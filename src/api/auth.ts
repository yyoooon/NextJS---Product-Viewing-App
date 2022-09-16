import { request } from './request';

interface UserLoginInfo {
  [key: string]: string;
}

export const signIn = async ({ id, password }: UserLoginInfo) => {
  const response = await request.post('/login', {
    id,
    password,
  });

  return response;
};
