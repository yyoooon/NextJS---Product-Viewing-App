import { request } from './request';
import { UserLoginInfoType } from '@/types';

export const signIn = async ({ id, password }: UserLoginInfoType) => {
  const response = await request.post('/login', {
    id,
    password,
  });

  return response;
};
