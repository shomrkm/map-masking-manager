import { ArchiveIcon } from '@heroicons/react/outline';

import { Avatar } from '@/components/Avatar';
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
        <Spinner size="xl" />
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
        <div key={comment._id || index} className="mx-2 rounded-md">
          <li
            aria-label={`comment-${comment.text}-${index}`}
            className="p-4 w-full bg-white shadow-sm"
          >
            <div className="flex">
              <div className="justify-start w-14">
                <Avatar name={comment.user.name} avatar={comment.user.avatar} size="md" />
              </div>
              <div className="flex-1">
                <div className="flex-col flex-1 justify-between">
                  <div className="flex items-center px-3">
                    <span className="flex-1 text-gray-700">{comment.user.name}</span>
                    <span className="text-xs font-semibold text-right text-gray-500">
                      {formatDate(comment.createdAt)}
                    </span>
                    {/* <DeleteComment discussionId={taskId} id={comment.id} /> */}
                  </div>
                </div>
                <MDPreview value={comment.text} />
              </div>
            </div>
          </li>
        </div>
      ))}
    </ul>
  );
};
