import { Task, Title, Description, Status, Priority, Level } from '@/domain/Task';
import { ErrorResponse } from '@/interface/controller/errorResponse';
import { ITaskRepository } from '../../repositories/ITaskRepository';

export class UpdateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(taskId: string, values: Record<string, unknown>): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }
    const { title, description, detail, target, level, priority, status } = values;
    if (typeof title === 'string') task.title = new Title(title);
    if (typeof description === 'string') task.description = new Description(description);
    if (typeof detail === 'string') task.detail = detail;
    if (Array.isArray(target)) task.target = target;
    if (typeof level === 'string') task.level = new Level(level);
    if (typeof priority === 'string') task.priority = new Priority(priority);
    if (typeof status === 'string') task.status = new Status(status);
    return await this.taskRepository.save(task);
  }
}
