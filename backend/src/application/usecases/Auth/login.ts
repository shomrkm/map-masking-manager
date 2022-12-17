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

export class Login {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(email: string, password: string): Promise<ReturnType> {
    const user = await this.userRepository.findByEmail(email, { selectPassword: true });
    if (!user.matchPassword(password)) {
      throw new ErrorResponse('Invalid credentials', 401);
    }

    const token = user.getSignedJwtToken();
    const cookieOptions = createCookieOptions();
    return { user, token, cookieOptions };
  }
}
