import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./components/Body";
import SideMenu from "./components/SideMenu";
import Login from "./components/Login";
import Register from "./components/StudentRegistration";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentDashboard from "./components/StudentDashboard";

function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Body />,
      errorElement: <h1>404 Error</h1>,
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
      ]

    }
  ])


  return (
    <div className="flex overflow-hidden">
      <SideMenu />
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
