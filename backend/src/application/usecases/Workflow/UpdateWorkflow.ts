import { Workflow, Title, Description, Status } from '@/domain/Workflow';
import { ErrorResponse } from '@/interface/controller/errorResponse';
import { IWorkflowRepository } from '../../repositories/IWorkflowRepository';

export class UpdateWorkflow {
  private workflowRepository: IWorkflowRepository;

  constructor(workflowRepository: IWorkflowRepository) {
    this.workflowRepository = workflowRepository;
  }

  public async execute(workflowId: string, values: Record<string, unknown>): Promise<Workflow> {
    const workflow = await this.workflowRepository.find(workflowId);
    if (!workflow) {
      throw new ErrorResponse(`Workflow was not found with id of ${workflowId}`, 404);
    }

    const { title, description, status } = values;
    if (typeof title === 'string') workflow.title = new Title(title);
    if (typeof description === 'string') workflow.description = new Description(description);
    if (typeof status === 'string') workflow.status = new Status(status);
    return await this.workflowRepository.save(workflow);
  }
}
