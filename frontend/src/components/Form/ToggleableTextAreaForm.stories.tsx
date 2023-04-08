import { Meta, Story } from '@storybook/react';

import { ToggleableTextAreaForm, ToggleableTextAreaFormProps } from './ToggleableITextAreaForm';

const MyToggleableTextAreaForm = (props: ToggleableTextAreaFormProps) => (
  <div className="w-48">
    <ToggleableTextAreaForm {...props} />
  </div>
);

const meta: Meta = {
  title: 'Components/Form/ToggleableTextAreaForm',
  component: MyToggleableTextAreaForm,
  parameters: {
    controls: { expand: true },
  },
};
export default meta;

const Template: Story<ToggleableTextAreaFormProps> = (props) => (
  <MyToggleableTextAreaForm {...props} />
);

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  defaultValue: 'Small Text',
  onSubmit: (value: string) => console.log(value),
};

export const Base = Template.bind({});
Base.args = {
  size: 'md',
  defaultValue: 'Middle Text',
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
