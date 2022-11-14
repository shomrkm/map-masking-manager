import { IWorkflowRepository } from '@/application/repositories/IWorkflowRepository';
import {
  SearchAllWorkflows,
  SearchWorkflow,
  CreateWorkflow,
  DeleteWorkflow,
  UpdateWorkflow,
} from '@/application/usecases/Workflow';
import { WorkflowRepository } from '../repositories/WorkflowRepository';
import { WorkflowSerializer } from '../serializers/WorkflowSerializer';
import { buildPaginationData } from '../../shared/core/utils/buildPaginationData';

export class WorkflowController {
  private workflowRepository: IWorkflowRepository;
  private workflowSerializer: WorkflowSerializer;

  constructor() {
    this.workflowRepository = new WorkflowRepository();
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

  public async deleteWorkflow(req: any) {
    const useCase = new DeleteWorkflow(this.workflowRepository);
    const workflow = await useCase.execute(req.params.id);
    return {
      success: true,
      data: this.workflowSerializer.serializeWorkflow(workflow),
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
