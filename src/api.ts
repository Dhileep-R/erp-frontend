import axios from 'axios';

export const api = axios.create();

export const setToken = (token: string): void => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};
