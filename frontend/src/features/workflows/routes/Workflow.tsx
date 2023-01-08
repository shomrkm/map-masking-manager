import { useParams } from 'react-router-dom';

import { LevelBadge, Link, MDPreview, Spinner, StatusBadge, Table } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import { useTasksForWorkflow } from '@/features/tasks/api/getTasksForWorkFlow';
import { Task } from '@/features/tasks/types';

import { useWorkflow } from '../api/getWorkflow';
import { TaskWorkflowPanel } from '../components/TaskWorkflowPanel';

export const Workflow = () => {
  const { workflowId } = useParams();

  const workflowQuery = useWorkflow({ workflowId: workflowId as string });
  const taskQuery = useTasksForWorkflow({ workflowId: workflowId as string });

  if (workflowQuery.isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner />
      </div>
    );
  }

  if (!workflowQuery.data) {
    return <div>No Workflows</div>;
  }

  return (
    <ContentLayout title={`#${workflowQuery.data.id} ${workflowQuery.data.title}`}>
      <div className="flex-col m-4">
        <div className="flex m-4">
          <div className="flex-1 space-y-4">
            <h2 className="text-xl font-bold text-gray-700 prose">Description</h2>
            <MDPreview value={workflowQuery.data.description} />
            <h2 className="text-xl font-bold text-gray-700 prose">Tasks</h2>
            <div className="mr-4">
              {taskQuery.data && (
                <Table<Task>
                  data={taskQuery.data}
                  columns={[
                    {
                      title: 'ID',
                      field: 'id',
                      Cell({ entry: { _id, id } }) {
                        return <Link to={`../../tasks/${_id}`}>{id}</Link>;
                      },
                    },
                    {
                      title: 'Title',
                      field: 'title',
                    },
                    {
                      title: 'Status',
                      field: 'status',
                      Cell({ entry: { status } }) {
                        return <StatusBadge status={status} size="sm" />;
                      },
                    },
                    {
                      title: 'Level',
                      field: 'level',
                      Cell({ entry: { level } }) {
                        return <LevelBadge level={level} size="sm" />;
                      },
                    },
                  ]}
                />
              )}
            </div>
          </div>
          <div className="hidden lg:flex">
            <div className="flex justify-center items-center w-[700px] h-[750px] rounded-md border border-gray-300 border-solid shadow-sm">
              <TaskWorkflowPanel workflowId={workflowId as string} />
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};
