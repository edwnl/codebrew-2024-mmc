import Home from '../pages/Home';
import NoPage from '../pages/NoPage';

// setting the pages and the components for the routes
export const pageRoutes = [
  {
    pathname: '/',
    exact: true,
    component: Home,
    key: 'home'
  },
  {
    pathname: '/*',
    exact: true,
    component: NoPage,
    key: 'page-404'
  }
];
