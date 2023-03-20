import React, { useState, FC } from 'react';

export const MyInputForm: FC = () => {
  const [isClicked, setIsClicked] = useState(false);

  const [value, setValue] = useState('');

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
          <div className="flex flex-row justify-start items-center">
            <input
              type="text"
              defaultValue={value}
              onChange={handleChange}
              className="border border-gray-200 border-solid"
            />
            <button type="submit" value="Submit" className="bg-gray-200">
              ✔
            </button>
          </div>
        </form>
      ) : (
        <input type="text" defaultValue={value} onClick={handleInputClick} />
      )}
    </div>
  );
};
