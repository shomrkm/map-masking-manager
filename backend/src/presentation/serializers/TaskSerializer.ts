import { Task } from '@/domain/entities';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';

const serializeSingleTask = (task: Task) => {
  return {
    _id: task.id,
    id: task.no,
    title: task.title.toPrimitive(),
    description: task.description.toPrimitive(),
    detail: task.detail,
    area: task.area,
    status: task.status.toPrimitive(),
    targets: task.target.toPrimitive(),
    previous: task.previous,
    next: task.next,
    workflow: task.workflow,
    priority: task.priority.toPrimitive(),
    level: task.level.toPrimitive(),
    createUser: task.createUser,
    assignedUsers: task.assignedUsers,
    createdAt: task.createdAt,
  };
};

export class TaskSerializer {
  constructor(private readonly userRepository: UserRepository) {}

  public async serializeTask(task: Task) {
    const t = serializeSingleTask(task);
    const createUser = await this.userRepository.find(t.createUser);
    const assignedUsers = await Promise.all(
      t.assignedUsers.map(async (u) => await this.userRepository.find(u))
    );
    return {
      ...t,
      createUser: {
        _id: createUser.id,
        name: createUser.name,
        avatar: createUser.avatar,
      },
      assignedUsers: assignedUsers.map((u) => ({
        _id: u.id,
        name: u.name,
        avatar: u.avatar,
      })),
    };
  }
  public async serializeTasks(tasks: Task[]) {
    return await Promise.all(tasks.map((t) => this.serializeTask(t)));
  }
}
