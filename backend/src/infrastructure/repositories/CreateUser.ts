import { User } from '@/domain/entities';
import { Role, Level } from '@/domain/ValueObjects';

import { IUserRepository } from '../../repositories/IUserRepository';

export class CreateUser {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(
    name: string,
    email: string,
    role: string,
    level: string,
    password: string
  ): Promise<User> {
    // TODO: Check authorization.

    const user = new User({
      name,
      email,
      role: new Role(role),
      level: new Level(level),
      password,
    });

    return await this.userRepository.save(user);
  }
}
