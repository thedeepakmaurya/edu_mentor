import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Body from "./Body";
import SideMenu from "./components/SideMenu";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";

function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Body/>,
      errorElement: <h1>404 Error</h1>,
      children: [
        {
          path: 'login',
          element: <Login/>
        },
        {
          path: 'register',
          element: <Register/>
        },
        {
          path: 'about',
          element: <About/>
        }
      ]
      
    }
  ])


  return (
    <div className="flex">
      <SideMenu />
      <RouterProvider router={appRouter}/>
    </div>
  );
}

export default App;
