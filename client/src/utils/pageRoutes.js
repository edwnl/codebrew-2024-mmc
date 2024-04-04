import Clothes from '../pages/Clothes';
import Fit from '../pages/Fit';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NoPage from '../pages/NoPage';
import SignUp from '../pages/SignUp';

// setting the pages and the components for the routes
export const PAGE_ROUTES = [
  {
    pathname: '/',
    exact: true,
    component: Home,
    key: 'home'
  },
  {
    pathname: '/signup',
    exact: false,
    component: SignUp,
    key: 'signup'
  },
  {
    pathname: '/login',
    exact: false,
    component: Login,
    key: 'login'
  },
  {
    pathname: '/clothes',
    exact: false,
    component: Clothes,
    key: 'clothes'
  },
  {
    pathname: '/fit',
    exact: false,
    component: Fit,
    key: 'fit'
  },
  {
    pathname: '/*',
    exact: true,
    component: NoPage,
    key: 'page-404'
  }
];
