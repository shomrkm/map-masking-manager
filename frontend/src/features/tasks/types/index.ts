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
