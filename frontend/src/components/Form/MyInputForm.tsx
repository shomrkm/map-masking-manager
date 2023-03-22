import { CheckIcon } from '@heroicons/react/outline';
import React, { useState, FC, useCallback } from 'react';

export type MyInputFormProps = {
  defaultValue?: string;
  onSubmit: (value: string) => void;
};

export const MyInputForm: FC<MyInputFormProps> = ({ defaultValue = '', onSubmit }: Props) => {
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
          <div className="flex relative items-center">
            <input
              type="text"
              defaultValue={value}
              onChange={handleChange}
              className="block py-2 px-3 w-full sm:text-sm placeholder-gray-400 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 shadow-sm appearance-none focus:outline-none"
            />
            <button
              type="submit"
              value="Submit"
              className="flex absolute right-3 justify-center items-center bg-gray-200 rounded-full"
            >
              <CheckIcon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <input
              type="text"
              defaultValue={value}
              onClick={handleInputClick}
              className="block py-2 px-3 w-full sm:text-sm rounded-md hover:border hover:border-gray-300 hover:shadow-sm appearance-none"
              readOnly
            />
          </div>
        )}
      </form>
    </div>
  );
};
