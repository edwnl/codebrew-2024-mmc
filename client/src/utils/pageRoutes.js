import Home from '../pages/Home';
import Login from '../pages/Login';
import NoPage from '../pages/NoPage';
import SignUp from '../pages/SignUp';

// setting the pages and the components for the routes
export const pageRoutes = [
  {
    pathname: '/',
    exact: true,
    component: Home,
    key: 'home'
  },
  {
    pathname: '/signup',
    exact: false,
    component: SignUp
  },
  {
    pathname: '/login',
    exact: false,
    component: Login
  },
  {
    pathname: '/*',
    exact: true,
    component: NoPage,
    key: 'page-404'
  }
];
