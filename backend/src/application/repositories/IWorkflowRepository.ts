import { Workflow } from '@/domain/Workflow';

export interface IWorkflowRepository {
  findAll(): Promise<Workflow[]>;
  find(id: string): Promise<Workflow>;
  save(workflow: Workflow): Promise<Workflow>;
  // delete(workflowId: string): Promise<Workflow>;
}
