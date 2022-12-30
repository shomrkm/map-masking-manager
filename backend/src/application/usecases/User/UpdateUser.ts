import { ErrorResponse } from '@/shared/core/utils';
import { User } from '@/domain/entities';
import { Email, Level, Role } from '@/domain/ValueObjects';
import { IUserRepository } from '../../repositories/IUserRepository';

export class UpdateUser {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(id: string, values: Record<string, unknown>): Promise<User> {
    const user = await this.userRepository.find(id);
    if (!user) {
      throw new ErrorResponse(`User was not found with id of ${id}`, 404);
    }

    const { name, email, role, level } = values;
    if (typeof name === 'string') user.name = name;
    if (typeof email === 'string') user.email = new Email(email);
    if (typeof role === 'string') user.role = new Role(role);
    if (typeof level === 'string') user.level = new Level(level);
    return await this.userRepository.save(user);
  }
}
