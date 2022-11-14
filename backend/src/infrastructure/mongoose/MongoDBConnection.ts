import { ErrorResponse } from '@/shared/core/utils';
import { IDBConnection } from '../database/IDBConnection';
import { WorkflowDTO, CreateWorkflowDTO, UpdateWorkflowDTO } from '../database/dto';
import { UserDTO } from '../database/dto/userDto';
import { Workflow as WorkflowModel, User as UserModel, UserDoc } from './models';

export class MongoDBConnection implements IDBConnection {
  public async findUserById(userId: string): Promise<UserDTO> {
    const userDoc: UserDoc | null = await UserModel.findById(userId);
    if (!userDoc) {
      throw new ErrorResponse(`User was not found with id of ${userId}`, 404);
    }

    const user: UserDTO = {
      _id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      role: userDoc.role,
      level: userDoc.level,
      avatar: userDoc.avatar,
      password: userDoc.password,
      resetPasswordToken: userDoc.resetPasswordToken ?? null,
      resetPasswordExpire: userDoc.resetPasswordExpire
        ? new Date(userDoc.resetPasswordExpire.toString())
        : null,
      createdAt: new Date(userDoc.createdAt.toString()),
    };

    return user;
  }
}
