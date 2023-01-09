import { Meta, Story } from '@storybook/react';

import { Spinner } from '../Spinner';

const meta: Meta = {
  title: 'Components/Elements/Spinner',
  parameters: {
    controls: { expand: true },
  },
};

export default meta;

const Template: Story = (props) => <Spinner {...props} />;

export const Default = Template.bind({});
Default.args = {};
