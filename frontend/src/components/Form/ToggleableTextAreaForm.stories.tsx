import { Meta, Story } from '@storybook/react';

import { ToggleableTextAreaForm, ToggleableTextAreaFormProps } from './ToggleableITextAreaForm';

const MyToggleableTextAreaForm = (props: ToggleableTextAreaFormProps) => (
  <div className="w-56">
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

export const Default = Template.bind({});
Default.args = {
  defaultValue: 'This is the text.',
  onSubmit: (value: string) => console.log(value),
};

export const Markdown = Template.bind({});
Markdown.args = {
  defaultValue: `## Header
   - list1
   - list2

   This is the [link](https://www.google.com/) to google.
  `,
  onSubmit: (value: string) => console.log(value),
  className: 'h-20',
};
