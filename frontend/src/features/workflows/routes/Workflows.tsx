import { Spinner, Table, Link, StatusBadge } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';

import { useWorkflows } from '../api/getWorkflows';
import { Workflow } from '../types';

export const Workflows = () => {
  const { data, isLoading } = useWorkflows();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <div>No Workflows</div>;
  }

  return (
    <>
      <ContentLayout title="Workflows">
        <Table<Workflow>
          data={data}
          columns={[
            {
              title: 'ID',
              field: 'id',
              Cell({ entry: { _id, id } }) {
                return <Link to={`./${_id}`}>{id}</Link>;
              },
            },
            {
              title: 'Status',
              field: 'status',
              Cell({ entry: { status } }) {
                return <StatusBadge status={status} size="sm" />;
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
              title: 'Created by',
              field: 'createUser',
              Cell({ entry: { createUser } }) {
                return <p>{createUser.name}</p>;
              },
            },
          ]}
        />
      </ContentLayout>
    </>
  );
};
