import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const MoreAdventures = () => {
  const navigate = useNavigate();
  const{features} = useContext(AppContext)
  return (
    <div className="py-20 px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-playfair">
          More Adventures
        </h1>
        <p className="mt-3 text-gray-600">
          Explore unique trips around the globe and find your next unforgettable
          journey.
        </p>
      </div>

      {/* Adventures Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
              navigate(`/more-adventures/${item.id}`);
            }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="h-48 w-full overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-cover hover:scale-105 transition-transform"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 font-playfair mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>{item.location}</span>
                <span>{item.duration}</span>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-900">
                  KES {item.total}
                </p>
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    navigate(`/more-adventures/${item.id}`);
                  }}
                  className="inline-block px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreAdventures;
