import { Meta, Story } from '@storybook/react';

import { MyInputForm, MyInputFormProps } from './MyInputForm';

const meta: Meta = {
  title: 'Components/Form/MyInputForm',
  parameters: {
    controls: { expand: true },
  },
};

export default meta;

const Template: Story<MyInputFormProps> = (props) => (
  <div className="w-40">
    <MyInputForm {...props} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  defaultValue: 'test',
  onSubmit: (value: string) => console.log(value),
};
