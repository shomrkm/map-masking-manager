import { User } from '@/domain/entities';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  find(id: string): Promise<User>;
}
