import React from "react";
import { Link } from "react-router-dom";
import { FaTachometerAlt, FaUserGraduate } from "react-icons/fa";
import { BsCalendar4Event, BsNewspaper } from "react-icons/bs";
import { CgWorkAlt } from "react-icons/cg";
import { MdAutoStories, MdOutlineApproval } from "react-icons/md";
import { AiOutlineWechat } from "react-icons/ai";

const ASidebar = () => {
  return (
    <div className="bg-green-600  h-screen lg:w-[170px] lg:left-0 w-auto">
      <div className="lg:px-6 lg:py-6 px-4 py-4 flex items-center justify-center">
        <h1 className="text-black text-lg lg:text-2xl font-extrabold cursor-pointer">
          ALUMNI PANEL
        </h1>
      </div>
      <Link to="/AProfile">
        <div className="flex items-center gap-2 lg:py-4 py-2">
          <FaTachometerAlt color="white" />
          <p className="text-sm lg:text-base font-normal text-white cursor-pointer">
            Profile
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
        <Link to="/AAlumni">
          <div className="flex items-center gap-[10px]">
            <FaUserGraduate color="white" />
            <p className="text-[14px] leading-[20px] font-normal text-white ">
              Alumni
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
        <Link to="/AEvents">
          <div className="flex items-center gap-[10px]">
            <BsCalendar4Event color="white" />
            <p className="text-[14px] leading-[20px] font-normal text-white ">
              Events
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
        <Link to="/AJobOpportunities">
          <div className="flex items-center gap-[10px]">
            <CgWorkAlt color="white" />
            <p className="text-[14px] leading-[20px] font-normal text-white ">
              Job Opportunities
            </p>
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
        <Link to="/ANews">
          <div className="flex items-center gap-[10px]">
            <BsNewspaper color="white" />
            <p className="text-[14px] leading-[20px] font-normal text-white ">
              News
            </p>
          </div>
        </Link>
      </div>
      <Link to="/AStories">
        <div className="flex items-center gap-[10px] py-[15px]">
          <MdAutoStories color="white" />
          <p className="text-[14px] leading-[20px] font-normal text-white ">
            Stories
          </p>
        </div>
      </Link>
      <Link to="/AForums">
        <div className="flex items-center gap-[10px] py-[15px]">
          <AiOutlineWechat color="white" />
          <p className="text-[14px] leading-[20px] font-normal text-white ">
            Forums
          </p>
        </div>
      </Link>
      {/* Other links with similar structure */}
    </div>
  );
};

export default ASidebar;
