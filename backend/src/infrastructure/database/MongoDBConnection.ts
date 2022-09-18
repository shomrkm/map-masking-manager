import { Task as TaskModel, Workflow as WorkflowModel } from './models';
import { IDBConnection } from '@/interface/database/IDBConnection';
import { TaskDTO, CreateTaskDTO, UpdateTaskDTO } from '@/interface/database/dto/taskDto';
import {
  WorkflowDTO,
  CreateWorkflowDTO,
  UpdateWorkflowDTO,
} from '@/interface/database/dto/workflowDto';
import { ErrorResponse } from '@/interface/controller/errorResponse';

export class MongoDBConnection implements IDBConnection {
  public async findAllTasks(): Promise<TaskDTO[]> {
    const tasks: TaskDTO[] = await TaskModel.find()
      .populate({ path: 'createUser', select: 'name avatar' })
      .populate({ path: 'assignedUsers', select: 'name avatar' });
    return tasks;
  }

  public async findTasksByWorkflowId(workflowId: string): Promise<TaskDTO[]> {
    const tasks: TaskDTO[] = await TaskModel.find({ workflow: workflowId })
      .populate({ path: 'createUser', select: 'name avatar' })
      .populate({ path: 'assignedUsers', select: 'name avatar' });
    return tasks;
  }

  public async findTaskById(taskId: string): Promise<TaskDTO> {
    const task: TaskDTO | null = await TaskModel.findById(taskId)
      .populate({ path: 'createUser', select: 'name avatar' })
      .populate({ path: 'assignedUsers', select: 'name avatar' });
    if (!task) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }
    return task;
  }

  public async createTask(task: CreateTaskDTO): Promise<TaskDTO> {
    const newTask = await TaskModel.create(task);
    if (!newTask) {
      throw new ErrorResponse('CreatingTask Failed', 400);
    }
    return newTask as any;
  }

  public async deleteTask(taskId: string): Promise<TaskDTO> {
    const task = await TaskModel.findById(taskId);
    if (!task) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }
    task.remove();
    return task as any;
  }

  public async updateTask(taskId: string, values: UpdateTaskDTO): Promise<TaskDTO> {
    if (!(await TaskModel.findById(taskId))) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }
    const task = await TaskModel.findOneAndUpdate({ _id: taskId }, values, {
      new: true,
      runValidators: true,
    });
    return task as any;
  }

  public async findAllWorkflows(): Promise<WorkflowDTO[]> {
    const tasks: WorkflowDTO[] = await WorkflowModel.find().populate({
      path: 'createUser',
      select: 'name avatar',
    });
    return tasks;
  }

  public async findWorkflowById(workflowId: string): Promise<WorkflowDTO> {
    const workflow: WorkflowDTO | null = await WorkflowModel.findById(workflowId).populate({
      path: 'createUser',
      select: 'name avatar',
    });
    if (!workflow) {
      throw new ErrorResponse(`Workflow was not found with id of ${workflowId}`, 404);
    }
    return workflow;
  }

  public async createWorkflow(workflow: CreateWorkflowDTO): Promise<WorkflowDTO> {
    const newWorkflow = await WorkflowModel.create(workflow);
    if (!newWorkflow) {
      throw new ErrorResponse('Creating Workflow Failed', 400);
    }
    return newWorkflow as any;
  }

  public async deleteWorkflow(workflowId: string): Promise<WorkflowDTO> {
    const workflow = await WorkflowModel.findById(workflowId);
    if (!workflow) {
      throw new ErrorResponse(`Workflow was not found with id of ${workflowId}`, 404);
    }
    workflow.remove();
    return workflow as any;
  }

  public async updateWorkflow(workflowId: string, values: UpdateWorkflowDTO): Promise<WorkflowDTO> {
    if (!(await WorkflowModel.findById(workflowId))) {
      throw new ErrorResponse(`Workflow was not found with id of ${workflowId}`, 404);
    }
    const workflow = await WorkflowModel.findOneAndUpdate({ _id: workflowId }, values, {
      new: true,
      runValidators: true,
    });
    return workflow as any;
  }
}
