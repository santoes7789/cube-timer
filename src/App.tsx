import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import Timer from '@/pages/Timer/Timer';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import Profile from '@/pages/Profile/Profile';
import AuthProvider from '@/contexts/AuthContext';
import './App.css'
import Layout from './Layout';
import DBProvider from './contexts/DBContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/timer" replace /> },
      { path: "timer", element: <Timer /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Timer /> },
    ],
  },
]);

export const dbWorker = new Worker(
  new URL("./db-worker.ts", import.meta.url),
  { type: "module"}
);

function App() {
  return (
    <>
      <AuthProvider>
        <DBProvider>
          <RouterProvider router={router} />
        </DBProvider>
      </AuthProvider>
    </>

  )
}

export default App;
