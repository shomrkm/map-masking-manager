import { LevelType, RoleType } from '@/domain/ValueObjects';

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
