import { Workflow } from '@/domain/Workflow';
import { IWorkflowRepository } from '@/application/repositories/IWorkflowRepository';
import { IDBConnection } from '../database/IDBConnection';

export class WorkflowRepository implements IWorkflowRepository {
  private dbConnection: IDBConnection;
  constructor(dbConnection: IDBConnection) {
    this.dbConnection = dbConnection;
  }

  public async findAll(): Promise<Workflow[]> {
    const workflowDtos = await this.dbConnection.findAllWorkflows();
    const workflows = workflowDtos.map(
      (workflowDto) =>
        new Workflow({
          title: workflowDto.title,
          description: workflowDto.description,
          status: workflowDto.status,
          createUser: workflowDto.createUser,
          id: workflowDto._id,
          no: workflowDto.id,
          createdAt: workflowDto.createdAt,
        })
    );

    return workflows;
  }
}
