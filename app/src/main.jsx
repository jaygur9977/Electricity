import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'
import Navbar from './components/Navbar'
import Home from './components/Home';
import History from './components/History';
import Appliances from'./components/Appliances';
import Dashboard from './components/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />, 
  },
  {
    path:"/history",
    element:<History/>
  },
  {
    path:"/appliances",
    element:<Appliances/>
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },

 
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar></Navbar>
    <RouterProvider router={router} />
  </StrictMode>,
)
