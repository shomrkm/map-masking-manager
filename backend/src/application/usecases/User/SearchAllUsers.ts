import { User } from '@/domain/entities';

import { IUserRepository } from '../../repositories/IUserRepository';

export class SearchAllUsers {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
