import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import { FirebaseProvider } from "./utils/Firebase";

const App = () => {
  return (
    <FirebaseProvider>
      <div className="bg-platinum h-screen flex overflow-scroll">
        <SideMenu />
        <div className="w-[85%] overflow-scroll">
          <Outlet />
        </div>
      </div>
    </FirebaseProvider>
  );
};

export default App;
