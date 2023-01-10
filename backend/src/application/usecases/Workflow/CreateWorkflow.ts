import { Workflow } from '@/domain/entities';
import { Title, Description, WorkflowStatus } from '@/domain/ValueObjects';

import { IWorkflowRepository } from '../../repositories/IWorkflowRepository';

export class CreateWorkflow {
  private workflowRepository: IWorkflowRepository;

  constructor(workflowRepository: IWorkflowRepository) {
    this.workflowRepository = workflowRepository;
  }

  public async execute(
    title: string,
    description: string,
    status: string,
    createUser: string
  ): Promise<Workflow> {
    const workflow = new Workflow({
      title: new Title(title),
      description: new Description(description),
      status: new WorkflowStatus(status),
      createUser,
    });

    return await this.workflowRepository.save(workflow);
  }
}
