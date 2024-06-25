import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import { FirebaseProvider } from "./utils/Firebase";
import notify from '../src/assets/img/notify.svg'

const App = () => {
  return (
    <FirebaseProvider>
    <div className="sm:visible sm:flex sm:flex-col gap-5 hidden items-center h-screen justify-center">
      <img src={notify} alt="notify" className="w-44" />
       <h1 className="font-bold text-2xl text-oxfordBlue ">Accessible on desktop!</h1>
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
