import { Meta, Story } from '@storybook/react';
import * as z from 'zod';

import { Button } from '../Elements';

import { Form } from './Form';
import { FormDrawer } from './FormDrawer';
import { InputField } from './InputField';
import { MultiSelectField } from './MultiSelectField';
import { SelectField } from './SelectField';
import { TextareaField } from './TextareaField';

type FormValues = {
  title: string;
  description: string;
  content: string;
  team: string;
  tags: string[];
};

const schema = z.object({
  title: z.string().max(20).min(1, 'Title is required'),
  description: z.string().max(50),
  content: z.string(),
  team: z.enum(['A', 'B', 'C']),
  tags: z.array(z.string()).min(1, 'More than 1 tags required'),
});

const MyForm = ({ hideSubmit = false }: { hideSubmit?: boolean }) => {
  return (
    <Form<FormValues, typeof schema>
      id="my-form"
      onSubmit={(value) => {
        console.log(value);
      }}
      schema={schema}
    >
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
          <TextareaField label="Content" registration={register('content')} />
          <SelectField
            label="Team"
            error={formState.errors['team']}
            registration={register('team')}
            options={['A', 'B', 'C'].map((type) => ({
              label: type,
              value: type,
            }))}
          />
          <MultiSelectField
            label="Tags"
            registration={register('tags')}
            error={formState.errors['tags']}
            options={['TagA', 'TagB', 'TagC'].map((type) => ({
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
    <FormDrawer
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
    </FormDrawer>
  );
};
