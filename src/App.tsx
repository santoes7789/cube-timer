import { createBrowserRouter, Navigate, Route, RouterProvider, Routes } from 'react-router-dom';
import Timer from '@/pages/Timer/Timer';
import Stats from '@/pages/Stats/Stats';
import Login from '@/pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import Forum from '@/pages/Forum/Forum';
import Settings from '@/pages/Settings/Settings';
import AuthProvider from '@/contexts/AuthContext';
import './App.css'
import Layout from './Layout';
import DBProvider from '@/contexts/DBContext';
import SettingsProvider from '@/contexts/SettingsContext';
import ToastProvider from '@/contexts/ToastContext';
import CreateThread from '@/pages/Forum/CreateThread';
import ThreadPage from '@/pages/Forum/ThreadPage';
import StatsPopup from '@/pages/Stats/StatsPopup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/timer" replace /> },
      {
        path: "timer",
        element: <Timer />,
        children: [
          {
            path: "settings",
            element: <Settings />
          },
          {
            path: "stats",
            element: <StatsPopup />
          }
        ]
      },
      { path: "stats", element: <Stats /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "forum",
        element: <Forum />,
        children: [
          {
            path: "settings",
            element: <Settings />
          }
        ]
      },
      { path: "forum/create", element: <CreateThread /> },
      { path: "forum/:threadId", element: <ThreadPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastProvider>
        <AuthProvider>
          <DBProvider>
            <SettingsProvider>
              <RouterProvider router={router} />
            </SettingsProvider>
          </DBProvider>
        </AuthProvider>
      </ToastProvider>
    </>

  )
}

export default App;
