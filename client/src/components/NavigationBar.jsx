import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { signOut, getAuth } from 'firebase/auth';
import { useAuth } from '../auth/AuthContext'; // Import the signOut function from firebase/auth
import { NAV_ROUTES } from '../utils/navRoutes';

const MenuButtonMobile = (
  <svg
    className="w-5 h-5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 17 14"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1 1h15M1 7h15M1 13h15"
    />
  </svg>
);

const NavigationBar = () => {
  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: 'Customers', path: 'javascript:void(0)' },
    { title: 'Careers', path: 'javascript:void(0)' },
    { title: 'Guides', path: 'javascript:void(0)' },
    { title: 'Partners', path: 'javascript:void(0)' }
  ];

  const { isLoggedIn, isLoading } = useAuth();
  const auth = getAuth();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out successfully');
      })
      .catch((error) => {
        console.error('Error logging out:', error.message);
      });
  };
  // flex flex-col items-center justify-center mx-auto p-4 border-b-2 border-black
  return (
    <>
      <nav className="bg-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 ">
            <Logo className={'text-3xl pt-5'} />
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 ">
            <button
              onClick={handleLogout}
              type="button"
              className="text-white bg-black hover:bg-gray-800 rounded-lg text-sm px-4 py-2 text-center"
            >
              Logout
            </button>
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:text-gray-500"
            >
              {MenuButtonMobile}
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0">
              {NAV_ROUTES.map((item) => (
                <li key={item.id}>
                  <Link to={item.to} tabIndex={1} className="block py-2 px-3 md:p-0">
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
