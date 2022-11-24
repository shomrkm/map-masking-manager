import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';

import { Button } from '@/components/Elements';
import { Form, FormDrawerButton, InputField, SelectField, TextareaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';

import { CreateWorkflowDTO, useCreateWorkflow } from '../api/createWorkflow';
import { statusTypes } from '../types';

const schema = z.object({
  title: z.string().min(1, 'Required').max(50),
  description: z.string().min(1, 'Required').max(500),
  status: z.enum(statusTypes),
});

type CreateWorkflowButtonProps = {
  buttonTitle: string;
};

export const CreateWorkflowButton = ({ buttonTitle }: CreateWorkflowButtonProps) => {
  const createWorkflowMutation = useCreateWorkflow();

  return (
    <Authorization allowedRoles={[ROLES.admin]}>
      <FormDrawerButton
        isDone={createWorkflowMutation.isSuccess}
        triggerButton={
          <Button size="xs" startIcon={<PlusIcon className="w-4 h-4" />}>
            {buttonTitle}
          </Button>
        }
        title="Create Workflow"
        submitButton={
          <Button
            form="create-workflow"
            type="submit"
            size="sm"
            isLoading={createWorkflowMutation.isLoading}
          >
            Submit
          </Button>
        }
      >
        <Form<CreateWorkflowDTO['data'], typeof schema>
          id="create-workflow"
          onSubmit={async (values) => {
            await createWorkflowMutation.mutateAsync({ data: values });
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
              <SelectField
                label="Status"
                registration={register('status')}
                options={statusTypes.map((status) => ({
                  label: status,
                  value: status,
                }))}
              />
            </>
          )}
        </Form>
      </FormDrawerButton>
    </Authorization>
  );
};
