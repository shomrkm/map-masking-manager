import { Meta, Story } from '@storybook/react';

import { TaskStatusBadge, TaskStatusBadgeProps } from './TaskStatusBadge';

const meta: Meta = {
  title: 'Components/Elements/Badge/TaskStatusBadge',
  parameters: {
    controls: { expand: true },
  },
};

export default meta;

const Template: Story<TaskStatusBadgeProps> = (props) => <TaskStatusBadge {...props} />;

export const Unassigned = Template.bind({});
Unassigned.args = {
  status: 'unassigned',
};

export const Mapping = Template.bind({});
Mapping.args = {
  status: 'mapping',
};

export const Validating = Template.bind({});
Validating.args = {
  status: 'validating',
};
export const Finished = Template.bind({});
Finished.args = {
  status: 'finished',
};
