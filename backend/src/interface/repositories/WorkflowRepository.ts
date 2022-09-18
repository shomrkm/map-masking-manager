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

  public async find(id: string): Promise<Workflow> {
    const workflowDto = await this.dbConnection.findWorkflowById(id);
    const workflow = new Workflow({
      title: workflowDto.title,
      description: workflowDto.description,
      status: workflowDto.status,
      createUser: workflowDto.createUser,
      id: workflowDto._id,
      no: workflowDto.id,
      createdAt: workflowDto.createdAt,
    });

    return workflow;
  }

  public async save(workflow: Workflow): Promise<Workflow> {
    const workflowDto = {
      title: workflow.title,
      description: workflow.description,
      status: workflow.status,
      createUser: workflow.createUser,
      createdAt: workflow.createdAt.toDate(),
    };
    if (!workflow.id) {
      const { _id, id } = await this.dbConnection.createWorkflow(workflowDto);
      workflow.id = _id;
      workflow.no = id;
      return workflow;
    }

    const updatedWorkflow = await this.dbConnection.updateWorkflow(workflow.id, workflowDto);
    return new Workflow({
      title: updatedWorkflow.title,
      description: updatedWorkflow.description,
      status: updatedWorkflow.status,
      createUser: updatedWorkflow.createUser,
      id: updatedWorkflow._id,
      no: updatedWorkflow.id,
      createdAt: updatedWorkflow.createdAt,
    });
  }

  public async delete(workflowId: string): Promise<Workflow> {
    const workflowDto = await this.dbConnection.deleteWorkflow(workflowId);
    const workflow = new Workflow({
      title: workflowDto.title,
      description: workflowDto.description,
      status: workflowDto.status,
      createUser: workflowDto.createUser,
      id: workflowDto._id,
      no: workflowDto.id,
      createdAt: workflowDto.createdAt,
    });

    return workflow;
  }
}
