import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const VerifiedHotels = ({ adventureId }) => {

  console.log(adventureId);
  const { currencySymbol, backendUrl } = useContext(AppContext);
  const [selectedHotel, setSelectedHotel] = useState("");
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/admin/get-hotels`, {
          withCredentials: true,
        });

        if (data.success) {
          const filtered = adventureId
            ? data.data.filter((h) => h.feature_id === Number(adventureId))
            : data.data;
          setHotels(filtered);
        } else {
          toast.error("Failed to fetch hotels");
        }
        console.log(hotels);
        
      } catch (error) {
        console.error("fetchHotels error:", error.message);
        toast.error("Error fetching hotels");
      }
    };

    fetchHotels();
  }, [backendUrl, adventureId]);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Verified Hotels</h2>

      {/* Dropdown Selector */}
      <div className="mb-6">
        <label
          htmlFor="hotel-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select a Hotel
        </label>
        <select
          id="hotel-select"
          value={selectedHotel}
          onChange={(e) => setSelectedHotel(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        >
          <option value="">-- Choose a hotel --</option>
          {hotels.map((hotel) => (
            <option key={hotel.id} value={hotel.name}>
              {hotel.name} — {currencySymbol}
              {hotel.price}
            </option>
          ))}
        </select>
      </div>

      {/* Hotel Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            onClick={() => setSelectedHotel(hotel.name)}
            className={`cursor-pointer border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1 ${
              selectedHotel === hotel.name ? "ring-2 ring-indigo-500" : ""
            }`}
          >
            <img
              src={`${backendUrl}${hotel.image}`}
              alt={hotel.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">{hotel.name}</p>
                <img className="w-5" src={assets.verified_icon} alt="verified" />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {currencySymbol} {hotel.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerifiedHotels;
