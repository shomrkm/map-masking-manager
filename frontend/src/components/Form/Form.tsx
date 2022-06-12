import React from 'react';
import { useForm, UseFormReturn, UseFormProps, SubmitHandler } from 'react-hook-form';

type Props<TFormValues> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
};

export const Form = <TFormValues extends Record<string, unknown> = Record<string, unknown>>({
  onSubmit,
  children,
  className,
  options,
  id,
}: Props<TFormValues>) => {
  const methods = useForm<TFormValues>({ ...options });

  return (
    <form className={`space-y-6 ${className}`} onSubmit={methods.handleSubmit(onSubmit)} id={id}>
      {children(methods)}
    </form>
  );
};
