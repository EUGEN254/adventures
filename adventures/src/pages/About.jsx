import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[350px]"
          src={assets.about_image}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 w-2/4 text-sm text-gray-600">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
            quibusdam optio omnis. Numquam quaerat eligendi ut suscipit illum
            quas cumque quos inventore ex placeat, est dolor ducimus sed
            molestias repellendus!
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Accusantium atque ipsum, recusandae aperiam ut aliquam fugiat
            praesentium quibusdam doloribus laborum magni quisquam quam ea
            inventore perferendis eum assumenda mollitia labore.
          </p>
          <p className="text-gray-800">Our Vision</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
            commodi ullam magnam ipsa pariatur quibusdam sit repellat itaque
            autem, veniam nostrum, assumenda doloribus labore unde blanditiis
            accusamus, facere qui voluptatibus.
          </p>
        </div>
      </div>
      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-400 font-semibold">CHOOSE US</span>{" "}
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border-none px-10 md:ox-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Effecieny</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. .</p>
        </div>
        <div className="border-none px-10 md:ox-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenienc</b>
          <p>Modi est a voluptatem quas esse libero. Deserunt,</p>
        </div>
        <div className="border-none px-10 md:ox-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-indigo-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization</b>
          <p> velit tempora ipsum praesentium autem non earum </p>
        </div>
      </div>
    </div>
  );
};

export default About;
