import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AppLayout from '@/layouts/AppLayout';

// Importing the main application page
import Guest from '@/pages/guest';
import Login from '@/pages/login';
import Home from '@/pages/home';
import Profile from '@/pages/profile';
import Settings from '@/pages/settings';
import Users from '@/pages/users';

// Importing the remote page
import Receiving from '@/pages/receiving';
import RedirectIfAuthenticated from './RedirectIfAuthenticated';

export const router = createBrowserRouter(
  [
    {
      path: '/guest',
      element: <AppLayout />,
      children: [{ index: true, element: <Guest /> }],
    },
    {
      path: '/login',
      element: (
        <RedirectIfAuthenticated>
          <Login />
        </RedirectIfAuthenticated>
      ),
    },
    {
      element: (
        <PrivateRoute>
          <AppLayout />
        </PrivateRoute>
      ),
      children: [
        { path: '/', element: <Home /> },
        { path: '/profile', element: <Profile /> },
        { path: '/users', element: <Users /> },
        { path: '/settings', element: <Settings /> },

        //remote path
        { path: '/receiving/*', element: <Receiving /> },
      ],
    },
  ],
  {
    basename: '/',
  }
);
