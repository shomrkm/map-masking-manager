import { Meta, Story } from '@storybook/react';

import { ToggleableInputForm, ToggleableInputFormProps } from './ToggleableInputForm';

const MyToggleableInputForm = (props: ToggleableInputFormProps) => (
  <div className="w-44">
    <ToggleableInputForm {...props} />
  </div>
);

const meta: Meta = {
  title: 'Components/Form/ToggleableInputForm',
  component: MyToggleableInputForm,
  parameters: {
    controls: { expand: true },
  },
};
export default meta;

const Template: Story<ToggleableInputFormProps> = (props) => <MyToggleableInputForm {...props} />;

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  defaultValue: 'Small Text',
  onSubmit: (value: string) => console.log(value),
};

export const Base = Template.bind({});
Base.args = {
  size: 'base',
  defaultValue: 'Base Text',
  onSubmit: (value: string) => console.log(value),
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  defaultValue: 'Large Text',
  onSubmit: (value: string) => console.log(value),
};

export const XLarge = Template.bind({});
XLarge.args = {
  size: 'xl',
  defaultValue: 'XLarge Text',
  onSubmit: (value: string) => console.log(value),
};
