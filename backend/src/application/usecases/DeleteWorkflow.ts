import { Workflow } from '@/domain/Workflow';
import { IWorkflowRepository } from '../repositories/IWorkflowRepository';
import { ErrorResponse } from '@/interface/controller/errorResponse';

export class DeleteWorkflow {
  private workflowRepository: IWorkflowRepository;

  constructor(workflowRepository: IWorkflowRepository) {
    this.workflowRepository = workflowRepository;
  }

  public async execute(workflowId: string): Promise<Workflow> {
    if (!(await this.workflowRepository.find(workflowId))) {
      throw new ErrorResponse(`Workflow was not found with id of ${workflowId}`, 404);
    }

    return await this.workflowRepository.delete(workflowId);
  }
}
