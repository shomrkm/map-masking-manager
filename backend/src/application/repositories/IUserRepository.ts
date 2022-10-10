import { User } from '@/domain/User';

export interface IUserRepository {
  find(id: string): Promise<User>;
}
