import { Meta, Story } from '@storybook/react';

import { ToggleableTextAreaForm, ToggleableTextAreaFormProps } from './ToggleableITextAreaForm';

const MyToggleableTextAreaForm = (props: ToggleableTextAreaFormProps) => (
  <div className="w-44">
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

const Template: Story<ToggleableTextAreaFormProps> = (props) => <MyToggleableTextAreaForm {...props} />;

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  defaultValue: 'Small Text',
  onSubmit: (value: string) => console.log(value),
};

export const Base = Template.bind({});
Base.args = {
  size: 'md',
  bold: false,
  defaultValue: 'Middle Text',
  onSubmit: (value: string) => console.log(value),
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  bold: false,
  defaultValue: 'Large Text',
  onSubmit: (value: string) => console.log(value),
};

export const XLarge = Template.bind({});
XLarge.args = {
  size: 'xl',
  bold: false,
  defaultValue: 'XLarge Text',
  onSubmit: (value: string) => console.log(value),
};

export const Bold = Template.bind({});
Bold.args = {
  size: 'md',
  bold: true,
  defaultValue: 'Middle Text',
  onSubmit: (value: string) => console.log(value),
};
