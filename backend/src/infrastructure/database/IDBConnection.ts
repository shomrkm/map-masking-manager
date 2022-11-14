import { TaskDTO, CreateTaskDTO, UpdateTaskDTO, OptionalTaskDTO } from './dto/taskDto';
import { WorkflowDTO, CreateWorkflowDTO, UpdateWorkflowDTO } from './dto/workflowDto';
import { CommentDTO, CreateCommentDTO } from './dto/commentDto';
import { UserDTO } from './dto/userDto';

export interface IDBConnection {
  // Queries for User Models
  findUserById(userId: string): Promise<UserDTO>;
}
