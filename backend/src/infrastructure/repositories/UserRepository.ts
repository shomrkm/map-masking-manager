import { User } from '@/domain/entities';
import { Level, Role } from '@/domain/ValueObjects';
import { IUserRepository } from '@/application/repositories/IUserRepository';
import { User as UserModel, UserDoc } from '../mongoose/models';
import { ErrorResponse } from '@/shared/core/utils';

export class UserRepository implements IUserRepository {
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

  public async save(user: User): Promise<User> {
    const userDto = user.toPrimitive();
    if (!user.id) {
      const newUser = await UserModel.create(userDto);
      if (!newUser) {
        throw new ErrorResponse('Creating New User Failed', 400);
      }
      user.id = newUser._id.toString();
      return user;
    }

    // TODO: Update Task
    return user;
  }
}
