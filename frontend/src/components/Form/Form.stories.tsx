import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Button } from '../Elements';

import { Form } from './Form';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { TextareaField } from './TextareaField';

type FormValues = {
  title: string;
  description: string;
  type: string;
  content: string;
};

const MyForm = ({ hideSubmit = false }: { hideSubmit?: boolean }) => {
  return (
    <Form<FormValues> onSubmit={() => {}}>
      {({ register }) => (
        <>
          <InputField label="Title" registration={register('title')} />
          <TextareaField label="Description" registration={register('description')} />
          <SelectField
            label="Team"
            registration={register('type')}
            options={['A', 'B', 'C'].map((type) => ({
              label: type,
              value: type,
            }))}
          />
          {!hideSubmit && (
            <div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          )}
        </>
      )}
    </Form>
  );
};

const meta: Meta = {
  title: 'Components/Form',
  component: MyForm,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = () => <MyForm />;

export const SampleForm = Template.bind({});
