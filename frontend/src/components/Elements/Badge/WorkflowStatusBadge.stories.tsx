import { Meta, Story } from '@storybook/react';

import { WorkflowStatusBadge, WorkflowStatusBadgeProps } from './WorkflowStatusBadge';

const meta: Meta = {
  title: 'Components/Elements/Badge/WorkflowStatusBadge',
  parameters: {
    controls: { expand: true },
  },
};

export default meta;

const Template: Story<WorkflowStatusBadgeProps> = (props) => <WorkflowStatusBadge {...props} />;

export const ToDo = Template.bind({});
ToDo.args = {
  status: 'todo',
};

export const inProgress = Template.bind({});
inProgress.args = {
  status: 'inprogress',
};

export const Completed = Template.bind({});
Completed.args = {
  status: 'completed',
};
export const Closed = Template.bind({});
Closed.args = {
  status: 'closed',
};
