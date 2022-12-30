import { Request, Response } from 'express';
import { buildPaginationData } from '@/shared/core/utils/buildPaginationData';
import {
  SearchAllWorkflows,
  SearchWorkflow,
  CreateWorkflow,
  DeleteWorkflow,
  UpdateWorkflow,
} from '@/application/usecases/Workflow';
import { WorkflowRepository } from '@/infrastructure/repositories/WorkflowRepository';
import { WorkflowSerializer } from '../serializers/WorkflowSerializer';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';

export class WorkflowController {
  constructor(
    private readonly workflowRepository = new WorkflowRepository(),
    private readonly workflowSerializer = new WorkflowSerializer(new UserRepository())
  ) {}

  public async getWorkflows(req: Request, res: Response) {
    const searchAllWorkflows = new SearchAllWorkflows(this.workflowRepository);
    const workflows = await searchAllWorkflows.execute();
    const { count, pagination, data } = buildPaginationData(req, workflows);
    res.status(200).json({
      success: true,
      count,
      pagination,
      data: await this.workflowSerializer.serializeWorkflows(data),
    });
  }

  public async getWorkflow(req: Request, res: Response) {
    const searchWorkflow = new SearchWorkflow(this.workflowRepository);
    const workflow = await searchWorkflow.execute(req.params.id);
    res.status(200).json({
      success: true,
      data: await this.workflowSerializer.serializeWorkflow(workflow),
    });
  }

  public async createWorkflow(req: Request, res: Response) {
    req.body.createUser = req.user._id;
    const { title, description, status, createUser } = req.body;

    const useCase = new CreateWorkflow(this.workflowRepository);
    const newWorkflow = await useCase.execute(title, description, status, createUser);
    res.status(201).json({
      success: true,
      data: await this.workflowSerializer.serializeWorkflow(newWorkflow),
    });
  }

  public async deleteWorkflow(req: Request, res: Response) {
    const useCase = new DeleteWorkflow(this.workflowRepository);
    const workflow = await useCase.execute(req.params.id);
    res.status(200).json({
      success: true,
      data: await this.workflowSerializer.serializeWorkflow(workflow),
    });
  }

  public async updateWorkflow(req: Request, res: Response) {
    const useCase = new UpdateWorkflow(this.workflowRepository);
    const workflow = await useCase.execute(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: await this.workflowSerializer.serializeWorkflow(workflow),
    });
  }
}
