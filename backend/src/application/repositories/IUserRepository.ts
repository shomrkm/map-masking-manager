import { User } from '@/domain/entities';

export type FindByEmailOption = {
  selectPassword?: boolean;
};

export interface IUserRepository {
  findAll(): Promise<User[]>;
  find(id: string): Promise<User>;
  findByEmail(email: string, option?: FindByEmailOption): Promise<User>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<User>;
}
