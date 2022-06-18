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
  status: 'unassigned' | 'mapping' | 'validating' | 'finished';
  target: ('road' | 'map' | 'poi')[];
  level: 'expert' | 'intermediate' | 'beginner';
  priority: 'high' | 'normal' | 'low';
  createUser: string;
  assignedUsers: string[];
  createdAt: string;
  slug: string;
};
