import { buildPaginationData } from '@/shared/core/utils/buildPaginationData';
import { IUserRepository } from '@/application/repositories/IUserRepository';
import { SearchAllUsers, SearchUser } from '@/application/usecases/User';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { UserSerializer } from '../serializers/UserSerializer';
import { CreateUser } from '@/application/usecases/User/CreateUser';
import { UpdateUser } from '@/application/usecases/User/UpdateUser';
import { DeleteUser } from '@/application/usecases/User/DeleteUser';

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

  public async createUser(req: any) {
    const { name, email, role, level, password } = req.body;
    const createUser = new CreateUser(this.userRepository);
    const user = await createUser.execute(name, email, role, level, password);
    return {
      success: true,
      data: this.userSerializer.serializeUser(user),
    };
  }

  public async updateUser(req: any) {
    const updateUser = new UpdateUser(this.userRepository);
    const user = await updateUser.execute(req.params.id, req.body);
    return {
      success: true,
      data: this.userSerializer.serializeUser(user),
    };
  }

  public async deleteUser(req: any) {
    const deleteUser = new DeleteUser(this.userRepository);
    const user = await deleteUser.execute(req.params.id);
    return {
      success: true,
      data: this.userSerializer.serializeUser(user),
    };
  }
}
