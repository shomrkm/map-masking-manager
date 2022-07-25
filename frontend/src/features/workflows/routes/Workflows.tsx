import { Spinner, Table, Link, WorkflowStatusBadge } from '@/components/Elements';

import { useWorkflows } from '../api/getWorkflows';
import { Workflow } from '../types';

export const Workflows = () => {
  const { data, isLoading } = useWorkflows();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner className="w-32 h-32" />
      </div>
    );
  }

  if (!data) {
    return <div>No Workflows</div>;
  }

  return (
    <>
      <h1 className="p-4 text-2xl font-bold">Workflows</h1>
      <div className="flex flex-col justify-start ml-8">
        <Table<Workflow>
          data={data}
          columns={[
            {
              title: 'ID',
              field: 'id',
            },
            {
              title: 'Status',
              field: 'status',
              Cell({ entry: { status } }) {
                return <WorkflowStatusBadge status={status} size="sm" />;
              },
            },
            {
              title: 'Title',
              field: 'title',
            },
            {
              title: 'Description',
              field: 'description',
            },
            {
              title: '',
              field: '_id',
              Cell({ entry: { _id } }) {
                return <Link to={`./${_id}`}>View</Link>;
              },
            },
          ]}
        />
      </div>
    </>
  );
};
