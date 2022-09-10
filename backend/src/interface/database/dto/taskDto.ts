import { Polygon } from 'geojson';

export type TaskDTO = {
  _id: string;
  id: number;
  title: string;
  description: string;
  detail?: string;
  area?: Polygon;
  status: 'unassigned' | 'mapping' | 'validating' | 'finished';
  workflow: string;
  target: ('road' | 'map' | 'poi')[];
  previous?: string[];
  next?: string[];
  level: 'expert' | 'intermediate' | 'beginner';
  priority: 'high' | 'normal' | 'low';
  createUser: string;
  assignedUsers?: string[];
  createdAt: Date;
};

export type CreateTaskDTO = Omit<TaskDTO, '_id' | 'id'>;
export type UpdateTaskDTO = Partial<CreateTaskDTO>;
