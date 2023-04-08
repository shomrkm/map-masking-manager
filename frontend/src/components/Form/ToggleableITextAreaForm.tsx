import clsx from 'clsx';
import React, { useState, FC, useCallback } from 'react';

import { Button } from '../Elements';

const FontSize = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export type ToggleableTextAreaFormProps = {
  size?: keyof typeof FontSize;
  defaultValue?: string;
  onSubmit: (value: string) => void;
  className?: string;
};

export const ToggleableTextAreaForm: FC<ToggleableTextAreaFormProps> = ({
  size = 'sm',
  defaultValue = '',
  onSubmit,
  className,
}: ToggleableTextAreaFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [value, setValue] = useState(defaultValue);

  const handleInputClick = () => {
    setIsEditing(true);
  };

  const hadleCancelClick = () => {
    setValue(defaultValue);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          <div className="flex-col items-center">
            <textarea
              defaultValue={value}
              onChange={handleChange}
              className={`block py-2 px-3 w-full text-${size} placeholder-gray-400 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm appearance-none focus:outline-none`}
            />
            <div className="flex gap-2 mt-2">
              <Button type="submit" variant="primary" size="xs">
                Save
              </Button>
              <Button variant="inverse" size="xs" onClick={hadleCancelClick}>
                Cancel
              </Button>
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
