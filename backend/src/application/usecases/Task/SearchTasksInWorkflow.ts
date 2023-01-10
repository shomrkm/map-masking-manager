import { Task } from '@/domain/entities';

import { ITaskRepository } from '../../repositories/ITaskRepository';

export class SearchTasksInWorkflow {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(workflowId: string): Promise<Task[]> {
    return await this.taskRepository.findByWorkflowId(workflowId);
  }
}
