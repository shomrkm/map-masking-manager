import { TaskDTO, CreateTaskDTO, UpdateTaskDTO } from './dto/taskDto';
import { WorkflowDTO, CreateWorkflowDTO, UpdateWorkflowDTO } from './dto/workflowDto';

export interface IDBConnection {
  // Queries for Task Models
  findAllTasks(): Promise<TaskDTO[]>;
  findTasksByWorkflowId(workflowId: string): Promise<TaskDTO[]>;
  findTaskById(taskId: string): Promise<TaskDTO>;
  createTask(task: CreateTaskDTO): Promise<TaskDTO>;
  deleteTask(taskId: string): Promise<TaskDTO>;
  updateTask(taskId: string, values: UpdateTaskDTO): Promise<TaskDTO>;

  // Queries for Workflow Models
  findAllWorkflows(): Promise<WorkflowDTO[]>;
  findWorkflowById(workflowId: string): Promise<WorkflowDTO>;
  createWorkflow(workflow: CreateWorkflowDTO): Promise<WorkflowDTO>;
  deleteWorkflow(workflowId: string): Promise<WorkflowDTO>;
  updateWorkflow(workflowId: string, values: UpdateWorkflowDTO): Promise<WorkflowDTO>;
}
