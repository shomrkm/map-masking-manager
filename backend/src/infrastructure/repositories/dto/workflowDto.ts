import { WorkflowStatusType } from '@/domain/ValueObjects';

export type WorkflowDTO = {
  _id: string;
  id: number;
  title: string;
  description: string;
  status: WorkflowStatusType;
  createUser: string;
  createdAt: Date;
};

export type CreateWorkflowDTO = Omit<WorkflowDTO, '_id' | 'id'>;
export type UpdateWorkflowDTO = Partial<CreateWorkflowDTO>;
