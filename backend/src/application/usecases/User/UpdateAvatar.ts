import { ErrorResponse } from '@/shared/core/utils';
import { User } from '@/domain/entities';

import { IUserRepository } from '../../repositories/IUserRepository';

export class UpdateAvatar {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(id: string, filename: string): Promise<User> {
    const user = await this.userRepository.find(id);
    if (!user) {
      throw new ErrorResponse(`User was not found with id of ${id}`, 404);
    }

    user.updateAvatar(filename);
    return await this.userRepository.save(user);
  }
}
