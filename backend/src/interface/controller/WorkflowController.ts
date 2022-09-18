import { IWorkflowRepository } from '@/application/repositories/IWorkflowRepository';
import { SearchAllWorkflows } from '@/application/usecases/SearchAllWorkflows';
import { SearchWorkflow } from '@/application/usecases/SearchWorkflow';
import { CreateWorkflow } from '@/application/usecases/CreateWorkflow';
import { UpdateWorkflow } from '@/application/usecases/UpdateWorkflow';

import { IDBConnection } from '../database/IDBConnection';
import { WorkflowRepository } from '../repositories/WorkflowRepository';
import { WorkflowSerializer } from '../serializers/WorkflowSerializer';
import { buildPaginationData } from './buildPaginationData';

export class WorkflowController {
  private workflowRepository: IWorkflowRepository;
  private workflowSerializer: WorkflowSerializer;

  constructor(dbConnection: IDBConnection) {
    this.workflowRepository = new WorkflowRepository(dbConnection);
    this.workflowSerializer = new WorkflowSerializer();
  }

  public async getWorkflows(req: any) {
    const searchAllWorkflows = new SearchAllWorkflows(this.workflowRepository);
    const tasks = await searchAllWorkflows.execute();
    const { count, pagination, data } = buildPaginationData(req, tasks);
    return {
      success: true,
      count,
      pagination,
      data: this.workflowSerializer.serializeWorkflows(data),
    };
  }

  public async getWorkflow(req: any) {
    const searchWorkflow = new SearchWorkflow(this.workflowRepository);
    const workflow = await searchWorkflow.execute(req.params.id);
    return {
      success: true,
      data: this.workflowSerializer.serializeWorkflow(workflow),
    };
  }

  public async createWorkflow(req: any) {
    const { title, description, status, createUser } = req.body;

    const useCase = new CreateWorkflow(this.workflowRepository);
    const newWorkflow = await useCase.execute(title, description, status, createUser);
    return {
      success: true,
      data: this.workflowSerializer.serializeWorkflow(newWorkflow),
    };
  }

  public async updateWorkflow(req: any) {
    const useCase = new UpdateWorkflow(this.workflowRepository);
    const workflow = await useCase.execute(req.params.id, req.body);
    return {
      success: true,
      data: this.workflowSerializer.serializeWorkflow(workflow),
    };
  }
}
