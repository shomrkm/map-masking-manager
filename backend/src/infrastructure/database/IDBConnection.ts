import { TaskDTO, CreateTaskDTO, UpdateTaskDTO, OptionalTaskDTO } from './dto/taskDto';
import { WorkflowDTO, CreateWorkflowDTO, UpdateWorkflowDTO } from './dto/workflowDto';
import { CommentDTO, CreateCommentDTO } from './dto/commentDto';
import { UserDTO } from './dto/userDto';

export interface IDBConnection {
  // Queries for Workflow Models
  findAllWorkflows(): Promise<WorkflowDTO[]>;
  findWorkflowById(workflowId: string): Promise<WorkflowDTO>;
  createWorkflow(workflow: CreateWorkflowDTO): Promise<WorkflowDTO>;
  deleteWorkflow(workflowId: string): Promise<WorkflowDTO>;
  updateWorkflow(workflowId: string, values: UpdateWorkflowDTO): Promise<WorkflowDTO>;

  // Queries for User Models
  findAllUsers(): Promise<UserDTO[]>;
  findUserById(userId: string): Promise<UserDTO>;
}
