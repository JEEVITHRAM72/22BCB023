import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import LoadingSpinner from './components/LoadingSpinner';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingSpinner message="Initializing application..." />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
