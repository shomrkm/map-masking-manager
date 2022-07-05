import { useParams } from 'react-router-dom';

export const Workflow = () => {
  const { workflowId } = useParams();
  return (
    <div className="overflow-y-scroll flex-col m-4">
      <div className="text-2xl font-bold">Workflow Page</div>
      <div>{`workflow id: ${workflowId}`}</div>
    </div>
  );
};
