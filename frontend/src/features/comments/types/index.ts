export type Comment = {
  _id: string;
  task: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  text: string;
  createdAt: number;
};
