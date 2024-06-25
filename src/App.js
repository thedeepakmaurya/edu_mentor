import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import { FirebaseProvider } from "./utils/Firebase";

const App = () => {
  return (
    <FirebaseProvider>
    <div className="sm:visible sm:flex hidden items-center h-screen justify-center">
       <h1 className="font-bold text-2xl text-oxfordBlue underline">Accessible on desktop!</h1>
    </div>
      <div className="sm:hidden md:hidden bg-platinum h-screen flex overflow-scroll">
        <SideMenu />
        <div className="w-[85%] overflow-scroll">
          <Outlet />
        </div>
      </div>
    </FirebaseProvider>
  );
};

export default App;
