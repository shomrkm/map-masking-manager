import { ErrorResponse } from '@/shared/core/utils';
import { Workflow } from '@/domain/entities';
import { Title, Description, WorkflowStatus } from '@/domain/ValueObjects';
import { IDBConnection } from '../database/IDBConnection';
import { IWorkflowRepository } from '@/application/repositories/IWorkflowRepository';
import { Workflow as WorkflowModel } from '../mongoose/models';
import { WorkflowDTO } from '../database/dto';

export class WorkflowRepository implements IWorkflowRepository {
  private dbConnection: IDBConnection;
  constructor(dbConnection: IDBConnection) {
    this.dbConnection = dbConnection;
  }

  public async findAll(): Promise<Workflow[]> {
    const workflowDtos: WorkflowDTO[] = await WorkflowModel.find().populate({
      path: 'createUser',
      select: 'name avatar',
    });
    const workflows = workflowDtos.map(
      (workflowDto) =>
        new Workflow({
          title: new Title(workflowDto.title),
          description: new Description(workflowDto.description),
          status: new WorkflowStatus(workflowDto.status),
          createUser: workflowDto.createUser,
          id: workflowDto._id,
          no: workflowDto.id,
          createdAt: workflowDto.createdAt,
        })
    );

    return workflows;
  }

  public async find(id: string): Promise<Workflow> {
    const workflowDto: WorkflowDTO | null = await WorkflowModel.findById(id).populate({
      path: 'createUser',
      select: 'name avatar',
    });
    if (!workflowDto) {
      throw new ErrorResponse(`Workflow was not found with id of ${id}`, 404);
    }
    const workflow = new Workflow({
      title: new Title(workflowDto.title),
      description: new Description(workflowDto.description),
      status: new WorkflowStatus(workflowDto.status),
      createUser: workflowDto.createUser,
      id: workflowDto._id,
      no: workflowDto.id,
      createdAt: workflowDto.createdAt,
    });

    return workflow;
  }

  public async save(workflow: Workflow): Promise<Workflow> {
    const workflowDto = workflow.toPrimitive();
    if (!workflow.id) {
      const newWorkflow = await WorkflowModel.create(workflowDto);
      if (!newWorkflow) {
        throw new ErrorResponse('Creating Workflow Failed', 400);
      }
      workflow.id = newWorkflow._id;
      workflow.no = newWorkflow.id;
      return workflow;
    }

    if (!(await WorkflowModel.findById(workflow.id))) {
      throw new ErrorResponse(`Workflow was not found with id of ${workflow.id}`, 404);
    }
    const updatedWorkflow = await WorkflowModel.findOneAndUpdate(
      { _id: workflow.id },
      workflowDto,
      {
        new: true,
        runValidators: true,
      }
    );
    return new Workflow({
      title: new Title(updatedWorkflow.title),
      description: new Description(updatedWorkflow.description),
      status: new WorkflowStatus(updatedWorkflow.status),
      createUser: updatedWorkflow.createUser,
      id: updatedWorkflow._id,
      no: updatedWorkflow.id,
      createdAt: updatedWorkflow.createdAt,
    });
  }

  public async delete(workflowId: string): Promise<Workflow> {
    const workflowDto = await this.dbConnection.deleteWorkflow(workflowId);
    const workflow = new Workflow({
      title: new Title(workflowDto.title),
      description: new Description(workflowDto.description),
      status: new WorkflowStatus(workflowDto.status),
      createUser: workflowDto.createUser,
      id: workflowDto._id,
      no: workflowDto.id,
      createdAt: workflowDto.createdAt,
    });

    return workflow;
  }
}
