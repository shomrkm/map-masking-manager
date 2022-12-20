import { User } from '@/domain/entities';

export type FindOptions = {
  selectPassword?: boolean;
};

export interface IUserRepository {
  findAll(): Promise<User[]>;
  find(id: string, option?: FindOptions): Promise<User>;
  findByEmail(email: string, option?: FindOptions): Promise<User>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<User>;
}
