import { RouteObject } from 'react-router-dom';
import Index from '@/pages/Index';
import Resume from '@/pages/Resume';
import Kristel from '@/pages/Kristel';
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
    path: '/kristel',
    element: <Kristel />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]; 