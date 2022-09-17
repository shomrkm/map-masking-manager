import { IWorkflowRepository } from '@/application/repositories/IWorkflowRepository';
import { SearchAllWorkflows } from '@/application/usecases/SearchAllWorkflows';

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
}
