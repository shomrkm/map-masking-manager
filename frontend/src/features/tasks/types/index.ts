export type Task = {
  id: string;
  title: string;
  description: string;
  detail: string;
  area: {
    type: {
      type: 'Polygon';
      required: true;
    };
    coordinates: {
      type: [[[number]]];
      required: true;
    };
    status: 'todo' | 'in-progress' | 'completed';
  };
  status: 'unassigned' | 'mapping' | 'validating' | 'finished';
  target: ('road' | 'map' | 'poi')[];
  level: 'expert' | 'intermediate' | 'beginner';
  priority: 'high' | 'normal' | 'low';
  createUser: string;
  assignedUsers: string[];
  createdAt: Date;
  slug: string;
};
