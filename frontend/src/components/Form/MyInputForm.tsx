import { CheckIcon } from '@heroicons/react/outline';
import React, { useState, FC } from 'react';

type Props = {
  defaultValue?: string;
};

export const MyInputForm: FC<Props> = ({ defaultValue = '' }: Props) => {
  const [isClicked, setIsClicked] = useState(false);

  const [value, setValue] = useState(defaultValue);

  const handleInputClick = () => {
    setIsClicked(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // submit form data
    console.log(e);
    setIsClicked(false);
  };

  // TODO: https://play.tailwindcss.com/vPP44iui1K
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {isClicked ? (
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
