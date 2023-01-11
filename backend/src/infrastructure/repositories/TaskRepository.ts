import { ErrorResponse } from '@/shared/core/utils';
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

import { Task as TaskModel, Comment as CommentModel, UserFields } from '../mongoose/models';

export class TaskRepository implements ITaskRepository {
  public async findAll(): Promise<Task[]> {
    const taskDocs = await TaskModel.find();
    const tasks = taskDocs.map(
      (taskDto) =>
        new Task({
          title: new Title(taskDto.title),
          description: new Description(taskDto.description),
          workflow: taskDto.workflow.toString(),
          status: new TaskStatus(taskDto.status),
          priority: new Priority(taskDto.priority),
          target: new Targets(taskDto.target, targetTypes),
          level: new Level(taskDto.level),
          createUser: taskDto.createUser.toString(),
          detail: taskDto.detail,
          area: taskDto.area,
          previous: taskDto.previous.map((t) => t.toString()),
          next: taskDto.next.map((t) => t.toString()),
          assignedUsers: taskDto.assignedUsers.map((user) => user.toString()),
          id: taskDto._id.toString(),
          no: taskDto.id,
          createdAt: new Date(taskDto.createdAt.toString()),
        })
    );

    return tasks;
  }

  public async findById(id: string): Promise<Task> {
    const taskDoc = await TaskModel.findById(id);
    if (!taskDoc) {
      throw new ErrorResponse(`Task was not found with id of ${id}`, 404);
    }
    const task = new Task({
      title: new Title(taskDoc.title),
      description: new Description(taskDoc.description),
      workflow: taskDoc.workflow.toString(),
      status: new TaskStatus(taskDoc.status),
      priority: new Priority(taskDoc.priority),
      target: new Targets(taskDoc.target, targetTypes),
      level: new Level(taskDoc.level),
      createUser: taskDoc.createUser.toString(),
      detail: taskDoc.detail,
      area: taskDoc.area,
      previous: taskDoc.previous.map((t) => t.toString()),
      next: taskDoc.next.map((t) => t.toString()),
      assignedUsers: taskDoc.assignedUsers.map((user) => user.toString()),
      id: taskDoc._id.toString(),
      no: taskDoc.id,
      createdAt: new Date(taskDoc.createdAt.toString()),
    });

    return task;
  }

  public async findByWorkflowId(workflowId: string): Promise<Task[]> {
    const taskDocs = await TaskModel.find({ workflow: workflowId });
    const tasks = taskDocs.map(
      (task) =>
        new Task({
          title: new Title(task.title),
          description: new Description(task.description),
          workflow: task.workflow.toString(),
          status: new TaskStatus(task.status),
          priority: new Priority(task.priority),
          target: new Targets(task.target, targetTypes),
          level: new Level(task.level),
          createUser: task.createUser.toString(),
          detail: task.detail,
          area: task.area,
          previous: task.previous.map((t) => t.toString()),
          next: task.next.map((t) => t.toString()),
          assignedUsers: task.assignedUsers.map((user) => user.toString()),
          id: task._id.toString(),
          no: task.id,
          createdAt: new Date(task.createdAt.toString()),
        })
    );
    return tasks;
  }

  public async save(task: Task): Promise<Task> {
    const taskDto = task.toPrimitive();
    if (!task.id) {
      const newTask = await TaskModel.create(taskDto);
      if (!newTask) {
        throw new ErrorResponse('CreatingTask Failed', 400);
      }
      task.id = newTask._id.toString();
      task.no = newTask.id;
      return task;
    }

    if (!(await TaskModel.findById(task.id))) {
      throw new ErrorResponse(`Task was not found with id of ${task.id}`, 404);
    }
    const updatedTask = await TaskModel.findOneAndUpdate({ _id: task.id }, taskDto, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      throw new ErrorResponse(`Failed to update task with id of ${task.id}`, 400);
    }
    return new Task({
      title: new Title(updatedTask.title),
      description: new Description(updatedTask.description),
      workflow: updatedTask.workflow.toString(),
      status: new TaskStatus(taskDto.status),
      priority: new Priority(updatedTask.priority),
      target: new Targets(taskDto.target, targetTypes),
      level: new Level(updatedTask.level),
      createUser: updatedTask.createUser.toString(),
      detail: updatedTask.detail,
      area: updatedTask.area,
      previous: updatedTask.previous.map((t) => t.toString()),
      next: updatedTask.next.map((t) => t.toString()),
      assignedUsers: updatedTask.assignedUsers.map((u) => u.toString()),
      id: updatedTask._id.toString(),
      no: updatedTask.id,
      createdAt: new Date(updatedTask.createdAt.toString()),
    });
  }

  public async delete(taskId: string): Promise<Task> {
    const task = await TaskModel.findById(taskId);
    if (!task) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }
    const deletedTask = new Task({
      title: new Title(task.title),
      description: new Description(task.description),
      workflow: task.workflow.toString(),
      status: new TaskStatus(task.status),
      priority: new Priority(task.priority),
      target: new Targets(task.target, targetTypes),
      level: new Level(task.level),
      createUser: task.createUser.toString(),
      detail: task.detail,
      area: task.area,
      previous: task.previous.map((t) => t.toString()),
      next: task.next.map((t) => t.toString()),
      assignedUsers: task.assignedUsers.map((u) => u.toString()),
      id: task._id.toString(),
      no: task.id,
      createdAt: new Date(task.createdAt.toString()),
    });
    await task.remove();

    return deletedTask;
  }

  public async findAllComments(): Promise<Comment[]> {
    // TODO: Modify generics for populate.
    const commentDocs = await CommentModel.find().populate<{ user: string }>({
      path: 'user',
      select: 'name avatar',
    });
    const comments = commentDocs.map(
      (comment) =>
        new Comment({
          task: comment.task.toString(),
          user: comment.user,
          text: new Text(comment.text),
          id: comment._id.toString(),
          createdAt: new Date(comment.createdAt.toString()),
        })
    );

    return comments;
  }

  public async findCommentById(id: string): Promise<Comment> {
    // TODO: Modify generics for populate.
    const commentDoc = await CommentModel.findById(id).populate<{ user: string }>({
      path: 'user',
      select: 'name avatar',
    });
    if (!commentDoc) {
      throw new ErrorResponse(`Comment was not found with id of ${id}`, 404);
    }

    return new Comment({
      task: commentDoc.task.toString(),
      user: commentDoc.user,
      text: new Text(commentDoc.text),
      id: commentDoc._id.toString(),
      createdAt: new Date(commentDoc.createdAt.toString()),
    });
  }

  public async findComments(taskId: string): Promise<Comment[]> {
    if (!(await TaskModel.findById(taskId))) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }

    // TODO: Modify generics for populate.
    const commentDocs = await CommentModel.find({ task: taskId }).populate<{ user: string }>({
      path: 'user',
      select: 'name avatar',
    });
    const comments = commentDocs.map(
      (comment) =>
        new Comment({
          task: comment.task.toString(),
          user: comment.user,
          text: new Text(comment.text),
          id: comment._id.toString(),
          createdAt: new Date(comment.createdAt.toString()),
        })
    );
    return comments;
  }

  public async addComment(comment: Comment): Promise<Comment> {
    const newComment = await CommentModel.create(comment.toPrimitive());
    if (!newComment) {
      throw new ErrorResponse('Creating Comment Failed', 400);
    }
    comment.id = newComment._id.toString();
    return comment;
  }
}
