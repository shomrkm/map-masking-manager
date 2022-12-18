import { CookieOptions } from 'express';
import { User } from '@/domain/entities';
import { Role, Level } from '@/domain/ValueObjects';
import { IUserRepository } from '../../repositories/IUserRepository';
import { createCookieOptions } from './utils/createCookieOptions';

type ReturnType = {
  user: User;
  token: string;
  cookieOptions: CookieOptions;
};

export class Register {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(
    name: string,
    email: string,
    role: string,
    level: string,
    password: string
  ): Promise<ReturnType> {
    const user = new User({
      name,
      email,
      role: new Role(role),
      level: new Level(level),
      password,
    });

    const createdUser = await this.userRepository.save(user);
    const token = user.getSignedJwtToken();
    const cookieOptions = createCookieOptions();
    return { user: createdUser, token, cookieOptions };
  }
}
