export const statusTypes = ['todo', 'inprogress', 'inReview', 'completed'] as const;
export type Status = typeof statusTypes[number];
export const targetTypes = ['road', 'map', 'poi'] as const;
export type Target = typeof targetTypes[number];
export const levelTypes = ['expert', 'intermediate', 'beginner'] as const;
export type Level = typeof levelTypes[number];
export const priorityTypes = ['high', 'normal', 'low'] as const;
export type Priority = typeof priorityTypes[number];

export type Task = {
  _id: string;
  id: number;
  title: string;
  description: string;
  detail: string;
  area: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  status: Status;
  workflow: string;
  target: Target[];
  level: Level;
  previous: string[];
  next: string[];
  priority: Priority;
  createUser: {
    _id: string;
    name: string;
    avatar: string;
  };
  assignedUsers: {
    _id: string;
    name: string;
    avatar: string;
  }[];
  createdAt: string;
  slug: string;
};
