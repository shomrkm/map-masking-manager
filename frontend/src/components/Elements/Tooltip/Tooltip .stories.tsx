import { Meta, Story } from '@storybook/react';

import { Tooltip, TooltipProps } from './Tooltip';

const meta: Meta = {
  title: 'Components/Elements/Tooltip',
  component: Tooltip,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<TooltipProps> = (props) => (
  <div className="flex justify-center items-center w-32 h-20">
    <Tooltip {...props} />
  </div>
);

export const Top = Template.bind({});
Top.args = {
  children: <div>Tooltip</div>,
  text: 'This is a Tooltip',
  direction: 'top',
};

export const Bottom = Template.bind({});
Bottom.args = {
  children: <div>Tooltip</div>,
  text: 'This is a Tooltip',
  direction: 'bottom',
};
