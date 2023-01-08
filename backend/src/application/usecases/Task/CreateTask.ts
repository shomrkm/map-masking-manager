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
    // TODO: Check authorization.

    this.checkTaskExists(previous);
    this.checkTaskExists(next);

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

    const newTask = await this.taskRepository.save(task);
    const newId = newTask.id;
    if (!newId) {
      throw new ErrorResponse('Task has not id', 400);
    }

    // Add task id to previous/next tasks.
    task.previous.forEach(async (id) => {
      const prevTask = await this.taskRepository.findById(id);
      prevTask.addNextTask(newId);
      await this.taskRepository.save(prevTask);
    });
    task.next.forEach(async (id) => {
      const nextTask = await this.taskRepository.findById(id);
      nextTask.addPreviousTask(newId);
      await this.taskRepository.save(nextTask);
    });

    return newTask;
  }

  private checkTaskExists(ids: string[]) {
    ids.forEach(async (id) => {
      if (!(await this.taskRepository.findById(id))) {
        throw new ErrorResponse(`Task was not found with id of ${id}`, 404);
      }
    });
  }
}
