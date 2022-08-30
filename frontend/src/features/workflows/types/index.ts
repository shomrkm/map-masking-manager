export const statusTypes = ['new', 'inProgress', 'completed', 'closed'] as const;
export type Status = typeof statusTypes[number];

export type Workflow = {
  _id: string;
  id: number;
  title: string;
  description: string;
  status: Status;
  createUser: {
    _id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  slug: string;
};
