import { createBrowserRouter } from 'react-router-dom';
import AppShell from './App';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';
import RedirectPage from './pages/RedirectPage';

export const router = createBrowserRouter([
  { 
    path: '/', 
    element: <AppShell/>, 
    children: [
      { index: true, element: <ShortenerPage/> },
      { path: 'stats', element: <StatsPage/> },
    ]
  },
  { path: '/:code', element: <RedirectPage/> }
]);
