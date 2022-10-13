import { IUserRepository } from '@/application/repositories/IUserRepository';
import { SearchUser } from '@/application/usecases/User';

import { IDBConnection } from '../database/IDBConnection';
import { UserRepository } from '../repositories/UserRepository';
import { UserSerializer } from '../serializers/UserSerializer';

export class UserController {
  private userRepository: IUserRepository;
  private userSerializer: UserSerializer;

  constructor(dbConnection: IDBConnection) {
    this.userRepository = new UserRepository(dbConnection);
    this.userSerializer = new UserSerializer();
  }

  public async getUser(req: any) {
    const searchUser = new SearchUser(this.userRepository);
    const user = await searchUser.execute(req.params.id);
    return {
      success: true,
      data: this.userSerializer.serializeUser(user),
    };
  }
}
