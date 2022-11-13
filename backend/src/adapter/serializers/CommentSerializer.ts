import { Comment } from '@/domain/entities';

const serializeSingleComment = (comment: Comment) => {
  return {
    _id: comment.id,
    task: comment.task,
    user: comment.user,
    text: comment.text.toPrimitive(),
    createdAt: comment.createdAt,
  };
};

export class CommentSerializer {
  public serializeComment(comment: Comment) {
    return serializeSingleComment(comment);
  }
  public serializeComments(comments: Comment[]) {
    return comments.map(serializeSingleComment);
  }
}
