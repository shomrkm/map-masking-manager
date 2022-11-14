import { TaskDTO, CreateTaskDTO, UpdateTaskDTO, OptionalTaskDTO } from './dto/taskDto';
import { WorkflowDTO, CreateWorkflowDTO, UpdateWorkflowDTO } from './dto/workflowDto';
import { CommentDTO, CreateCommentDTO } from './dto/commentDto';
import { UserDTO } from './dto/userDto';

export interface IDBConnection {
  // Queries for Task Models
  findTasks(values: OptionalTaskDTO): Promise<TaskDTO[]>;
  createTask(task: CreateTaskDTO): Promise<TaskDTO>;
  deleteTask(taskId: string): Promise<TaskDTO>;
  updateTask(taskId: string, values: UpdateTaskDTO): Promise<TaskDTO>;

  // Queries for Workflow Models
  findAllWorkflows(): Promise<WorkflowDTO[]>;
  findWorkflowById(workflowId: string): Promise<WorkflowDTO>;
  createWorkflow(workflow: CreateWorkflowDTO): Promise<WorkflowDTO>;
  deleteWorkflow(workflowId: string): Promise<WorkflowDTO>;
  updateWorkflow(workflowId: string, values: UpdateWorkflowDTO): Promise<WorkflowDTO>;

  // Queries for Comment Models
  findAllComments(): Promise<CommentDTO[]>;
  findCommentById(commentId: string): Promise<CommentDTO>;
  findCommentsByTaskId(taskId: string): Promise<CommentDTO[]>;
  addComment(comment: CreateCommentDTO): Promise<CommentDTO>;

  // Queries for User Models
  findAllUsers(): Promise<UserDTO[]>;
  findUserById(userId: string): Promise<UserDTO>;
}
