import { Task } from '@/domain/Task';
import { ErrorResponse } from '@/interface/controller/errorResponse';
import { ITaskRepository } from '../../repositories/ITaskRepository';

export class DeleteTask {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  public async execute(taskId: string): Promise<Task> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }

    // TODO: Remove prev/next id from related tasks.
    // if (task.next.length) {
    //   task.next.forEach(async (nextId) => {
    //     const nextTask = await this.taskRepository.findById(nextId);
    //     if (!nextTask) {
    //       throw new ErrorResponse(`Task was not found with id of ${nextId}`, 404);
    //     }
    //     nextTask.removePreviousTask(taskId);
    //     await this.taskRepository.save(nextTask);
    //   });
    // }
    // if (task.previous.length) {
    //   task.previous.forEach(async (prevId) => {
    //     const prevTask = await this.taskRepository.findById(prevId);
    //     if (!prevTask) {
    //       throw new ErrorResponse(`Task was not found with id of ${prevId}`, 404);
    //     }
    //     prevTask.removeNextTask(taskId);
    //     console.log(prevTask);
    //     await this.taskRepository.save(prevTask);
    //   });
    // }

    return await this.taskRepository.delete(taskId);
  }
}
