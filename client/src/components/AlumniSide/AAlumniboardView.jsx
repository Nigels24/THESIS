import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useHooks } from "./hooks";

// ... (other imports and code)

const AAlumniboardView = () => {
  const {
    fname,
    lname,
    mname,
    avatar,
    isDropdownOpen,
    toggleDropdown,
    imageStyles,
  } = useHooks();

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("logoutlogs");
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    navigate("/");

    // Remove the token from local storage
    // Add any additional logout actions here
  };

  return (
    <div className="flex items-center justify-between h-[70px] shadow-lg lg:px-[25px] px-[20px]">
      <div className="flex items-center rounded-[5px]"></div>
      <div className="flex items-center gap-[15px] relative">
        <div className="flex items-center gap-[25px] border-r-[1px] pr-[25px]">
          {/* <FaRegBell />
          <FaEnvelope /> */}
        </div>
        <div className="flex items-center gap-[15px] relative">
          <p>
            {fname} {mname} {lname}
          </p>
          <div
            className="w-10 h-10 rounded-full cursor-pointer overflow-hidden"
            onClick={toggleDropdown}
          >
            {avatar && (
              <img
                src={avatar}
                alt="profile picture"
                className="rounded-full mx-auto"
                style={imageStyles}
              />
            )}
          </div>

          {isDropdownOpen && (
            <div className="bg-white border z-20 flex flex-col mt-[120px] space-y-[10px] absolute right-0">
              <Link to="/AProfile">
                <p className="cursor-pointer hover:text-blue-500 font-semibold">
                  Profile
                </p>
              </Link>
              <button
                className="cursor-pointer hover:text-blue-500 font-semibold"
                onClick={handleLogout} // Call the handleLogout function on click
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AAlumniboardView;
