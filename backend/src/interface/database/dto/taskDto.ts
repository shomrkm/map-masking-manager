import { Polygon } from 'geojson';

import { StatusType } from '@/domain/Task/entities/Status';
import { TargetType } from '@/domain/Task/entities/Targets';
import { LevelType } from '@/domain/Task/entities/Level';
import { PriorityType } from '@/domain/Task/entities/Priority';

export type TaskDTO = {
  _id: string;
  id: number;
  title: string;
  description: string;
  detail?: string;
  area?: Polygon;
  status: StatusType;
  workflow: string;
  target: TargetType[];
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
