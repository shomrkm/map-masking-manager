import { Request, Response } from 'express';

import { ErrorResponse } from '@/shared/core/utils';
import { Login, Register, UpdatePassword } from '@/application/usecases/Auth';
import { UpdateUser } from '@/application/usecases/User/UpdateUser';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';

import { UserSerializer } from '../serializers/UserSerializer';

export class AuthController {
  constructor(
    private readonly userRepository = new UserRepository(),
    private readonly userSerializer = new UserSerializer()
  ) {}

  public async register(req: Request, res: Response) {
    const { name, email, password, role, level } = req.body;
    if (!name || !email || !password || !role || !level) {
      throw new ErrorResponse('Please provide an name, email, role, level and password', 400);
    }

    const registerUser = new Register(this.userRepository);
    const { user, token, cookieOptions } = await registerUser.execute(
      name,
      email,
      role,
      level,
      password
    );
    res
      .status(200)
      .cookie('token', token, cookieOptions)
      .json({
        success: true,
        data: this.userSerializer.serializeUser(user),
        token,
      });
  }

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

  public async getMe(req: Request, res: Response) {
    // user is already available in req due to the protect middleware (middleware/auth)
    const user = req.user;

    res.status(200).json({
      success: true,
      data: user,
    });
  }

  public async logout(req: Request, res: Response) {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  }

  public async updatePassword(req: Request, res: Response) {
    const id = req.user.id;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      throw new ErrorResponse('Please provide a currentPassword and newPassword', 400);
    }

    const updatePasswordUsecase = new UpdatePassword(this.userRepository);
    const { user, token, cookieOptions } = await updatePasswordUsecase.execute(
      id,
      currentPassword,
      newPassword
    );

    res
      .status(200)
      .cookie('token', token, cookieOptions)
      .json({
        success: true,
        data: this.userSerializer.serializeUser(user),
        token,
      });
  }

  public async updateDetails(req: Request, res: Response) {
    const updateUser = new UpdateUser(this.userRepository);
    const user = await updateUser.execute(req.user.id, req.body);

    res.status(200).json({
      success: true,
      data: this.userSerializer.serializeUser(user),
    });
  }
}
