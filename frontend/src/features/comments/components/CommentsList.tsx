import { ArchiveIcon } from '@heroicons/react/outline';

import { Spinner, MDPreview } from '@/components/Elements';
import { formatDate } from '@/utils/format';

import { useComments } from '../api/getComments';

type CommentsListProps = {
  taskId: string;
};

export const CommentsList = ({ taskId }: CommentsListProps) => {
  const commentsQuery = useComments({ taskId });

  if (commentsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-48">
        <Spinner size="lg" />
      </div>
    );
  }

  console.log(commentsQuery);
  if (!commentsQuery?.data?.length)
    return (
      <div
        role="list"
        aria-label="comments"
        className="flex flex-col justify-center items-center h-40 text-gray-500 bg-white"
      >
        <ArchiveIcon className="w-10 h-10" />
        <h4>No Comments Found</h4>
      </div>
    );

  return (
    <ul aria-label="comments" className="flex flex-col space-y-3">
      {commentsQuery.data.map((comment, index) => (
        <li
          aria-label={`comment-${comment.text}-${index}`}
          key={comment._id || index}
          className="p-4 w-full bg-white shadow-sm"
        >
          <div className="flex justify-between">
            <span className="text-xs font-semibold">{formatDate(comment.createdAt)}</span>
            {/* <DeleteComment discussionId={taskId} id={comment.id} /> */}
          </div>

          <MDPreview value={comment.text} />
        </li>
      ))}
    </ul>
  );
};
