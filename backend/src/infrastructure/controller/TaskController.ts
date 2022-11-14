import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import {
  CreateTask,
  DeleteTask,
  UpdateTask,
  SearchAllTasks,
  SearchTasksInWorkflow,
  SearchTask,
} from '@/application/usecases/Task';
import { IDBConnection } from '../database/IDBConnection';
import { TaskRepository } from '../repositories/TaskRepository';
import { TaskSerializer } from '../serializers/TaskSerializer';
import { buildPaginationData } from '../../shared/core/utils/buildPaginationData';

export class TaskController {
  private taskRepository: ITaskRepository;
  private taskSerializer: TaskSerializer;

  constructor(dbConnection: IDBConnection) {
    this.taskRepository = new TaskRepository(dbConnection);
    this.taskSerializer = new TaskSerializer();
  }

  public async getTasks(req: any) {
    if (req.params.workflowid) {
      const searchTasks = new SearchTasksInWorkflow(this.taskRepository);
      const tasks = await searchTasks.execute(req.params.workflowid);
      const { count, pagination, data } = buildPaginationData(req, tasks);
      return {
        success: true,
        count,
        pagination,
        data: this.taskSerializer.serializeTasks(data),
      };
    }
    const searchAllTasks = new SearchAllTasks(this.taskRepository);
    const tasks = await searchAllTasks.execute();
    const { count, pagination, data } = buildPaginationData(req, tasks);
    return {
      success: true,
      count,
      pagination,
      data: this.taskSerializer.serializeTasks(data),
    };
  }

  public async getTask(req: any) {
    const searchTask = new SearchTask(this.taskRepository);
    const task = await searchTask.execute(req.params.id);
    return {
      success: true,
      data: this.taskSerializer.serializeTask(task),
    };
  }

  public async createTask(req: any) {
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
    return {
      success: true,
      data: this.taskSerializer.serializeTask(newTask),
    };
  }

  public async deleteTask(req: any) {
    const useCase = new DeleteTask(this.taskRepository);
    const task = await useCase.execute(req.params.id);
    return {
      success: true,
      data: this.taskSerializer.serializeTask(task),
    };
  }

  public async updateTask(req: any) {
    const useCase = new UpdateTask(this.taskRepository);
    const task = await useCase.execute(req.params.id, req.body);
    return {
      success: true,
      data: this.taskSerializer.serializeTask(task),
    };
  }
}
