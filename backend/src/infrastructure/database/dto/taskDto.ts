import { Polygon } from 'geojson';

import { StatusType, TargetTypes, LevelType, PriorityType } from '@/domain/Task';

export type TaskDTO = {
  _id: string;
  id: number;
  title: string;
  description: string;
  detail?: string;
  area?: Polygon;
  status: StatusType;
  workflow: string;
  target: TargetTypes;
  previous?: string[];
  next?: string[];
  level: LevelType;
  priority: PriorityType;
  createUser: string;
  assignedUsers?: string[];
  createdAt: Date;
};

export type CreateTaskDTO = Omit<TaskDTO, '_id' | 'id'>;
export type UpdateTaskDTO = Partial<CreateTaskDTO>;
export type OptionalTaskDTO = Partial<TaskDTO>;
