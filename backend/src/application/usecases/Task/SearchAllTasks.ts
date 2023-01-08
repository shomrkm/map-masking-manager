import { Task } from '@/domain/entities';

import { ITaskRepository } from '../../repositories/ITaskRepository';

export class SearchAllTasks {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }
}
