import { Polygon } from 'geojson';
import { Task } from '@/domain/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';

export class SearchAllTasks {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(): Promise<Task[]> {
    return await this.taskRepository.findAll();
  }
}
