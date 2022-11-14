import { IUserRepository } from '@/application/repositories/IUserRepository';
import { SearchAllUsers, SearchUser } from '@/application/usecases/User';
import { UserRepository } from '../repositories/UserRepository';
import { UserSerializer } from '../serializers/UserSerializer';
import { buildPaginationData } from '../../shared/core/utils/buildPaginationData';

export class UserController {
  private userRepository: IUserRepository;
  private userSerializer: UserSerializer;

  constructor() {
    this.userRepository = new UserRepository();
    this.userSerializer = new UserSerializer();
  }

  public async getUsers(req: any) {
    const searchAllUsers = new SearchAllUsers(this.userRepository);
    const users = await searchAllUsers.execute();
    const { count, pagination, data } = buildPaginationData(req, users);
    return {
      success: true,
      count,
      pagination,
      data: this.userSerializer.serializeUsers(data),
    };
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
