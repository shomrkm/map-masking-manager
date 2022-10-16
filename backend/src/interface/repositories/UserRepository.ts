import { User } from '@/domain/User';
import { IUserRepository } from '@/application/repositories/IUserRepository';
import { IDBConnection } from '../database/IDBConnection';

export class UserRepository implements IUserRepository {
  private dbConnection: IDBConnection;
  constructor(dbConnection: IDBConnection) {
    this.dbConnection = dbConnection;
  }

  public async findAll(): Promise<User[]> {
    const userDtos = await this.dbConnection.findAllUsers();
    return userDtos.map(
      (userDto) =>
        new User({
          id: userDto._id,
          name: userDto.name,
          email: userDto.email,
          role: userDto.role,
          level: userDto.level,
          avatar: userDto.avatar,
          password: userDto.password,
          resetPasswordToken: userDto.resetPasswordToken ?? undefined,
          resetPasswordExpire: userDto.resetPasswordExpire ?? undefined,
          createdAt: userDto.createdAt,
        })
    );
  }

  public async find(id: string): Promise<User> {
    const userDto = await this.dbConnection.findUserById(id);
    const user = new User({
      id: userDto._id,
      name: userDto.name,
      email: userDto.email,
      role: userDto.role,
      level: userDto.level,
      avatar: userDto.avatar,
      password: userDto.password,
      resetPasswordToken: userDto.resetPasswordToken ?? undefined,
      resetPasswordExpire: userDto.resetPasswordExpire ?? undefined,
      createdAt: userDto.createdAt,
    });

    return user;
  }
}
