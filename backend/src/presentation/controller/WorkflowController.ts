import { Request, Response } from 'express';
import { buildPaginationData } from '@/shared/core/utils/buildPaginationData';
import { IWorkflowRepository } from '@/application/repositories/IWorkflowRepository';
import {
  SearchAllWorkflows,
  SearchWorkflow,
  CreateWorkflow,
  DeleteWorkflow,
  UpdateWorkflow,
} from '@/application/usecases/Workflow';
import { WorkflowRepository } from '@/infrastructure/repositories/WorkflowRepository';
import { WorkflowSerializer } from '../serializers/WorkflowSerializer';

export class WorkflowController {
  constructor(
    private readonly workflowRepository = new WorkflowRepository(),
    private readonly workflowSerializer = new WorkflowSerializer()
  ) {}

  public async getWorkflows(req: Request, res: Response) {
    const searchAllWorkflows = new SearchAllWorkflows(this.workflowRepository);
    const tasks = await searchAllWorkflows.execute();
    const { count, pagination, data } = buildPaginationData(req, tasks);
    res.status(200).json({
      success: true,
      count,
      pagination,
      data: this.workflowSerializer.serializeWorkflows(data),
    });
  }

  public async getWorkflow(req: Request, res: Response) {
    const searchWorkflow = new SearchWorkflow(this.workflowRepository);
    const workflow = await searchWorkflow.execute(req.params.id);
    res.status(200).json({
      success: true,
      data: this.workflowSerializer.serializeWorkflow(workflow),
    });
  }

  public async createWorkflow(req: Request, res: Response) {
    req.body.createUser = req.user.id;
    const { title, description, status, createUser } = req.body;

    const useCase = new CreateWorkflow(this.workflowRepository);
    const newWorkflow = await useCase.execute(title, description, status, createUser);
    // TODO: Return user in response data like below
    // {
    //   _id: "aaa",
    //   id: 10,
    //   title "title",
    //   description: "desc",
    //   user: {
    //     _id: "abc",
    //     name: "Shotaro Murakami",
    //     avatar: "/image/avatar.png",
    //   }
    // }
    res.status(201).json({
      success: true,
      data: this.workflowSerializer.serializeWorkflow(newWorkflow),
    });
  }

  public async deleteWorkflow(req: Request, res: Response) {
    const useCase = new DeleteWorkflow(this.workflowRepository);
    const workflow = await useCase.execute(req.params.id);
    res.status(200).json({
      success: true,
      data: this.workflowSerializer.serializeWorkflow(workflow),
    });
  }

  public async updateWorkflow(req: Request, res: Response) {
    const useCase = new UpdateWorkflow(this.workflowRepository);
    const workflow = await useCase.execute(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: this.workflowSerializer.serializeWorkflow(workflow),
    });
  }
}
