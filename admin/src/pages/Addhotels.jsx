import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";

const AddHotels = () => {
  const [featureId, setFeatureId] = useState("");
  const [hotels, setHotels] = useState([
    { name: "", price: "", img: null },
  ]);

  const { features,backendurl } = useContext(AdminContext);

  // Add another empty hotel form
  const addHotelForm = () => {
    setHotels([...hotels, { name: "", price: "", img: null }]);
  };

  // Remove a hotel form
  const removeHotelForm = (index) => {
    const updated = [...hotels];
    updated.splice(index, 1);
    setHotels(updated);
  };

  const handleAddHotels = async () => {
    if (!featureId) {
      toast.error("Please select a feature");
      return;
    }

    for (const hotel of hotels) {
      if (!hotel.name || !hotel.price || !hotel.img) {
        toast.error("Each hotel must have a name, price, and image");
        return;
      }
    }

    try {
      const formData = new FormData();
      formData.append("featureId", featureId);

      // Append hotel data
      formData.append(
        "hotels",
        JSON.stringify(
          hotels.map((h) => ({
            name: h.name,
            price: h.price,
          }))
        )
      );

      // Append images (order must match hotels array)
      hotels.forEach((h, i) => {
        formData.append("images", h.img);
      });

      const { data } = await axios.post(
        `${backendurl}/api/admin/add-hotels`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.success) {
        toast.success("Hotels added successfully ✅");
        setHotels([{ name: "", price: "", img: null }]);
        setFeatureId("");
      } else {
        toast.error("Failed to add hotels");
      }
    } catch (error) {
      console.error("addHotels error:", error.message);
      toast.error("Error adding hotels");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Add Hotels to a Feature
      </h2>

      {/* Select Feature */}
      <select
        value={featureId}
        onChange={(e) => setFeatureId(e.target.value)}
        className="w-full border rounded-lg p-3 mb-6"
      >
        <option value="">-- Choose a feature --</option>
        {features.map((f) => (
          <option key={f.id} value={f.id}>
            {f.title}
          </option>
        ))}
      </select>

      {/* Dynamic Hotel Forms */}
      <div className="space-y-6">
        {hotels.map((hotel, index) => (
          <div
            key={index}
            className="border border-gray-300 p-4 rounded-xl relative bg-gray-50"
          >
            {/* Remove button (only if more than 1) */}
            {hotels.length > 1 && (
              <button
                type="button"
                onClick={() => removeHotelForm(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ✖
              </button>
            )}

            {/* Hotel Name */}
            <input
              type="text"
              placeholder="Hotel name"
              value={hotel.name}
              onChange={(e) => {
                const updated = [...hotels];
                updated[index].name = e.target.value;
                setHotels(updated);
              }}
              className="w-full border rounded-lg p-3 mb-3"
            />

            {/* Hotel Price */}
            <input
              type="number"
              placeholder="Price"
              value={hotel.price}
              onChange={(e) => {
                const updated = [...hotels];
                updated[index].price = e.target.value;
                setHotels(updated);
              }}
              className="w-full border rounded-lg p-3 mb-3"
            />

            {/* Hotel Image */}
            <label className="block cursor-pointer w-32">
              <img
                src={
                  hotel.img
                    ? URL.createObjectURL(hotel.img)
                    : assets.uploadArea
                }
                alt="upload"
                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const updated = [...hotels];
                  updated[index].img = e.target.files[0];
                  setHotels(updated);
                }}
              />
            </label>
          </div>
        ))}
      </div>

      {/* Add Another Hotel */}
      <button
        type="button"
        onClick={addHotelForm}
        className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        ➕ Add Another Hotel
      </button>

      {/* Submit */}
      <button
        onClick={handleAddHotels}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
      >
        ✅ Save Hotels
      </button>
    </div>
  );
};

export default AddHotels;
