import { request } from './request';

export const getProducts = async (page: number, size: number) => {
  const response = await request.get(`/products`, {
    params: { page, size },
  });

  return response;
};

export const getProduct = async (id: string | string[]) => {
  const response = await request.get(`/products/${id}`);

  return response;
};
