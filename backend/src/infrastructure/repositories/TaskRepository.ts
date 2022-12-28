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
import { CommentDTO } from './dto';

export class TaskRepository implements ITaskRepository {
  public async findAll(): Promise<Task[]> {
    // TODO: Modify generics for populate.
    const taskDtos = await TaskModel.find()
      .populate<{ createUser: string }>({ path: 'createUser', select: 'name avatar' })
      .populate<{ assignedUsers: string[] }>({ path: 'assignedUsers', select: 'name avatar' });

    const tasks = taskDtos.map(
      (taskDto) =>
        new Task({
          title: new Title(taskDto.title),
          description: new Description(taskDto.description),
          workflow: taskDto.workflow.toString(),
          status: new TaskStatus(taskDto.status),
          priority: new Priority(taskDto.priority),
          target: new Targets(taskDto.target, targetTypes),
          level: new Level(taskDto.level),
          createUser: taskDto.createUser,
          detail: taskDto.detail,
          area: taskDto.area,
          previous: taskDto.previous.map((t) => t.toString()),
          next: taskDto.next.map((t) => t.toString()),
          assignedUsers: taskDto.assignedUsers,
          id: taskDto._id.toString(),
          no: taskDto.id,
          createdAt: new Date(taskDto.createdAt.toString()),
        })
    );

    return tasks;
  }

  public async findById(id: string): Promise<Task> {
    // TODO: Modify generics for populate.
    const taskDto = await TaskModel.findById(id)
      .populate<{ createUser: string }>({ path: 'createUser', select: 'name avatar' })
      .populate<{ assignedUsers: string[] }>({ path: 'assignedUsers', select: 'name avatar' });
    if (!taskDto) {
      throw new ErrorResponse(`Task was not found with id of ${id}`, 404);
    }
    const task = new Task({
      title: new Title(taskDto.title),
      description: new Description(taskDto.description),
      workflow: taskDto.workflow.toString(),
      status: new TaskStatus(taskDto.status),
      priority: new Priority(taskDto.priority),
      target: new Targets(taskDto.target, targetTypes),
      level: new Level(taskDto.level),
      createUser: taskDto.createUser as any,
      detail: taskDto.detail,
      area: taskDto.area,
      previous: taskDto.previous.map((t) => t.toString()),
      next: taskDto.next.map((t) => t.toString()),
      assignedUsers: taskDto.assignedUsers,
      id: taskDto._id.toString(),
      no: taskDto.id,
      createdAt: new Date(taskDto.createdAt.toString()),
    });

    return task;
  }

  public async findByWorkflowId(workflowId: string): Promise<Task[]> {
    const taskDtos = await TaskModel.find({ workflow: workflowId })
      .populate<{ createUser: string }>({ path: 'createUser', select: 'name avatar' })
      .populate<{ assignedUsers: string[] }>({ path: 'assignedUsers', select: 'name avatar' });

    const tasks = taskDtos.map(
      (taskDto) =>
        new Task({
          title: new Title(taskDto.title),
          description: new Description(taskDto.description),
          workflow: taskDto.workflow.toString(),
          status: new TaskStatus(taskDto.status),
          priority: new Priority(taskDto.priority),
          target: new Targets(taskDto.target, targetTypes),
          level: new Level(taskDto.level),
          createUser: taskDto.createUser,
          detail: taskDto.detail,
          area: taskDto.area,
          previous: taskDto.previous.map((t) => t.toString()),
          next: taskDto.next.map((t) => t.toString()),
          assignedUsers: taskDto.assignedUsers,
          id: taskDto._id.toString(),
          no: taskDto.id,
          createdAt: new Date(taskDto.createdAt.toString()),
        })
    );
    return tasks;
  }

  public async save(task: Task): Promise<Task> {
    const taskDto = task.toPrimitive();
    if (!task.id) {
      // TODO: populate user.
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
    const commentDtos: CommentDTO[] = await CommentModel.find().populate({
      path: 'user',
      select: 'name avatar',
    });
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
    const commentDto: CommentDTO | null = await CommentModel.findById(id).populate({
      path: 'user',
      select: 'name avatar',
    });
    if (!commentDto) {
      throw new ErrorResponse(`Comment was not found with id of ${id}`, 404);
    }

    return new Comment({
      task: commentDto.task,
      user: commentDto.user,
      text: new Text(commentDto.text),
      id: commentDto._id,
      createdAt: commentDto.createdAt,
    });
  }

  public async findComments(taskId: string): Promise<Comment[]> {
    if (!(await TaskModel.findById(taskId))) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }

    const commentDtos: CommentDTO[] = await CommentModel.find({ task: taskId }).populate({
      path: 'user',
      select: 'name avatar',
    });
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
    const newComment: CommentDTO = await CommentModel.create(comment.toPrimitive());
    if (!newComment) {
      throw new ErrorResponse('Creating Comment Failed', 400);
    }
    comment.id = newComment._id;
    return comment;
  }
}
