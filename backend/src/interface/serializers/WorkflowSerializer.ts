import { Workflow } from '@/domain/Workflow';

const serializeSingleWorkflow = (workflow: Workflow) => {
  return {
    _id: workflow.id,
    id: workflow.no,
    title: workflow.title,
    description: workflow.description,
    status: workflow.status,
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
