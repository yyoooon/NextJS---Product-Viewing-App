import { request } from './request';
import { UserLoginInfo } from '@/types';

export const signIn = async ({ id, password }: UserLoginInfo) => {
  const response = await request.post('/login', {
    id,
    password,
  });

  return response;
};
