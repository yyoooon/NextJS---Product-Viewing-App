import { request } from './request';

export const getProducts = async (page: number, size: number) => {
  const response = await request.get(`/products?page=${page}&size=${size}`);

  return response;
};
