import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/StudentRegistration';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import App from './App';
import Error from './components/Error';
import CurrentUser from './components/CurrentUser';

const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <Error/>,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },
        {
          path: 'admin',
          element: <AdminDashboard />
        },
        {
          path: 'teacher',
          element: <TeacherDashboard />
        },
        {
          path: 'Student',
          element: <StudentDashboard />
        },
        {
            path: 'user',
            element: <CurrentUser />
          },
      ]

    }
  ])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter} />);

