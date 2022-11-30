import { User } from '@/domain/entities';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  find(id: string): Promise<User>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<User>;
}
