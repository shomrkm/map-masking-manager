import { Meta, Story } from '@storybook/react';

import { RadialProgress, RadialProgressProps } from './RadialProgress';

const meta: Meta = {
  title: 'Components/Elements/RadialProgress',
  parameters: {
    controls: { expand: true },
  },
};

export default meta;

const Template: Story<RadialProgressProps> = (props) => <RadialProgress {...props} />;

export const Small = Template.bind({});
Small.args = {
  progress: 30,
};

export const Medium = Template.bind({});
Medium.args = {
  progress: 50,
  size: 'md',
};

export const Large = Template.bind({});
Large.args = {
  progress: 80,
  size: 'lg',
};
