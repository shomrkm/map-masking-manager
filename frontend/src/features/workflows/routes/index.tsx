import { Navigate, Route, Routes } from 'react-router-dom';

import { Workflow } from './Workflow';
import { Workflows } from './Workflows';

export const WorkflowsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Workflows />} />
      <Route path=":workflowId" element={<Workflow />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
