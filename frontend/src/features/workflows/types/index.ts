export type Workflow = {
  _id: string;
  id: number;
  title: string;
  description: string;
  status: 'new' | 'inProgress' | 'completed' | 'closed';
  createUser: {
    _id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  slug: string;
};
