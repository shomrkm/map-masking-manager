import { Meta, Story } from '@storybook/react';

import { ToggleableInputForm, ToggleableInputFormProps } from './ToggleableInputForm';

const MyToggleableInputForm = (props: ToggleableInputFormProps) => (
  <div className="w-40">
    <ToggleableInputForm {...props} />
  </div>
);

const meta: Meta = {
  title: 'Components/Form',
  component: MyToggleableInputForm,
  parameters: {
    controls: { expand: true },
  },
};
export default meta;

const Template: Story<ToggleableInputFormProps> = (props) => <MyToggleableInputForm {...props} />;

export const ToggleableInput = Template.bind({});
ToggleableInput.args = {
  defaultValue: 'test',
  onSubmit: (value: string) => console.log(value),
};
