import * as React from 'react';

import { Head } from '../Head';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="overflow-x-hidden overflow-y-scroll flex-col flex-wrap p-4 space-y-4 h-full">
        <h1 className="text-2xl font-bold text-gray-700">{title}</h1>
        {children}
      </div>
    </>
  );
};
