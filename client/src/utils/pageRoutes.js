import Clothes from '../pages/Clothes';
import Fit from '../pages/Fit';
import Home from '../pages/Home';
import NoPage from '../pages/NoPage';
import Login from '../pages/Login';

// setting the pages and the components for the routes
export const PAGE_ROUTES = [
  {
    pathname: '/',  // either
    key: 'Home'
  },
  {
    pathname: '/login', // unauthed
    key: 'Login'
  },
  {
    pathname: '/clothes', // unauthed
    key: 'Clothes'
  },
  {
    pathname: '/fit', // authed
    key: 'Fits'
  },
  {
    pathname: '/*',// either
    key: '404'
  }
];
