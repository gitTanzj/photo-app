import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import { Entry } from './pages/Entry';
import { Profile } from './components/Profile';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { UserContextProvider } from './context/userContext';
import { Gallery } from './components/Gallery';
import { Timeline } from './components/Timeline';
import { Image } from './components/Image';

// Routeid frontendi jaoks
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App/>}>
        <Route index element={<Timeline/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="gallery">
          <Route index element={<Gallery/>}/>
          <Route path="gallery/:user_id" element={<Gallery/>}/>
        </Route>
        <Route path=":image_id" element={<Image/>}></Route>
      </Route>
      <Route path="/login" element={<Entry/>}/>
    </Route>
  )
)


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
  </React.StrictMode>
);

