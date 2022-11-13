import { User } from '@/domain/entities';
import { IUserRepository } from '../../repositories/IUserRepository';

export class SearchUser {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(userId: string): Promise<User> {
    return await this.userRepository.find(userId);
  }
}
