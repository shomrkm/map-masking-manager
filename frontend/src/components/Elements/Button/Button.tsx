import React from 'react';

import { Spinner } from '../Spinner';

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-gray-50:text-blue-600',
  inverse: 'bg-white text-blue-600 hover:bg-blue-600:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-50:text-red-600',
};

const sizes = {
  xs: 'py-1 px-2 text-xs',
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      className = '',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`flex justify-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none ${variants[variant]} ${sizes[size]}} ${className}`}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        <span className="mx-2">{props.children}</span>
      </button>
    );
  }
);
Button.displayName = 'Button';
