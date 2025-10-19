import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center border-b bg-white px-4 sm:px-10 py-3 ">
      <div className="flex items-center gap-2 text-xs">
      <img
          className="w-24 md:w-44 md:mb-1 h-24  cursor-pointer"
          onClick={() => navigate("/")}
          src={assets.admin_logo}
          alt="Company Logo"
        />
      </div>
      <button className="bg-indigo-500 cursor-pointer text-white text-sm px-10 py-2 rounded-full ">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
