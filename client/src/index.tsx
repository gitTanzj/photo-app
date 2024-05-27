import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Entry } from './pages/Entry';
import { Profile } from './pages/Profile';


// Routeid frontendi jaoks
const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path: '/login',
    element: <Entry/>
  },
  {
    path: '/:username',
    element: <Profile/>
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

