import { RouteObject } from 'react-router-dom';
import Index from '@/pages/Index';
import Resume from '@/pages/Resume';
import NotFound from '@/pages/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/resume',
    element: <Resume />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]; 