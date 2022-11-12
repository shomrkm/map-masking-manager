import { Workflow } from '@/domain/Workflow';

const serializeSingleWorkflow = (workflow: Workflow) => {
  return {
    _id: workflow.id,
    id: workflow.no,
    title: workflow.title.toPrimitive(),
    description: workflow.description.toPrimitive(),
    status: workflow.status.toPrimitive(),
    createUser: workflow.createUser,
    createdAt: workflow.createdAt,
  };
};

export class WorkflowSerializer {
  public serializeWorkflow(workflow: Workflow) {
    return serializeSingleWorkflow(workflow);
  }
  public serializeWorkflows(workflows: Workflow[]) {
    return workflows.map(serializeSingleWorkflow);
  }
}
