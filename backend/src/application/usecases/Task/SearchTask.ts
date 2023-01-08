import { Task } from '@/domain/entities';

import { ITaskRepository } from '../../repositories/ITaskRepository';

export class SearchTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(taskId: string): Promise<Task> {
    return await this.taskRepository.findById(taskId);
  }
}
