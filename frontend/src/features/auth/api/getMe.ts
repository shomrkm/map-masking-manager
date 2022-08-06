import { axios } from '@/lib/axios';

export const getMe = () => {
  return axios.get('/auth/me');
};
