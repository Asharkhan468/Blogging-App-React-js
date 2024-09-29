import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Login/Login.jsx'
import Register from './Pages/Register/Register.jsx'
import Profile from './Pages/Profile/Profile.jsx'
import ProtectRoutes from './ProtectRoutes.jsx'
import Dashboard from './Pages/Dashboard/Dashboard.jsx'
import SingleBlog from './Pages/SingleBlog/SingleBlog.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/profile",
        element: <ProtectRoutes component={<Profile />} />
      },
      {
        path: "/dashboard",
        element: <ProtectRoutes component={<Dashboard />} />
      },
      {
        path:'/singleblog',
        element:<SingleBlog/>
      }
     
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
  </RouterProvider>
)
