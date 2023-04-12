import { CheckIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import React, { useState, FC, useCallback } from 'react';

const FontSize = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export type ToggleableInputFormProps = {
  type?: 'text' | 'email';
  size?: keyof typeof FontSize;
  bold?: boolean;
  defaultValue?: string;
  onSubmit: (value: string) => void;
  className?: string;
};

export const ToggleableInputForm: FC<ToggleableInputFormProps> = ({
  type = 'text',
  size = 'sm',
  bold = false,
  defaultValue = '',
  onSubmit,
  className,
}: ToggleableInputFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [value, setValue] = useState(defaultValue);

  const handleInputClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(value);
      setIsEditing(false);
    },
    [value, onSubmit]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {isEditing ? (
          <div className="flex relative gap-2 items-center">
            <input
              type={type}
              defaultValue={value}
              onChange={handleChange}
              className={`block py-2 px-3 w-full text-${size} placeholder-gray-400 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm appearance-none focus:outline-none`}
            />
            <div className="flex absolute right-3 -bottom-7 gap-2">
            <button
              type="submit"
              value="Submit"
              className="flex ustify-center items-center bg-gray-200 hover:bg-blue-200 rounded-sm"
              >
              <CheckIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
            <button
              type="button"
              value="Cancel"
              className="flex justify-center items-center bg-gray-200 hover:bg-blue-200 rounded-sm"
              >
              <XIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <input
              type="text"
              defaultValue={value}
              onClick={handleInputClick}
              className={clsx(
                'block py-2 px-3 w-full rounded-md hover:border hover:border-gray-300 hover:shadow-sm appearance-none',
                FontSize[size],
                bold && 'font-bold',
                className
              )}
              readOnly
            />
          </div>
        )}
      </form>
    </div>
  );
};
