import { Task } from '@/domain/Task';
import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { IDBConnection } from '../database/IDBConnection';

export class TaskRepository extends ITaskRepository {
  private dbConnection: IDBConnection;
  constructor(dbConnection: IDBConnection) {
    super();
    this.dbConnection = dbConnection;
  }

  public async save(task: Task): Promise<Task> {
    const { _id, id } = await this.dbConnection.createTask({
      title: task.title,
      description: task.description,
      detail: task.detail,
      area: task.area ?? undefined,
      status: task.status,
      workflow: task.workflowId,
      target: task.target,
      previous: task.previous,
      next: task.next,
      level: task.level,
      priority: task.priority,
      createUser: task.createdUserId,
      createdAt: task.createdAt.toDate(),
    });

    task.id = _id;
    task.no = id;

    return task;
  }
}
