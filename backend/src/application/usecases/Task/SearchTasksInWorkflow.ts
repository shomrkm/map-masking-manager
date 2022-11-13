import { Task } from '@/domain/entities';
import { ITaskRepository } from '../../repositories/ITaskRepository';

export class SearchTasksInWorkflow {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(workflowId: string): Promise<Task[]> {
    // TODO: Make sure to find workflow by id in this application business layer.
    return await this.taskRepository.findByWorkflowId(workflowId);
  }
}
