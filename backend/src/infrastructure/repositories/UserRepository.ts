import { User } from '@/domain/entities';
import { Level, Role } from '@/domain/ValueObjects';
import { IUserRepository } from '@/application/repositories/IUserRepository';
import { User as UserModel, UserDoc } from '../mongoose/models';
import { IDBConnection } from '../database/IDBConnection';
import { ErrorResponse } from '@/shared/core/utils';

export class UserRepository implements IUserRepository {
  private dbConnection: IDBConnection;
  constructor(dbConnection: IDBConnection) {
    this.dbConnection = dbConnection;
  }

  public async findAll(): Promise<User[]> {
    const userDocs: UserDoc[] = await UserModel.find();
    return userDocs.map(
      (userDoc) =>
        new User({
          id: userDoc._id.toString(),
          name: userDoc.name,
          email: userDoc.email,
          role: new Role(userDoc.role),
          level: new Level(userDoc.level),
          avatar: userDoc.avatar,
          password: userDoc.password,
          resetPasswordToken: userDoc.resetPasswordToken ?? undefined,
          resetPasswordExpire: userDoc.resetPasswordExpire
            ? new Date(userDoc.resetPasswordExpire.toString())
            : undefined,
          createdAt: new Date(userDoc.createdAt.toString()),
        })
    );
  }

  public async find(id: string): Promise<User> {
    const userDoc: UserDoc | null = await UserModel.findById(id);
    if (!userDoc) {
      throw new ErrorResponse(`User was not found with id of ${id}`, 404);
    }
    const user = new User({
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      role: new Role(userDoc.role),
      level: new Level(userDoc.level),
      avatar: userDoc.avatar,
      password: userDoc.password,
      resetPasswordToken: userDoc.resetPasswordToken ?? undefined,
      resetPasswordExpire: userDoc.resetPasswordExpire
        ? new Date(userDoc.resetPasswordExpire.toString())
        : undefined,
      createdAt: new Date(userDoc.createdAt.toString()),
    });

    return user;
  }
}
