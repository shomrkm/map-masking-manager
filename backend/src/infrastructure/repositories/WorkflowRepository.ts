import { ErrorResponse } from '@/shared/core/utils';
import { Workflow } from '@/domain/entities';
import { Title, Description, WorkflowStatus } from '@/domain/ValueObjects';
import { IWorkflowRepository } from '@/application/repositories/IWorkflowRepository';

import { Workflow as WorkflowModel } from '../mongoose/models';

export class WorkflowRepository implements IWorkflowRepository {
  public async findAll(): Promise<Workflow[]> {
    const workflowDocs = await WorkflowModel.find();
    const workflows = workflowDocs.map(
      (workflow) =>
        new Workflow({
          title: new Title(workflow.title),
          description: new Description(workflow.description),
          status: new WorkflowStatus(workflow.status),
          createUser: workflow.createUser.toString(),
          id: workflow._id.toString(),
          no: workflow.id,
          createdAt: new Date(workflow.createdAt.toString()),
        })
    );

    return workflows;
  }

  public async find(id: string): Promise<Workflow> {
    const workflowDoc = await WorkflowModel.findById(id);
    if (!workflowDoc) {
      throw new ErrorResponse(`Workflow was not found with id of ${id}`, 404);
    }
    const workflow = new Workflow({
      title: new Title(workflowDoc.title),
      description: new Description(workflowDoc.description),
      status: new WorkflowStatus(workflowDoc.status),
      createUser: workflowDoc.createUser.toString(),
      id: workflowDoc._id.toString(),
      no: workflowDoc.id,
      createdAt: new Date(workflowDoc.createdAt.toString()),
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
      workflow.id = newWorkflow._id.toString();
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
    if (!updatedWorkflow) {
      throw new ErrorResponse(`Failed to update task with id of ${workflow.id}`, 400);
    }
    return new Workflow({
      title: new Title(updatedWorkflow.title),
      description: new Description(updatedWorkflow.description),
      status: new WorkflowStatus(updatedWorkflow.status),
      createUser: updatedWorkflow.createUser.toString(),
      id: updatedWorkflow._id.toString(),
      no: updatedWorkflow.id,
      createdAt: new Date(updatedWorkflow.createdAt.toString()),
    });
  }

  public async delete(workflowId: string): Promise<Workflow> {
    const workflowDto = await WorkflowModel.findById(workflowId);
    if (!workflowDto) {
      throw new ErrorResponse(`Workflow was not found with id of ${workflowId}`, 404);
    }
    const deletedWorkflow = new Workflow({
      title: new Title(workflowDto.title),
      description: new Description(workflowDto.description),
      status: new WorkflowStatus(workflowDto.status),
      createUser: workflowDto.createUser.toString(),
      id: workflowDto._id.toString(),
      no: workflowDto.id,
      createdAt: new Date(workflowDto.createdAt.toString()),
    });
    await workflowDto.remove();

    return deletedWorkflow;
  }
}
