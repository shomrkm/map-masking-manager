import { Workflow } from '@/domain/entities';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';

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
  constructor(private readonly userRepository: UserRepository) {}

  public async serializeWorkflow(workflow: Workflow) {
    const wf = serializeSingleWorkflow(workflow);
    const user = await this.userRepository.find(workflow.createUser);
    return {
      ...wf,
      createUser: {
        _id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
    };
  }

  public async serializeWorkflows(workflows: Workflow[]) {
    return await Promise.all(workflows.map((w) => this.serializeWorkflow(w)));
  }
}
