import { Request, Response } from 'express';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { UserSerializer } from '../serializers/UserSerializer';
import { ErrorResponse } from '@/shared/core/utils';
import { Login } from '@/application/usecases/Auth/login';

export class AuthController {
  constructor(
    private readonly userRepository = new UserRepository(),
    private readonly userSerializer = new UserSerializer()
  ) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ErrorResponse('Please provide an email and password', 400);
    }

    const loginUsecase = new Login(this.userRepository);
    const { user, token, cookieOptions } = await loginUsecase.execute(email, password);
    res
      .status(200)
      .cookie('token', token, cookieOptions)
      .json({
        success: true,
        data: this.userSerializer.serializeUser(user),
        token,
      });
  }
}
