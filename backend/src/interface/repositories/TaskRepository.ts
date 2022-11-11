import { Task, Title, Description } from '@/domain/Task';
import { Comment } from '@/domain/Comment';
import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { IDBConnection } from '../database/IDBConnection';

export class TaskRepository implements ITaskRepository {
  private dbConnection: IDBConnection;
  constructor(dbConnection: IDBConnection) {
    this.dbConnection = dbConnection;
  }

  public async findAll(): Promise<Task[]> {
    const taskDtos = await this.dbConnection.findAllTasks();
    const tasks = taskDtos.map(
      (taskDto) =>
        new Task({
          title: new Title(taskDto.title),
          description: new Description(taskDto.description),
          workflow: taskDto.workflow,
          status: taskDto.status,
          priority: taskDto.priority,
          target: taskDto.target,
          level: taskDto.level,
          createUser: taskDto.createUser,
          detail: taskDto.detail,
          area: taskDto.area,
          previous: taskDto.previous,
          next: taskDto.next,
          assignedUsers: taskDto.assignedUsers,
          id: taskDto._id,
          no: taskDto.id,
          createdAt: taskDto.createdAt,
        })
    );

    return tasks;
  }

  public async findById(id: string): Promise<Task> {
    const taskDto = await this.dbConnection.findTaskById(id);
    const task = new Task({
      title: new Title(taskDto.title),
      description: new Description(taskDto.description),
      workflow: taskDto.workflow,
      status: taskDto.status,
      priority: taskDto.priority,
      target: taskDto.target,
      level: taskDto.level,
      createUser: taskDto.createUser,
      detail: taskDto.detail,
      area: taskDto.area,
      previous: taskDto.previous,
      next: taskDto.next,
      assignedUsers: taskDto.assignedUsers,
      id: taskDto._id,
      no: taskDto.id,
      createdAt: taskDto.createdAt,
    });

    return task;
  }

  public async findByWorkflowId(workflowId: string): Promise<Task[]> {
    const taskDtos = await this.dbConnection.findTasks({ workflow: workflowId });
    const tasks = taskDtos.map(
      (taskDto) =>
        new Task({
          title: new Title(taskDto.title),
          description: new Description(taskDto.description),
          workflow: taskDto.workflow,
          status: taskDto.status,
          priority: taskDto.priority,
          target: taskDto.target,
          level: taskDto.level,
          createUser: taskDto.createUser,
          detail: taskDto.detail,
          area: taskDto.area,
          previous: taskDto.previous,
          next: taskDto.next,
          assignedUsers: taskDto.assignedUsers,
          id: taskDto._id,
          no: taskDto.id,
          createdAt: taskDto.createdAt,
        })
    );
    return tasks;
  }

  public async save(task: Task): Promise<Task> {
    const taskDto = {
      title: task.title.toPrimitive(),
      description: task.description.toPrimitive(),
      detail: task.detail,
      area: task.area ?? undefined,
      status: task.status,
      workflow: task.workflow,
      target: task.target,
      previous: task.previous,
      next: task.next,
      level: task.level,
      priority: task.priority,
      createUser: task.createUser,
      createdAt: task.createdAt.toDate(),
    };
    if (!task.id) {
      const { _id, id } = await this.dbConnection.createTask(taskDto);
      task.id = _id;
      task.no = id;
      return task;
    }

    const updatedTask = await this.dbConnection.updateTask(task.id, taskDto);
    return new Task({
      title: new Title(updatedTask.title),
      description: new Description(updatedTask.description),
      workflow: updatedTask.workflow,
      status: taskDto.status,
      priority: updatedTask.priority,
      target: updatedTask.target,
      level: updatedTask.level,
      createUser: updatedTask.createUser,
      detail: updatedTask.detail,
      area: updatedTask.area,
      previous: updatedTask.previous,
      next: updatedTask.next,
      assignedUsers: updatedTask.assignedUsers,
      id: updatedTask._id,
      no: updatedTask.id,
      createdAt: updatedTask.createdAt,
    });
  }

  public async delete(taskId: string): Promise<Task> {
    const taskDto = await this.dbConnection.deleteTask(taskId);
    const task = new Task({
      title: new Title(taskDto.title),
      description: new Description(taskDto.description),
      workflow: taskDto.workflow,
      status: taskDto.status,
      priority: taskDto.priority,
      target: taskDto.target,
      level: taskDto.level,
      createUser: taskDto.createUser,
      detail: taskDto.detail,
      area: taskDto.area,
      previous: taskDto.previous,
      next: taskDto.next,
      assignedUsers: taskDto.assignedUsers,
      id: taskDto._id,
      no: taskDto.id,
      createdAt: taskDto.createdAt,
    });

    return task;
  }

  public async findAllComments(): Promise<Comment[]> {
    const commentDtos = await this.dbConnection.findAllComments();
    const comments = commentDtos.map(
      (comment) =>
        new Comment({
          task: comment.task,
          user: comment.user,
          text: comment.text,
          id: comment._id,
          createdAt: comment.createdAt,
        })
    );
    return comments;
  }

  public async findCommentById(id: string): Promise<Comment> {
    const commentDto = await this.dbConnection.findCommentById(id);
    const comment = new Comment({
      task: commentDto.task,
      user: commentDto.user,
      text: commentDto.text,
      id: commentDto._id,
      createdAt: commentDto.createdAt,
    });
    return comment;
  }

  public async findComments(taskId: string): Promise<Comment[]> {
    const commentDtos = await this.dbConnection.findCommentsByTaskId(taskId);
    const comments = commentDtos.map(
      (comment) =>
        new Comment({
          task: comment.task,
          user: comment.user,
          text: comment.text,
          id: comment._id,
          createdAt: comment.createdAt,
        })
    );
    return comments;
  }

  public async addComment(taskId: string, comment: Comment): Promise<Comment> {
    const commentDto = {
      task: taskId,
      user: comment.user,
      text: comment.text,
      createdAt: comment.createdAt.toDate(),
    };
    const newComment = await this.dbConnection.addComment(commentDto);
    // TODO: Check if task exists.
    return new Comment({
      id: newComment._id,
      task: newComment.task,
      user: newComment.user,
      text: newComment.text,
      createdAt: comment.createdAt.toDate(),
    });
  }
}
