import { Polygon } from 'geojson';
import { ErrorResponse } from '@/shared/core/utils';
import { Task } from '@/domain/entities';
import {
  Title,
  Description,
  TaskStatus,
  Priority,
  Level,
  Targets,
  targetTypes,
} from '@/domain/ValueObjects';
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
      title: new Title(title),
      description: new Description(description),
      workflow,
      status: new TaskStatus(status),
      priority: new Priority(priority),
      target: new Targets(target, targetTypes),
      level: new Level(level),
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
