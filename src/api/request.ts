import axios, { AxiosInstance } from 'axios';

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
      const TOKEN = localStorage.getItem('authorization');
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
