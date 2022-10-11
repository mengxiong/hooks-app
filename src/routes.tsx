import type { RouteObject } from 'react-router-dom';
// import MenuBookIcon from '@mui/icons-material/MenuBook';
import { AuthRequired } from './auth';
import { LoginPage } from './pages/login';
import { Layout } from './layout/Layout';
// import { Textbook } from './pages/textbook';
// import { Units } from './pages/textbook/Units';

export interface RouteHandle {
  nav?: string;
  icon?: React.ReactNode;
  breadcrumb?: string | boolean;
}

export const routes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: (
      <AuthRequired>
        <Layout />
      </AuthRequired>
    ),
    children: [
      // {
      //   path: 'textbook',
      //   element: <Textbook />,
      //   handle: {
      //     nav: '课程管理',
      //     icon: <MenuBookIcon />,
      //     breadcrumb: true,
      //   },
      // },
      // {
      //   path: 'textbook/:id',
      //   element: <Units />,
      // },
    ],
  },
];
