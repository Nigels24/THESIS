import React from 'react';
import ASidebar from './ASidebar';
import AAlumniboardView from './AAlumniboardView';
import { Outlet } from "react-router-dom";

const AAlumnipage = () => {
  return (
    <div className="flex">
      <div className="basis-[12%] h-[100vh] border">
        <ASidebar />
      </div>
      <div className="basis-[88%] border h-[100vh] overflow-scroll">
        <AAlumniboardView />
        
        <div>
          <Outlet>
            
          </Outlet>
        </div>
      </div>
    </div>
  )
}

export default AAlumnipage;
