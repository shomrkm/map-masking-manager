import { Task } from '@/domain/Task';

const serializeSingleTask = (task: Task) => {
  return {
    _id: task.id,
    id: task.no,
    title: task.description,
    description: task.description,
    detail: task.detail,
    area: task.area,
    status: task.status,
    target: task.target,
    previous: task.previous,
    next: task.next,
    workflow: task.workflowId,
    level: task.level,
    createUser: task.createdUserId,
    assinedUsers: task.assinedUserIds,
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
