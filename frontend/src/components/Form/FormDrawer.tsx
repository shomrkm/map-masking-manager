import React from 'react';

import { Button, Drawer, DrawerProps } from '@/components/Elements';

type FormDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  submitButton: React.ReactElement;
  title: string;
  children: React.ReactNode;
  size?: DrawerProps['size'];
};

export const FormDrawer = ({
  isOpen,
  onClose,
  submitButton,
  title,
  children,
  size = 'md',
}: FormDrawerProps) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        size={size}
        renderFooter={() => (
          <>
            <Button variant="inverse" size="sm" onClick={onClose}>
              Cancel
            </Button>
            {submitButton}
          </>
        )}
      >
        {children}
      </Drawer>
    </>
  );
};
