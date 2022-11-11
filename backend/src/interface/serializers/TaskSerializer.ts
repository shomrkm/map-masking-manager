import { Task } from '@/domain/Task';

const serializeSingleTask = (task: Task) => {
  return {
    _id: task.id,
    id: task.no,
    title: task.title.toPrimitive(),
    description: task.description.toPrimitive(),
    detail: task.detail,
    area: task.area,
    status: task.status.toPrimitive(),
    target: task.target.toPrimitive(),
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
  public serializeTask(task: Task) {
    return serializeSingleTask(task);
  }
  public serializeTasks(tasks: Task[]) {
    return tasks.map(serializeSingleTask);
  }
}
