import { axios } from '@/lib/axios';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

type LoginReturnType = {
  success: boolean;
  token: string;
};

export const loginWithEmailAndPassword = async (
  data: LoginCredentialsDTO
): Promise<LoginReturnType> => {
  return await axios.post('/auth/login', data);
};
