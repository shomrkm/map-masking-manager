import React, { useCallback } from 'react';

import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  const onSubmit = useCallback(() => {}, []);

  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-gradient-to-tr from-gray-300 to-gray-100">
        <div className="flex overflow-hidden z-10 flex-col md:flex-row items-center mx-3 md:mx-5 lg:mx-0 w-full sm:w-1/2 md:w-9/12 bg-blue-600 bg-center bg-cover bg-login rounded shadow-md">
          <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-blue-600 bg-opacity-25">
            <h1 className="my-2 md:my-0 text-3xl md:text-4xl font-extrabold text-white">
              MapTaskingManager
            </h1>
            <p className="hidden md:block mb-2 font-mono text-white">create new maps</p>
          </div>
          <LoginForm onSubmit={onSubmit} />
        </div>
      </div>
    </>
  );
};
