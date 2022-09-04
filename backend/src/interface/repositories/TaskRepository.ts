import { Task } from '@/domain/Task';
import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { IDBConnection } from '../database/IDBConnection';

export class TaskRepository extends ITaskRepository {
  private dbConnection: IDBConnection;
  constructor(dbConnection: IDBConnection) {
    super();
    this.dbConnection = dbConnection;
  }

  public async findAll(): Promise<Task[]> {
    const taskDtos = await this.dbConnection.findAllTasks();
    const tasks = taskDtos.map(
      (taskDto) =>
        new Task({
          title: taskDto.title,
          description: taskDto.description,
          workflow: taskDto.workflow,
          priority: taskDto.priority,
          target: taskDto.target,
          level: taskDto.level,
          createUser: taskDto.createUser,
          detail: taskDto.detail,
          area: taskDto.area,
          previous: taskDto.previous,
          next: taskDto.next,
          assignedUsers: taskDto.assignedUsers,
          id: taskDto._id,
          no: taskDto.id,
          createdAt: taskDto.createdAt,
        })
    );

    return tasks;
  }

  public async find(id: string): Promise<Task> {
    const taskDto = await this.dbConnection.findTaskById(id);
    const task = new Task({
      title: taskDto.title,
      description: taskDto.description,
      workflow: taskDto.workflow,
      priority: taskDto.priority,
      target: taskDto.target,
      level: taskDto.level,
      createUser: taskDto.createUser,
      detail: taskDto.detail,
      area: taskDto.area,
      previous: taskDto.previous,
      next: taskDto.next,
      assignedUsers: taskDto.assignedUsers,
      id: taskDto._id,
      no: taskDto.id,
      createdAt: taskDto.createdAt,
    });

    return task;
  }

  public async findByWorkflowId(workflowId: string): Promise<Task[]> {
    const taskDtos = await this.dbConnection.findTasksByWorkflowId(workflowId);
    const tasks = taskDtos.map(
      (taskDto) =>
        new Task({
          title: taskDto.title,
          description: taskDto.description,
          workflow: taskDto.workflow,
          priority: taskDto.priority,
          target: taskDto.target,
          level: taskDto.level,
          createUser: taskDto.createUser,
          detail: taskDto.detail,
          area: taskDto.area,
          previous: taskDto.previous,
          next: taskDto.next,
          assignedUsers: taskDto.assignedUsers,
          id: taskDto._id,
          no: taskDto.id,
          createdAt: taskDto.createdAt,
        })
    );
    return tasks;
  }

  public async save(task: Task): Promise<Task> {
    const { _id, id } = await this.dbConnection.createTask({
      title: task.title,
      description: task.description,
      detail: task.detail,
      area: task.area ?? undefined,
      status: task.status,
      workflow: task.workflow,
      target: task.target,
      previous: task.previous,
      next: task.next,
      level: task.level,
      priority: task.priority,
      createUser: task.createdUser,
      createdAt: task.createdAt.toDate(),
    });

    task.id = _id;
    task.no = id;

    return task;
  }

  public async delete(taskId: string): Promise<Task> {
    const taskDto = await this.dbConnection.deleteTask(taskId);
    const task = new Task({
      title: taskDto.title,
      description: taskDto.description,
      workflow: taskDto.workflow,
      priority: taskDto.priority,
      target: taskDto.target,
      level: taskDto.level,
      createUser: taskDto.createUser,
      detail: taskDto.detail,
      area: taskDto.area,
      previous: taskDto.previous,
      next: taskDto.next,
      assignedUsers: taskDto.assignedUsers,
      id: taskDto._id,
      no: taskDto.id,
      createdAt: taskDto.createdAt,
    });

    return task;
  }
}
