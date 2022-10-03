import React, { useEffect } from 'react';

import { DrawerProps } from '@/components/Elements';
import { useDisclosure } from '@/hooks/useDisclosure';

import { FormDrawer } from './FormDrawer';

type FormDrawerButtonProps = {
  isDone: boolean;
  triggerButton: React.ReactElement;
  submitButton: React.ReactElement;
  title: string;
  children: React.ReactNode;
  size?: DrawerProps['size'];
};

export const FormDrawerButton = ({
  isDone,
  triggerButton,
  submitButton,
  title,
  children,
}: FormDrawerButtonProps) => {
  const { close, open, isOpen } = useDisclosure();

  useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);

  return (
    <>
      {React.cloneElement(triggerButton, { onClick: open })}
      <FormDrawer isOpen={isOpen} onClose={close} submitButton={submitButton} title={title}>
        {children}
      </FormDrawer>
    </>
  );
};
