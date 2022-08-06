import { axios } from '@/lib/axios';

type LogoutReturnType = {
  success: boolean;
  data: any;
};

export const logout = async (): Promise<LogoutReturnType> => {
  return await axios.post('/auth/logout');
};
