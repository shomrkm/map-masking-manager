import { Polygon } from 'geojson';
import { Task } from '@/domain/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';

export class SearchTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(taskId: string): Promise<Task> {
    return await this.taskRepository.find(taskId);
  }
}
