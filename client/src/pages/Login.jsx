import React from 'react';
import { Button } from '@mui/material';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 w-screen">
      <div className="container flex items-center justify-center mx-auto px-4">
        <div className="hidden md:block md:w-1/2">
          {/* TODO: Add Image and update background color for sign up container*/}
          {/* <Image /> */}
        </div>

        <div className="w-full md:w-1/2 md:pl-10">
          {/* Content Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-semibold mb-4">Welcome to AI Wardrobe</h1>
            {/* TODO: ADD LOGO HERE */}
            <p className="text-lg mb-4">Please sign in to continue.</p>
            <Button variant="contained" className="w-full">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
