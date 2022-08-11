import { User } from '@/features/users';
import { axios } from '@/lib/axios';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export type LoginReturnType = {
  success: boolean;
  data: User;
  token: string;
};

export const loginWithEmailAndPassword = async (
  data: LoginCredentialsDTO
): Promise<LoginReturnType> => {
  return await axios.post('/auth/login', data);
};
