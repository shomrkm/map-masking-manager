import { Comment } from '@/domain/entities';
import { UserRepository } from '@/infrastructure/repositories/UserRepository';

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
  constructor(private readonly userRepository: UserRepository) {}

  public async serializeComment(comment: Comment) {
    const c = serializeSingleComment(comment);
    const user = await this.userRepository.find(c.user);
    return {
      ...c,
      user: {
        _id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
    };
  }
  public async serializeComments(comments: Comment[]) {
    return await Promise.all(comments.map((c) => this.serializeComment(c)));
  }
}
