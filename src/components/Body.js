import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "./SideMenu";

const Body = () => {
  console.log('successfull');
  return (
    <div className="bg-platinum flex overflow-scroll">
      <SideMenu />
      <div className="w-[85%]">
      <Outlet />
      </div>
    </div>
  );
};

export default Body;
