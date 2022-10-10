import { LevelType } from '@/domain/Task';
import { RoleType } from '@/domain/User/entities/Role';

export type UserDTO = {
  _id: string;
  name: string;
  email: string;
  role: RoleType;
  level: LevelType;
  avatar: string;
  password: string;
  resetPasswordToken: string | null;
  resetPasswordExpire: Date | null;
  createdAt: Date;
};
