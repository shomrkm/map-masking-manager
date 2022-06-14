import { useParams } from 'react-router-dom';

export const Task = () => {
  const { taskId } = useParams();

  return (
    <>
      <h1 className="p-4 text-2xl">Task</h1>
      <div className="pl-2 text-base">{`Task ID is ${taskId}`}</div>
    </>
  );
};
