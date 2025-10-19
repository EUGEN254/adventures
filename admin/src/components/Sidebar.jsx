import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";


const Sidebar = () => {
  const [aToken ,setAToken] = useState(true)

  return (
    <div className="min-h-screen  bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-indigo-500" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-indigo-500" : ""
              }`
            }
            to={"/add-feature"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p>Add-Feature</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-indigo-500" : ""
              }`
            }
            to={"/add-hotels"}
          >
            <img src={assets.add_icon} alt="" />
            <p>Add Hotel</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-indigo-500" : ""
              }`
            }
            to={"/list-hotels"}
          >
            <img src={assets.people_icon} alt="" />
            <p>List-Hotel</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
