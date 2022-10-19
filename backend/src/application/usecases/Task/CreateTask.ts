import { Polygon } from 'geojson';
import { Task } from '@/domain/Task';
import { ErrorResponse } from '@/interface/controller/errorResponse';
import { ITaskRepository } from '../../repositories/ITaskRepository';

export class CreateTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(
    title: string,
    description: string,
    workflow: string,
    status: string,
    priority: string,
    target: string[],
    level: string,
    createUser: string,
    detail: string = '',
    area: Polygon | null = null,
    previous: string[] = [],
    next: string[] = [],
    assignedUsers: string[] = []
  ): Promise<Task> {
    const task = new Task({
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
    });

    // TODO: Check authorization.

    const newTask = await this.taskRepository.save(task);
    const newId = newTask.id;
    if (!newId) {
      throw new ErrorResponse('Task has not id', 400);
    }

    // Add task id to previous/next tasks.
    if (task.next.length) {
      next.forEach(async (next) => {
        const nextTask = await this.taskRepository.findById(next);
        if (!nextTask) {
          throw new ErrorResponse(`Task was not found with id of ${next}`, 404);
        }
        nextTask.previous.push(newId);
        await this.taskRepository.save(nextTask);
      });
    }
    if (task.previous.length) {
      previous.forEach(async (prev) => {
        const prevTask = await this.taskRepository.findById(prev);
        if (!prevTask) {
          throw new ErrorResponse(`Task was not found with id of ${prev}`, 404);
        }
        prevTask.next.push(newId);
        await this.taskRepository.save(prevTask);
      });
    }

    return newTask;
  }
}
