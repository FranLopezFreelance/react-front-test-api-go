/* eslint-disable import/no-anonymous-default-export */
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Error404 from '../pages/Error404';
import Users from '../pages/Users/Users';

export default [
  {
    path: '/',
    exact: true,
    page: Home,
  },
  {
    path: '/usuarios',
    exact: true,
    page: Users,
  },
  {
    path: '/perfil/:id',
    exact: true,
    page: Profile,
  },
  {
    path: '*',
    page: Error404,
  },
];
