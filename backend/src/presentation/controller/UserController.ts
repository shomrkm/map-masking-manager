import { Request, Response } from 'express';
import { buildPaginationData } from '@/shared/core/utils/buildPaginationData';
import { SearchAllUsers, SearchUser } from '@/application/usecases/User';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { UserSerializer } from '../serializers/UserSerializer';
import { CreateUser } from '@/application/usecases/User/CreateUser';
import { UpdateUser } from '@/application/usecases/User/UpdateUser';
import { DeleteUser } from '@/application/usecases/User/DeleteUser';
import { UpdateAvatar } from '@/application/usecases/User/UpdateAvatar';

export class UserController {
  constructor(
    private readonly userRepository = new UserRepository(),
    private readonly userSerializer = new UserSerializer()
  ) {}

  public async getUsers(req: Request, res: Response) {
    const searchAllUsers = new SearchAllUsers(this.userRepository);
    const users = await searchAllUsers.execute();
    const { count, pagination, data } = buildPaginationData(req, users);
    res.status(200).json({
      success: true,
      count,
      pagination,
      data: this.userSerializer.serializeUsers(data),
    });
  }

  public async getUser(req: Request, res: Response) {
    const searchUser = new SearchUser(this.userRepository);
    const user = await searchUser.execute(req.params.id);
    res.status(200).json({
      success: true,
      data: this.userSerializer.serializeUser(user),
    });
  }

  public async createUser(req: Request, res: Response) {
    const { name, email, role, level, password } = req.body;
    const createUser = new CreateUser(this.userRepository);
    const user = await createUser.execute(name, email, role, level, password);
    res.status(201).json({
      success: true,
      data: this.userSerializer.serializeUser(user),
    });
  }

  public async updateUser(req: Request, res: Response) {
    const updateUser = new UpdateUser(this.userRepository);
    const user = await updateUser.execute(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: this.userSerializer.serializeUser(user),
    });
  }

  public async deleteUser(req: Request, res: Response) {
    const deleteUser = new DeleteUser(this.userRepository);
    const user = await deleteUser.execute(req.params.id);
    res.status(200).json({
      success: true,
      data: this.userSerializer.serializeUser(user),
    });
  }

  public async updateAvatar(req: Request, res: Response) {
    const updateAvatar = new UpdateAvatar(this.userRepository);
    const user = await updateAvatar.execute(req.params.id, req.params.filename);
    res.status(200).json({
      success: true,
      data: this.userSerializer.serializeUser(user),
    });
  }
}
