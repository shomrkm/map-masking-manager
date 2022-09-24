export type CommentDTO = {
  _id: string;
  task: string;
  user: string;
  text: string;
  createdAt: Date;
};

// export type CreateCommentDTO = Omit<CommentDTO, '_id'>;
// export type UpdateCommentDTO = Omit<CommentDTO, '_id' | 'task' | 'user' | 'createdAt'>;
