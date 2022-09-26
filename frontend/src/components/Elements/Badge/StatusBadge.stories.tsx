import { Meta, Story } from '@storybook/react';

import { StatusBadge, StatusBadgeProps } from './StatusBadge';

const meta: Meta = {
  title: 'Components/Elements/Badge/TaskStatusBadge',
  parameters: {
    controls: { expand: true },
  },
};

export default meta;

const Template: Story<StatusBadgeProps> = (props) => <StatusBadge {...props} />;

export const Todo = Template.bind({});
Todo.args = {
  status: 'todo',
};

export const InProgress = Template.bind({});
InProgress.args = {
  status: 'inprogress',
};

export const InReview = Template.bind({});
InReview.args = {
  status: 'inReview',
};

export const Completed = Template.bind({});
Completed.args = {
  status: 'completed',
};

export const Closed = Template.bind({});
Closed.args = {
  status: 'closed',
};
