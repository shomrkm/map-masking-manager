import { Meta, Story } from '@storybook/react';

import { LevelBadge, LevelBadgeProps } from './LevelBadge';

const meta: Meta = {
  title: 'Components/Elements/Badge/LevelStatusBadge',
  parameters: {
    controls: { expand: true },
  },
};

export default meta;

const Template: Story<LevelBadgeProps> = (props) => <LevelBadge {...props} />;

export const Expert = Template.bind({});
Expert.args = {
  level: 'expert',
};

export const Intermediate = Template.bind({});
Intermediate.args = {
  level: 'intermediate',
};

export const Beginner = Template.bind({});
Beginner.args = {
  level: 'beginner',
};
