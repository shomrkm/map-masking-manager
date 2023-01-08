import { CookieOptions } from 'express';

import { User } from '@/domain/entities';
import { ErrorResponse } from '@/shared/core/utils';

import { IUserRepository } from '../../repositories/IUserRepository';
import { createCookieOptions } from './utils/createCookieOptions';

type ReturnType = {
  user: User;
  token: string;
  cookieOptions: CookieOptions;
};

export class UpdatePassword {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(
    id: string,
    currentPassword: string,
    newPassword: string
  ): Promise<ReturnType> {
    const user = await this.userRepository.find(id, { selectPassword: true });
    console.log(user);
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      throw new ErrorResponse('Invalid credentials', 401);
    }

    await user.setNewPassword(newPassword);
    const updatedUser = await this.userRepository.save(user);

    const token = user.getSignedJwtToken();
    const cookieOptions = createCookieOptions();
    return { user: updatedUser, token, cookieOptions };
  }
}
