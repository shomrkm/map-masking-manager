import { Meta, Story } from '@storybook/react';

import { PriorityBadge, PriorityBadgeProps } from './PriorityBadge';

const meta: Meta = {
  title: 'Components/Elements/Badge/PriorityBadge',
  parameters: {
    controls: { expand: true },
  },
};

export default meta;

const Template: Story<PriorityBadgeProps> = (props) => <PriorityBadge {...props} />;

export const High = Template.bind({});
High.args = {
  priority: 'high',
};

export const Normal = Template.bind({});
Normal.args = {
  priority: 'normal',
};

export const Low = Template.bind({});
Low.args = {
  priority: 'low',
};
