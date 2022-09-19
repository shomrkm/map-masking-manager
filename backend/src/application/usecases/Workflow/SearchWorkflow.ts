import { Workflow } from '@/domain/Workflow';

import { IWorkflowRepository } from '../../repositories/IWorkflowRepository';

export class SearchWorkflow {
  private workflowRepository: IWorkflowRepository;

  constructor(workflowRepository: IWorkflowRepository) {
    this.workflowRepository = workflowRepository;
  }

  public async execute(workflowId: string): Promise<Workflow> {
    return await this.workflowRepository.find(workflowId);
  }
}
