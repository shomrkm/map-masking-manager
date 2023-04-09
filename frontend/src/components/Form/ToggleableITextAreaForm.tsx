import clsx from 'clsx';
import React, { useState, FC, useCallback } from 'react';

import { Button, MDPreview } from '../Elements';

export type ToggleableTextAreaFormProps = {
  defaultValue?: string;
  onSubmit: (value: string) => void;
  className?: string;
};

export const ToggleableTextAreaForm: FC<ToggleableTextAreaFormProps> = ({
  defaultValue = '',
  onSubmit,
  className,
}: ToggleableTextAreaFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const [value, setValue] = useState(defaultValue);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleInputClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
              className={clsx(
                `block py-2 px-3 w-full placeholder-gray-400 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm appearance-none focus:outline-none`,
                className
              )}
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
          <div
            className={clsx('items-center', className)}
            onClick={handleInputClick}
            role="button"
            aria-hidden="true"
          >
            <MDPreview value={value} />
          </div>
        )}
      </form>
    </div>
  );
};
