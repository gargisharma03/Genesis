import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home/Home.jsx';
import Layout from './Landinglayout.jsx';
import Landing from './pages/Landing/Landing.jsx';
import SignIn from './pages/Signin/SignIn.jsx';
import Login from './pages/Signin/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import AppLayout from './Applayout.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/signin", 
        element: <SignIn />,
      },
      {
        path: "/login", 
        element: <Login />,
      },
      
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
