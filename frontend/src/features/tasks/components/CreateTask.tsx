import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, SelectField, TextareaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateTaskDTO, useCreateTask } from '../api/createTask';
import { levelTypes, priorityTypes, statusTypes, targetTypes } from '../types';

const schema = z.object({
  title: z.string().min(1, 'Required').max(50),
  description: z.string().min(1, 'Required').max(500),
  detail: z.string(),
  // area: z.object({
  // type: z.enum(['Polygon']),
  // coordinates: z.array(z.string()),
  // }),
  // workflowId: z.string(),
  status: z.enum(statusTypes),
  target: z.enum(targetTypes),
  level: z.enum(levelTypes),
  priority: z.enum(priorityTypes),
});

// type CreateTaskWithWorkflowDTO = Omit<CreateTaskDTO, 'area' | 'worklowId'>;

export const CreateTaskButton = () => {
  const createDiscussionMutation = useCreateTask();

  return (
    <Authorization allowedRoles={[ROLES.admin]}>
      <FormDrawer
        isDone={createDiscussionMutation.isSuccess}
        triggerButton={
          <Button size="xs" startIcon={<PlusIcon className="w-4 h-4" />}>
            Create Task
          </Button>
        }
        title="Create Task"
        submitButton={
          <Button
            form="create-task"
            type="submit"
            size="sm"
            isLoading={createDiscussionMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<CreateTaskDTO['data'], typeof schema>
          id="create-discussion"
          onSubmit={async (values) => {
            await createDiscussionMutation.mutateAsync({ data: values });
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
              <SelectField
                label="Target"
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
