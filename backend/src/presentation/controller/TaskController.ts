import { Request, Response } from 'express';

import { buildPaginationData } from '@/shared/core/utils/buildPaginationData';
import {
  CreateTask,
  DeleteTask,
  UpdateTask,
  SearchAllTasks,
  SearchTasksInWorkflow,
  SearchTask,
} from '@/application/usecases/Task';
import { TaskRepository } from '@/infrastructure/repositories/TaskRepository';

import { TaskSerializer } from '../serializers/TaskSerializer';

export class TaskController {
  constructor(
    private readonly taskRepository = new TaskRepository(),
    private readonly taskSerializer = new TaskSerializer()
  ) {}

  public async getTasks(req: Request, res: Response) {
    if (req.params.workflowid) {
      const searchTasks = new SearchTasksInWorkflow(this.taskRepository);
      const tasks = await searchTasks.execute(req.params.workflowid);
      const { count, pagination, data } = buildPaginationData(req, tasks);
      res.status(200).json({
        success: true,
        count,
        pagination,
        data: this.taskSerializer.serializeTasks(data),
      });
      return;
    }
    const searchAllTasks = new SearchAllTasks(this.taskRepository);
    const tasks = await searchAllTasks.execute();
    const { count, pagination, data } = buildPaginationData(req, tasks);
    res.status(200).json({
      success: true,
      count,
      pagination,
      data: this.taskSerializer.serializeTasks(data),
    });
  }

  public async getTask(req: Request, res: Response) {
    const searchTask = new SearchTask(this.taskRepository);
    const task = await searchTask.execute(req.params.id);
    res.status(200).json({
      success: true,
      data: this.taskSerializer.serializeTask(task),
    });
  }

  public async createTask(req: Request, res: Response) {
    req.body.createUser = req.user._id;
    const {
      title,
      description,
      workflow,
      status,
      priority,
      target,
      level,
      createUser,
      detail,
      area,
      previous,
      next,
      assignedUsers,
    } = req.body;

    const useCase = new CreateTask(this.taskRepository);
    const newTask = await useCase.execute(
      title,
      description,
      workflow,
      status,
      priority,
      target,
      level,
      createUser,
      detail,
      area,
      previous,
      next,
      assignedUsers
    );
    res.status(201).json({
      success: true,
      data: this.taskSerializer.serializeTask(newTask),
    });
  }

  public async deleteTask(req: Request, res: Response) {
    const useCase = new DeleteTask(this.taskRepository);
    const task = await useCase.execute(req.params.id);
    res.status(200).json({
      success: true,
      data: this.taskSerializer.serializeTask(task),
    });
  }

  public async updateTask(req: Request, res: Response) {
    const useCase = new UpdateTask(this.taskRepository);
    const task = await useCase.execute(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: this.taskSerializer.serializeTask(task),
    });
  }
}
