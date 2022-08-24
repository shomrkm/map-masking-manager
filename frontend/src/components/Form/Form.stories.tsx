import { Meta, Story } from '@storybook/react';
import * as z from 'zod';

import { Button } from '../Elements';

import { Form } from './Form';
import { FromDrawer } from './FormDrawer';
import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { TextareaField } from './TextareaField';

type FormValues = {
  title: string;
  description: string;
  type: string;
  content: string;
};

const schema = z.object({
  title: z.string().max(20).min(1, 'Title is required'),
  description: z.string().max(50),
});

const MyForm = ({ hideSubmit = false }: { hideSubmit?: boolean }) => {
  return (
    <Form<FormValues, typeof schema> onSubmit={() => {}} schema={schema}>
      {({ register, formState }) => (
        <>
          <InputField
            label="Title"
            error={formState.errors['title']}
            registration={register('title')}
          />
          <TextareaField
            label="Description"
            error={formState.errors['description']}
            registration={register('description')}
          />
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

export const Default = Template.bind({});
Default.args = {};

export const AsFormDrawer = () => {
  return (
    <FromDrawer
      triggerButton={<Button>Open Form</Button>}
      isDone={true}
      title="My Form"
      size="lg"
      submitButton={
        <Button form="my-form" type="submit">
          Submit
        </Button>
      }
    >
      <MyForm hideSubmit />
    </FromDrawer>
  );
};
