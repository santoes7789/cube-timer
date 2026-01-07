import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import Timer from '@/pages/Timer/Timer';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import './App.css'
import Layout from './Layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/timer" replace /> },
      { path: "timer", element: <Timer /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
