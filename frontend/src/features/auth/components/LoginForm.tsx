import React from 'react';

import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useNotificationStore } from '@/stores/notifications';

import { loginWithEmailAndPassword, LoginCredentialsDTO } from '../api/login';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm: React.VFC<LoginFormProps> = ({ onSuccess }) => {
  const { addNotification } = useNotificationStore();

  return (
    <div className="flex flex-col items-center py-5 md:py-8 px-4 w-full md:w-1/2 bg-white">
      <h3 className="flex items-center mb-4 text-3xl font-bold text-blue-500">LOGIN</h3>
      <div className="flex flex-col justify-start w-2/3">
        <Form<LoginCredentialsDTO>
          onSubmit={async (values) => {
            try {
              await loginWithEmailAndPassword(values);
              onSuccess();
            } catch (err) {
              addNotification({ type: 'error', title: 'Login Failed' });
            }
          }}
        >
          {({ register }) => (
            <>
              <InputField type="email" label="Email" registration={register('email')} />
              <InputField type="password" label="Password" registration={register('password')} />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </>
          )}
        </Form>
        <div className="flex justify-center items-center mt-4 text-sm text-center text-gray-700">
          <p className="pr-2">Do not have an account?</p>
          <a
            href="#"
            className="font-bold text-green-500 hover:text-green-600 underline focus:outline-none"
          >
            register
          </a>
        </div>
      </div>
    </div>
  );
};
