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
import { Task as TaskModel, Comment as CommentModel } from '../mongoose/models';
import { TaskDTO, CommentDTO } from './dto';

export class TaskRepository implements ITaskRepository {
  public async findAll(): Promise<Task[]> {
    const taskDtos: TaskDTO[] = await TaskModel.find()
      .populate({ path: 'createUser', select: 'name avatar' })
      .populate({ path: 'assignedUsers', select: 'name avatar' });

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
    const taskDto: TaskDTO | null = await TaskModel.findById(id)
      .populate({ path: 'createUser', select: 'name avatar' })
      .populate({ path: 'assignedUsers', select: 'name avatar' });
    if (!taskDto) {
      throw new ErrorResponse(`Task was not found with id of ${id}`, 404);
    }
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
    const taskDtos: TaskDTO[] = await TaskModel.find({ workflow: workflowId })
      .populate({ path: 'createUser', select: 'name avatar' })
      .populate({ path: 'assignedUsers', select: 'name avatar' });

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
      const newTask = await TaskModel.create(taskDto);
      if (!newTask) {
        throw new ErrorResponse('CreatingTask Failed', 400);
      }
      task.id = newTask._id;
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
    const task = await TaskModel.findById(taskId);
    if (!task) {
      throw new ErrorResponse(`Task was not found with id of ${taskId}`, 404);
    }
    const deletedTask = new Task({
      title: new Title(task.title),
      description: new Description(task.description),
      workflow: task.workflow,
      status: new TaskStatus(task.status),
      priority: new Priority(task.priority),
      target: new Targets(task.target, targetTypes),
      level: new Level(task.level),
      createUser: task.createUser,
      detail: task.detail,
      area: task.area,
      previous: task.previous,
      next: task.next,
      assignedUsers: task.assignedUsers,
      id: task._id,
      no: task.id,
      createdAt: task.createdAt,
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
