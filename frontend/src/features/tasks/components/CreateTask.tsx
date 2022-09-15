import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, SelectField, TextareaField } from '@/components/Form';
import { MultiSelectField } from '@/components/Form/MultiSelectField';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateTaskDTO, useCreateTask } from '../api/createTask';
import { levelTypes, priorityTypes, statusTypes, targetTypes } from '../types';

const schema = z.object({
  title: z.string().min(1, 'Required').max(50),
  description: z.string().min(1, 'Required').max(500),
  detail: z.string(),
  status: z.enum(statusTypes),
  target: z.array(z.enum(targetTypes)).min(1, 'More than 1 target required'),
  level: z.enum(levelTypes),
  priority: z.enum(priorityTypes),
});

type CreateTaskButtonProps = {
  buttonTitle: string;
  fixedValues?: {
    workflow?: string;
  };
};

export const CreateTask = ({ buttonTitle, fixedValues }: CreateTaskButtonProps) => {
  const createTaskMutation = useCreateTask();

  return (
    <Authorization allowedRoles={[ROLES.admin]}>
      <FormDrawer
        isDone={createTaskMutation.isSuccess}
        triggerButton={
          <Button size="xs" startIcon={<PlusIcon className="w-4 h-4" />}>
            {buttonTitle}
          </Button>
        }
        title="Create Task"
        submitButton={
          <Button
            form="create-task"
            type="submit"
            size="sm"
            isLoading={createTaskMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<CreateTaskDTO['data'], typeof schema>
          id="create-task"
          onSubmit={async (values) => {
            const data = { ...values, ...fixedValues };
            console.log('submit', data);
            await createTaskMutation.mutateAsync({ data });
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
              <TextareaField
                label="Detail"
                error={formState.errors['detail']}
                registration={register('detail')}
              />
              {/* TODO: area */}
              <SelectField
                label="Status"
                registration={register('status')}
                options={statusTypes.map((status) => ({
                  label: status,
                  value: status,
                }))}
              />
              <MultiSelectField
                label="Target"
                error={formState.errors['target']}
                registration={register('target')}
                options={targetTypes.map((target) => ({
                  label: target,
                  value: target,
                }))}
              />
              <SelectField
                label="Level"
                registration={register('level')}
                options={levelTypes.map((level) => ({
                  label: level,
                  value: level,
                }))}
              />
              <SelectField
                label="Priority"
                registration={register('priority')}
                options={priorityTypes.map((priority) => ({
                  label: priority,
                  value: priority,
                }))}
              />
            </>
          )}
        </Form>
      </FormDrawer>
    </Authorization>
  );
};
