import { ErrorResponse } from '@/shared/core/utils';
import { IDBConnection } from '../database/IDBConnection';
import {
  TaskDTO,
  CreateTaskDTO,
  UpdateTaskDTO,
  OptionalTaskDTO,
  WorkflowDTO,
  CreateWorkflowDTO,
  UpdateWorkflowDTO,
  CommentDTO,
  CreateCommentDTO,
} from '../database/dto';
import { UserDTO } from '../database/dto/userDto';
import {
  Task as TaskModel,
  Workflow as WorkflowModel,
  Comment as CommentModel,
  User as UserModel,
  UserDoc,
} from './models';

export class MongoDBConnection implements IDBConnection {
  public async findAllWorkflows(): Promise<WorkflowDTO[]> {
    const workflows: WorkflowDTO[] = await WorkflowModel.find().populate({
      path: 'createUser',
      select: 'name avatar',
    });
    return workflows;
  }

  public async findWorkflowById(workflowId: string): Promise<WorkflowDTO> {
    const workflow: WorkflowDTO | null = await WorkflowModel.findById(workflowId).populate({
      path: 'createUser',
      select: 'name avatar',
    });
    if (!workflow) {
      throw new ErrorResponse(`Workflow was not found with id of ${workflowId}`, 404);
    }
    return workflow;
  }

  public async createWorkflow(workflow: CreateWorkflowDTO): Promise<WorkflowDTO> {
    const newWorkflow = await WorkflowModel.create(workflow);
    if (!newWorkflow) {
      throw new ErrorResponse('Creating Workflow Failed', 400);
    }
    return newWorkflow as any;
  }

  public async deleteWorkflow(workflowId: string): Promise<WorkflowDTO> {
    const workflow = await WorkflowModel.findById(workflowId);
    if (!workflow) {
      throw new ErrorResponse(`Workflow was not found with id of ${workflowId}`, 404);
    }
    workflow.remove();
    return workflow as any;
  }

  public async updateWorkflow(workflowId: string, values: UpdateWorkflowDTO): Promise<WorkflowDTO> {
    if (!(await WorkflowModel.findById(workflowId))) {
      throw new ErrorResponse(`Workflow was not found with id of ${workflowId}`, 404);
    }
    const workflow = await WorkflowModel.findOneAndUpdate({ _id: workflowId }, values, {
      new: true,
      runValidators: true,
    });
    return workflow as any;
  }

  public async findCommentById(commentId: string): Promise<CommentDTO> {
    const comment: CommentDTO | null = await CommentModel.findById(commentId).populate({
      path: 'user',
      select: 'name avatar',
    });
    if (!comment) {
      throw new ErrorResponse(`Comment was not found with id of ${commentId}`, 404);
    }
    return comment;
  }

  public async addComment(comment: CreateCommentDTO): Promise<CommentDTO> {
    const newComment = CommentModel.create(comment);
    if (!newComment) {
      throw new ErrorResponse('Creating Comment Failed', 400);
    }
    return newComment as any;
  }

  public async findCommentsByTaskId(taskId: string): Promise<CommentDTO[]> {
    if (!(await TaskModel.findById(taskId))) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }
    const comments: CommentDTO[] = await CommentModel.find({ task: taskId }).populate({
      path: 'user',
      select: 'name avatar',
    });
    return comments;
  }

  public async findAllUsers(): Promise<UserDTO[]> {
    const userDocs = await UserModel.find();
    return userDocs.map((user) => ({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      level: user.level,
      avatar: user.avatar,
      password: user.password,
      resetPasswordToken: user.resetPasswordToken ?? null,
      resetPasswordExpire: user.resetPasswordExpire
        ? new Date(user.resetPasswordExpire.toString())
        : null,
      createdAt: new Date(user.createdAt.toString()),
    }));
  }

  public async findUserById(userId: string): Promise<UserDTO> {
    const userDoc: UserDoc | null = await UserModel.findById(userId);
    if (!userDoc) {
      throw new ErrorResponse(`User was not found with id of ${userId}`, 404);
    }

    const user: UserDTO = {
      _id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      role: userDoc.role,
      level: userDoc.level,
      avatar: userDoc.avatar,
      password: userDoc.password,
      resetPasswordToken: userDoc.resetPasswordToken ?? null,
      resetPasswordExpire: userDoc.resetPasswordExpire
        ? new Date(userDoc.resetPasswordExpire.toString())
        : null,
      createdAt: new Date(userDoc.createdAt.toString()),
    };

    return user;
  }
}
