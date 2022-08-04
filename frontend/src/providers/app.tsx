import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { Notifications } from '@/components/Notifications';
import { queryClient } from '@/lib/react-query';

type Props = {
  children: React.ReactNode;
};

export const AppProvider: React.VFC<Props> = ({ children }) => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Notifications />
        <Router>{children}</Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
};
