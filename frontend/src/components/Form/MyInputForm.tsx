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

  return (
    <div>
      {isClicked ? (
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <input
              type="text"
              defaultValue={value}
              onChange={handleChange}
              className="block border border-gray-200 border-solid"
            />
            <button
              type="submit"
              value="Submit"
              className="flex justify-center items-center bg-gray-200"
            >
              <CheckIcon className="w-5 h-auto text-gray-400" />
            </button>
          </div>
        </form>
      ) : (
        <div className="flex items-center">
          <input
            type="text"
            defaultValue={value}
            onClick={handleInputClick}
            className="pointer-events-none: block bg-white hover:bg-gray-500 hover:pointer-events-auto"
            readOnly
          />
        </div>
      )}
    </div>
  );
};
