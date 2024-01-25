import React from "react";
import Dashboardview from "./Dashboardview"; // Update this import
import Sidebar from "./Sidebar"; // Update this import
import { Outlet } from "react-router-dom";
import Main from "./Main";

const Adminpage = () => {
  return (
    <div className="flex">
      <div className="basis-[12%] h-[100vh] border">
        <Sidebar />
      </div>
      <div className="basis-[88%] border h-[100vh] overflow-scroll">
        <Dashboardview />

        <div>
          <div>
            <Main />
          </div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Adminpage;
