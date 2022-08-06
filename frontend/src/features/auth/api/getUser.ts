import { User } from '@/features/users/types';
import { axios } from '@/lib/axios';

export const getUser = async (token: string | undefined): Promise<User | undefined> => {
  if (!token) return undefined;
  return (await axios.get('/auth/me')).data;
};
