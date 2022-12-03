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

    const updatedUser = await UserModel.findOneAndUpdate({ _id: user.id }, userDto, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      throw new ErrorResponse(`User was not found with id of ${user.id}`, 404);
    }

    return new User({
      id: updatedUser._id.toString(),
      name: updatedUser.name,
      email: updatedUser.email,
      role: new Role(updatedUser.role),
      level: new Level(updatedUser.level),
      avatar: updatedUser.avatar,
      password: updatedUser.password,
      resetPasswordToken: updatedUser.resetPasswordToken,
      resetPasswordExpire: updatedUser.resetPasswordExpire
        ? new Date(updatedUser.resetPasswordExpire.toString())
        : undefined,
      createdAt: new Date(updatedUser.createdAt.toString()),
    });
  }

  public async delete(id: string): Promise<User> {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ErrorResponse(`User was not found with id of ${id}`, 404);
    }
    const deletedUser = new User({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: new Role(user.role),
      level: new Level(user.level),
      avatar: user.avatar,
      password: user.password,
      resetPasswordToken: user.resetPasswordToken,
      resetPasswordExpire: user.resetPasswordExpire
        ? new Date(user.resetPasswordExpire.toString())
        : undefined,
      createdAt: new Date(user.createdAt.toString()),
    });
    await user.remove();

    return deletedUser;
  }
}
