import React from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-2xl sm:text-4xl mb-5">Oops! Nothing here :(</p>
      <Link to="/" className="text-blue-500 hover:underline">
        <button className="text-white bg-black hover:bg-gray-800 rounded-lg text-sm px-6 py-3">
          Go to Main Page
        </button>
      </Link>
    </div>
  );
};

export default NoPage;
