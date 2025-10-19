import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#F6F9FC] text-gray-600 mt-10 px-6 md:px-12 lg:px-20 xl:px-32">
      {/* --- Top Grid --- */}
      <div className="max-w-screen-xl mx-auto flex flex-col sm:grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 text-sm py-12">
        {/* --- Left (Logo & Socials) --- */}
        <div className="space-y-5 md:-ml-6">
        <img
  src={assets.logo}
  alt="Logo"
  className="h-22 -mt-11 md:h-16 md:-mt-7 invert opacity-80 cursor-pointer"
/>


          <p className="text-sm leading-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis
            omnis dignissimos, magni suscipit ullam sit neque a sunt inventore,
            facere earum tempora dolores numquam laboriosam dolore dolorum
            exercitationem voluptates perspiciatis.
          </p>
          <div className="flex items-center gap-4">
            <img
              src={assets.instagramIcon}
              alt="Instagram"
              className="w-6 hover:opacity-70 transition cursor-pointer"
            />
            <img
              src={assets.facebookIcon}
              alt="Facebook"
              className="w-6 hover:opacity-70 transition cursor-pointer"
            />
            <img
              src={assets.twitterIcon}
              alt="Twitter"
              className="w-6 hover:opacity-70 transition cursor-pointer"
            />
          </div>
        </div>

        {/* --- Company --- */}
        <div className="space-y-3">
          <p className="font-playfair text-lg text-gray-800 relative inline-block group cursor-pointer">
            COMPANY
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </p>
          <ul className="flex flex-col gap-2">
            {["About", "Careers", "Press", "Blog", "Partners"].map((item) => (
              <li
                key={item}
                className="hover:text-indigo-500 transition-colors cursor-pointer"
              >
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Support --- */}
        <div className="space-y-3">
          <p className="font-playfair text-lg text-gray-800 relative inline-block group cursor-pointer">
            SUPPORT
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </p>
          <ul className="flex flex-col gap-2">
            {["Safety Information", "Contact Us"].map((item) => (
              <li
                key={item}
                className="hover:text-indigo-500 transition-colors cursor-pointer"
              >
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* --- Newsletter --- */}
        <div className="space-y-3">
          <p className="font-playfair text-lg text-gray-800 relative inline-block group cursor-pointer">
            STAY UPDATED
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
          </p>
          <p className="text-sm">
            Subscribe to our newsletter for inspiration and offers.
          </p>
          <div className="flex items-center">
            <input
              type="email"
              className="bg-white rounded-l-md border border-gray-300 h-9 px-3 w-48 outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Your email"
            />
            <button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 h-9 w-9 rounded-r-md transition">
              <img
                src={assets.arrowIcon}
                alt="Submit"
                className="w-3.5 invert"
              />
            </button>
          </div>
        </div>
      </div>

      {/* --- Bottom --- */}
      <hr className="border-gray-300" />
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-between py-6 text-sm">
        <p>
          &copy; {new Date().getFullYear()} Adventures. All rights reserved.
        </p>
        <ul className="flex items-center gap-6">
          <li>
            <a href="#" className="hover:text-indigo-500 transition-colors">
              Privacy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-indigo-500 transition-colors">
              Terms
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
