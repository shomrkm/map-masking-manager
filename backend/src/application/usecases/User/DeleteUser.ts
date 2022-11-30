import { ErrorResponse } from '@/shared/core/utils';
import { User } from '@/domain/entities';
import { IUserRepository } from '../../repositories/IUserRepository';

export class DeleteUser{
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(id: string): Promise<User> {
    if (!(await this.userRepository.find(id))) {
      throw new ErrorResponse(`User was not found with id of ${id}`, 404);
    }

    return await this.userRepository.delete(id);
  }
}
