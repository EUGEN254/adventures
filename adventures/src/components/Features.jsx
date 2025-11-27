import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Features = () => {
  const navigate = useNavigate();
  const { features } = useContext(AppContext);

  return (
    <section className="py-16 bg-gray-10">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-semibold text-gray-800">Features</h1>
        <p className="mt-2 text-gray-600 text-sm max-w-md mx-auto">
          Simply browse through our extensive list of features and schedule your booking with ease.
        </p>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
        {features.map((f) => (
          <div
            key={f.id}
            onClick={() => {
              navigate(`/more-adventures/${f.id}`);
              scrollTo(0, 0);
            }}
            className="p-6 rounded-2xl shadow-md bg-white hover:translate-y-[-10px] transition-all duration-300 flex flex-col items-center text-center cursor-pointer"
          >
            <img
              className="rounded-full w-24 h-24 object-cover mb-6"
              src={f.img}
              alt={f.title}
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {f.title}
            </h3>
            <p className="text-gray-600 text-sm">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
