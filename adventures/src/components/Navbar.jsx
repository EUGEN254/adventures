import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaUser, FaSignOutAlt, FaEnvelope } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { user,loading,logout } = useContext(AppContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center  min-h-screen">
        <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin [animation-duration:5s]"></div>
      </div>
    );
  }
  
  

  return (
    <>
      <div
        className="
      flex items-center md:h-19  md:mt-2 justify-between md:py-4 border-b border-gray-600"
      >
        {/* Logo */}
        <img
          className="w-24 md:w-44 md:mb-1 h-24  cursor-pointer"
          onClick={() => navigate("/")}
          src={assets.logo}
          alt="Company Logo"
        />
        {/* Center nav links */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          <NavLink to="/">
            <li className="py-1">Home</li>
            <hr className="border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/my-bookings">
            <li className="py-1">My Bookings</li>
            <hr className="border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/more-adventures">
            <li className="py-1">More Adventures</li>
            <hr className="border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden" />
          </NavLink>
          <NavLink to="/about">
            <li className="py-1">About</li>
            <hr className="border-none outline-none h-0.5 bg-indigo-500 w-3/5 m-auto hidden" />
          </NavLink>
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2 group relative cursor-pointer">
              <img
                className="w-8 rounded-full"
                src={user.image || assets.profile_pic}
                alt="Profile"
              />
              <img
                className="w-2.5"
                src={assets.dropdown_icon}
                alt="Dropdown"
              />
              <div className="absolute pt-14 top-0 right-0 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 hover:text-indigo-400"
                  >
                    <FaUser className="text-base" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/my-bookings"
                    className="hover:text-indigo-400 flex items-center gap-2 "
                  >
                    <FaEnvelope className="text-base" />
                    <span> My Bookings </span>
                  </Link>
                  <Link
                    className="hover:text-indigo-400 flex items-center gap-2 "
                  >
                    <FaSignOutAlt className="text-base" />
                    <span
                    onClick={logout}
                    > Logout</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="text-white bg-indigo-500 px-8 py-3 rounded-full hidden md:block"
            >
              Get started
            </button>
          )}

          {/* mobile menu icon */}
          <img
            onClick={() => setShowMenu(true)}
            className="w-6 md:hidden"
            src={assets.menu_icon}
            alt=""
          />
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`
    fixed inset-0 w-full h-full z-20 bg-white 
    transform transition-transform duration-300 ease-in-out
    ${showMenu ? "translate-x-0" : "translate-x-full"}
    md:hidden
  `}
      >
        <div className="flex items-right justify-between px-5 py-7 border-b">
          {/* Close icon */}
          <button
            onClick={() => setShowMenu(false)}
            className="absolute top-4 right-5"
          >
            <img
              src={assets.cross_icon}
              alt="Close menu"
              className="w-7 cursor-pointer"
            />
          </button>
        </div>

        <ul className="flex flex-col items-center gap-4 mt-5 px-5 font-medium text-lg">
          <NavLink onClick={() => setShowMenu(false)} to={"/"}>
            <p className="px-4 py-2 rounded inline-block">Home</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to={"/my-bookings"}>
            <p className="px-4 py-2 rounded inline-block">My Bookings</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to={"/more-adventures"}>
            <p className="px-4 py-2 rounded inline-block">More Adventures</p>
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to={"/about"}>
            <p className="px-4 py-2 rounded inline-block">About</p>
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
