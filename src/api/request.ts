import axios, { AxiosInstance } from 'axios';
import { TOKEN_NAME } from '@/constants';

const convertErrorResponse = (error: any) => {
  return {
    status: error.response.status,
    message: error.response.data.message,
    data: error.response.data,
  };
};

const setInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const TOKEN = localStorage.getItem(TOKEN_NAME);
      if (!TOKEN) return config;
      config.headers = config.headers ? config.headers : {};
      config.headers.Authorization = `Bearer ${JSON.parse(TOKEN)}`;
      return config;
    },
    (error) => Promise.reject(convertErrorResponse(error))
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(convertErrorResponse(error))
  );
  return instance;
};

const createInstance = () => {
  const instance = axios.create({
    timeout: 15000,
  });
  return setInterceptors(instance);
};

export const request = createInstance();
