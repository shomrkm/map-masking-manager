import { User } from '@/features/users/types';
import { axios } from '@/lib/axios';

export const getUser = async (): Promise<User | undefined> => {
  return (await axios.get('/auth/me')).data;
};
