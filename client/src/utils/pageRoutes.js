import Clothes from '../pages/Clothes';
import Fit from '../pages/Fit';
import Home from '../pages/Home';
import NoPage from '../pages/NoPage';
import Login from '../pages/Login';

// setting the pages and the components for the routes
export const PAGE_ROUTES = [
  {
    pathname: '/',
    exact: true,
    component: Home,
    key: 'Home'
  },
  {
    pathname: '/login',
    exact: false,
    component: Login,
    key: 'Login'
  },
  {
    pathname: '/clothes',
    exact: false,
    component: Clothes,
    key: 'Clothes'
  },
  {
    pathname: '/fit',
    exact: false,
    component: Fit,
    key: 'Fits'
  },
  {
    pathname: '/*',
    exact: true,
    component: NoPage,
    key: '404'
  }
];
