import { Task, Comment } from '@/domain/entities';
import {
  Title,
  Description,
  TaskStatus,
  Priority,
  Level,
  Targets,
  targetTypes,
  Text,
} from '@/domain/ValueObjects';
import { ITaskRepository } from '@/application/repositories/ITaskRepository';
import { IDBConnection } from '../database/IDBConnection';
import { CreateTaskDTO } from '../database/dto';

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
          status: new TaskStatus(taskDto.status),
          priority: new Priority(taskDto.priority),
          target: new Targets(taskDto.target, targetTypes),
          level: new Level(taskDto.level),
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
      status: new TaskStatus(taskDto.status),
      priority: new Priority(taskDto.priority),
      target: new Targets(taskDto.target, targetTypes),
      level: new Level(taskDto.level),
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
          status: new TaskStatus(taskDto.status),
          priority: new Priority(taskDto.priority),
          target: new Targets(taskDto.target, targetTypes),
          level: new Level(taskDto.level),
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
    const taskDto = task.toPrimitive();
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
      status: new TaskStatus(taskDto.status),
      priority: new Priority(updatedTask.priority),
      target: new Targets(taskDto.target, targetTypes),
      level: new Level(updatedTask.level),
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
      status: new TaskStatus(taskDto.status),
      priority: new Priority(taskDto.priority),
      target: new Targets(taskDto.target, targetTypes),
      level: new Level(taskDto.level),
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
          text: new Text(comment.text),
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
      text: new Text(commentDto.text),
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
          text: new Text(comment.text),
          id: comment._id,
          createdAt: comment.createdAt,
        })
    );
    return comments;
  }

  public async addComment(comment: Comment): Promise<Comment> {
    const { _id } = await this.dbConnection.addComment(comment.toPrimitive());
    comment.id = _id;
    return comment;
  }
}
