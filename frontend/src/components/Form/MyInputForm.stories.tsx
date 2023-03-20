import { Meta, Story } from '@storybook/react';

import { MyInputForm } from './MyInputForm';

const meta: Meta = {
  title: 'Components/Form/MyInputForm',
  parameters: {
    controls: { expand: true },
  },
};

export default meta;

const Template: Story = () => <MyInputForm />;

export const Default = Template.bind({});
