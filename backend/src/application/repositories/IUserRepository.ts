import { User } from '@/domain/User';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  find(id: string): Promise<User>;
}
