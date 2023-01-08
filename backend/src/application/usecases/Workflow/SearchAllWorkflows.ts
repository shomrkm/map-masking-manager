import { Workflow } from '@/domain/entities';

import { IWorkflowRepository } from '../../repositories/IWorkflowRepository';

export class SearchAllWorkflows {
  private workflowRepository: IWorkflowRepository;

  constructor(taskRepository: IWorkflowRepository) {
    this.workflowRepository = taskRepository;
  }

  public async execute(): Promise<Workflow[]> {
    return await this.workflowRepository.findAll();
  }
}
