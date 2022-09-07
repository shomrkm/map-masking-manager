import React from 'react';
import { FieldError, Merge } from 'react-hook-form';

type Props = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | Merge<FieldError, undefined> | undefined;
};

export type FieldWrapperPassThroughProps = Omit<Props, 'className' | 'children'>;

export const FieldWrapper: React.VFC<Props> = (props: Props) => {
  const { label, className, children, error } = props;
  return (
    <div>
      <label className={`block text-sm font-medium text-gray-700 ${className}`}>
        {label}
        <div className="mt-1">{children}</div>
      </label>
      {error?.message && (
        <div role="alert" aria-label={error.message} className="text-sm font-semibold text-red-500">
          {error.message}
        </div>
      )}
    </div>
  );
};
