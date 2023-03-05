import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import { Tooltip, TooltipProps } from './Tooltip';

const meta: Meta = {
  title: 'Components/Elements/Tooltip',
  component: Tooltip,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<TooltipProps> = (props) => <Tooltip {...props} />;

export const Down = Template.bind({});
Down.args = {
  children: <div>Tooltip</div>,
  text: 'This is a Tooltip',
};
