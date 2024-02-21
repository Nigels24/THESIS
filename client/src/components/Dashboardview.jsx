import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import image from "../assets/admin.png";

const Dashboardview = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between h-[70px] shadow-lg lg:px-[25px] px-[20px]">
      <div className="flex items-center rounded-[5px]"></div>
      <div className="flex items-center gap-[15px] relative">
        <div className="flex items-center gap-[25px] border-r-[1px] pr-[25px]"></div>
        <div className="flex items-center gap-[15px] relative">
          <p>ADMIN</p>
          <div
            className="w-10 h-10 rounded-full cursor-pointer overflow-hidden"
            onClick={toggleDropdown}
          >
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </div>

          {isDropdownOpen && (
            <div className="bg-white border z-20 flex flex-col mt-[80px] space-y-[10px] absolute right-0">
              <p className="cursor-pointer hover:text-blue-500 font-semibold">
                <button
                  className="cursor-pointer hover:text-blue-500 font-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboardview;
