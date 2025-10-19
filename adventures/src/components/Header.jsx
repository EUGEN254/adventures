import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div
      className="
        relative
        mt-10
        rounded-2xl
        bg-no-repeat bg-cover
        my-6 mx-auto
        h-70 sm:h-72 md:h-[30vw]
        overflow-hidden
      "
      style={{ backgroundImage: `url(${assets.explorebeach})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

      <div
        className="
          absolute 
          flex flex-col items-start
          pl-10
          gap-4
          md:top-1/6 left-5
          max-w-[80%] sm:max-w-[65%] md:max-w-[50%]
          animate-fade-in
        "
      >
        <h2
          className="
            font-bold text-white drop-shadow-lg
            text-xl sm:text-2xl  md:text-[max(2vw,28px)]
            md:mb-1
            mt-7
            
            
          "
        >
          Explore your favourite place here
        </h2>

        <p
          className="
            text-white drop-shadow-md
            text-xs sm:text-sm md:text-base
            leading-relaxed

          "
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          veniam accusamus aliquam laboriosam officia sequi ipsa temporibus
       
        </p>

        <button
          className="
            bg-white text-gray-700 font-medium
            rounded-full shadow-md
            px-5 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3
            text-sm sm:text-base
             md:mt-10
            hover:bg-blue-600 hover:text-white transition
          "
        >
          Find Places
        </button>
      </div>
    </div>
  );
};

export default Header;
