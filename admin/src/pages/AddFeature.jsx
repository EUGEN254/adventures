import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const AddFeature = () => {
  const [featureImg, setFeatureImg] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [total, setTotal] = useState("");
  const [slotsBooked, setSlotsBooked] = useState({});

  const [currentDate, setCurrentDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCount, setSelectedCount] = useState("");

  const { backendurl } = useContext(AdminContext);

  // Add single slot to slotsBooked object
  const handleAddSlot = () => {
    if (!currentDate || !selectedTime || !selectedCount) {
      return toast.error("Select date, time, and slots count");
    }

    setSlotsBooked((prev) => {
      const prevDay = prev[currentDate] || {};
      return {
        ...prev,
        [currentDate]: {
          ...prevDay,
          [selectedTime]: Number(selectedCount),
        },
      };
    });

    // Clear selections
    setSelectedTime("");
    setSelectedCount("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!featureImg) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("img", featureImg);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("total", total);
    formData.append("slots_booked", JSON.stringify(slotsBooked));

    try {
      const { data } = await axios.post(
        `${backendurl}/api/admin/add-feature`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success(data.message);
        setFeatureImg(null);
        setTitle("");
        setDescription("");
        setTotal("");
        setSlotsBooked({});
        setCurrentDate("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding feature");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Feature</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        {/* Image Upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-600">
          <label htmlFor="feature-img">
            <img
              className="cursor-pointer rounded-md bg-gray-100 w-24 h-24 object-cover"
              src={featureImg ? URL.createObjectURL(featureImg) : assets.upload_area}
              alt="Feature preview"
            />
          </label>
          <input
            onChange={(e) => setFeatureImg(e.target.files[0])}
            type="file"
            id="feature-img"
            hidden
          />
          <p>Upload feature image</p>
        </div>

        {/* Inputs */}
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-500">
          <div className="w-full lg:flex-1 flex flex-col gap-6">
            <div>
              <p>Title</p>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Feature title"
                required
              />
            </div>

            <div>
              <p>Description</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded px-3 py-2"
                placeholder="Feature description"
                rows={5}
                required
              />
            </div>

            <div>
              <p>Amount For Feature</p>
              <input
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Total amount"
                required
              />
            </div>

            {/* Slots selection */}
            <div className="flex flex-col gap-2 mt-4">
              <p className="font-medium">Optional Slots Booked</p>
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="border px-2 py-1 rounded"
              />

              <div className="flex gap-2">
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="">Select time</option>
                  <option value="10:00">10:00</option>
                  <option value="10:30">10:30</option>
                  <option value="11:00">11:00</option>
                  <option value="11:30">11:30</option>
                  <option value="12:00">12:00</option>
                </select>

                <select
                  value={selectedCount}
                  onChange={(e) => setSelectedCount(e.target.value)}
                  className="border px-2 py-1 rounded"
                >
                  <option value="">Slots</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={handleAddSlot}
                >
                  Add Slot
                </button>
              </div>

              {/* Preview added slots */}
              {Object.keys(slotsBooked).length > 0 && (
                <div className="mt-2 text-gray-700">
                  <p className="font-medium">Current Slots:</p>
                  <pre className="bg-gray-100 p-2 rounded">
                    {JSON.stringify(slotsBooked, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-500 px-10 py-3 mt-4 rounded cursor-pointer text-white hover:bg-indigo-600 transition"
        >
          Add Feature
        </button>
      </div>
    </form>
  );
};

export default AddFeature;
