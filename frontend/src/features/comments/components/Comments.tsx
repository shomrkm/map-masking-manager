import { CommentsList } from './CommentsList';

type CommentsProps = {
  taskId: string;
};

export const Comments = ({ taskId }: CommentsProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="p-4 text-2xl text-gray-700">Comments</h2>
        {/* <CreateComment discussionId={discussionId} /> */}
      </div>
      <CommentsList taskId={taskId} />
    </div>
  );
};
