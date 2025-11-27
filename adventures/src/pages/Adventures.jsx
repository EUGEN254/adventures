import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; 
import { AppContext } from "../context/AppContext";
import VerifiedHotels from "../components/VerifiedHotels";

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];

function roundUpToNext30(date) {
  const d = new Date(date);
  d.setSeconds(0, 0);
  const minutes = d.getMinutes();
  const remainder = minutes % 30;
  if (remainder === 0) return d;
  d.setMinutes(minutes + (30 - remainder));
  return d;
}

const MAX_BOOKINGS_PER_SLOT = 5;
const generateSlotsForNext7Days = (slots_booked = {}) => {
  const result = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() + i);

    const dayStart = new Date(day);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(day);
    dayEnd.setHours(24, 0, 0, 0);

    let currentStart;
    if (i === 0) {
      const now = new Date();
      const candidate = roundUpToNext30(now);
      currentStart = candidate > dayStart ? candidate : dayStart;
    } else {
      currentStart = new Date(dayStart);
    }

    const dayKey = `${day.getDate()}_${day.getMonth() + 1}_${day.getFullYear()}`;
    const daySlots = [];
    const cur = new Date(currentStart);

    while (cur < dayEnd) {
      const formattedTime = cur.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const bookedCount = slots_booked?.[dayKey]?.[formattedTime] || 0;

      if (bookedCount < MAX_BOOKINGS_PER_SLOT) {
        daySlots.push({
          dateTime: new Date(cur),
          time: formattedTime,
          bookedCount,
        });
      }

      cur.setMinutes(cur.getMinutes() + 30);
    }

    result.push(daySlots);
  }

  return result;
};

const Adventures = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currencySymbol, features } = useContext(AppContext);
  const [user, setUser] = useState(true);


  //  get current record either from features or adventures (from DB context)
  const current =
    features.find((f) => f.id === Number(id))

    console.log("Here is the current",current);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  useEffect(() => {
    if (!current) {
      setDocInfo(null);
      setDocSlots([]);
      return;
    }
    setDocInfo({ ...current, slots_booked: current.slots_booked || {} });
  }, [current]);

  useEffect(() => {
    if (!docInfo) return;
    const slots = generateSlotsForNext7Days(docInfo.slots_booked);
    setDocSlots(slots);

    const firstDayWithSlot = slots.findIndex((day) => day && day.length > 0);
    setSlotIndex(firstDayWithSlot === -1 ? 0 : firstDayWithSlot);

    const defaultTime =
      slots[firstDayWithSlot] && slots[firstDayWithSlot][0]
        ? slots[firstDayWithSlot][0].time
        : "";
    setSlotTime(defaultTime);
  }, [docInfo]);

  if (!current) {
    return (
      <div className="p-10 text-center text-gray-600">
        <h2 className="text-xl font-bold">Adventure not found</h2>
      </div>
    );
  }

  const handleBook = async () => {
    if (!user) {
      return navigate("/login");
    }
    if (!docSlots || !docSlots[slotIndex] || !slotTime) {
      alert("Please select a date and time");
      return;
    }

    const selectedDaySlot = docSlots[slotIndex][0];
    if (!selectedDaySlot) {
      alert("Selected day has no available slots");
      return;
    }

    const date = selectedDaySlot.dateTime;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const slotDateKey = `${day}_${month}_${year}`;

    setDocInfo((prev) => {
      const next = { ...prev };
      if (!next.slots_booked) next.slots_booked = {};
      if (!next.slots_booked[slotDateKey]) next.slots_booked[slotDateKey] = {};
      const currentCount = next.slots_booked[slotDateKey][slotTime] || 0;
      next.slots_booked[slotDateKey][slotTime] = currentCount + 1;
      return next;
    });

    alert(`Booked ${current.title} on ${slotDateKey} at ${slotTime}`);
  };

  return (
    <div className="mt-5 px-4 md:px-8 lg:px-16">
      {/* top area */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-lg"
            src={current.img}
            alt={current.title}
          />
        </div>

        <div className="flex-1 border border-gray-200 rounded-lg p-6 bg-white">
          <p className="flex items-center gap-2 font-medium text-gray-900">
            {current.title}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {current.description || current.desc}
            </p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Booking Fee{" "}
            <span className="text-gray-600">
              {currencySymbol} {current.total || current.price}
            </span>
          </p>

          <button
            onClick={() => {
              const el = document.getElementById("adventure-slots");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-white bg-indigo-500 px-8 py-3 rounded-full mt-4 md:hidden"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* booking slots UI */}
      <div id="adventure-slots" className="mt-6">
        <p className="text-lg font-medium text-gray-700">Booking Slots</p>

        {/* 7-day date list */}
        <div className="flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2">
          {docSlots.length > 0 &&
            docSlots.map((dayArr, idx) => {
              const dayDate = new Date();
              dayDate.setDate(new Date().getDate() + idx);

              return (
                <div
                  key={idx}
                  onClick={() => setSlotIndex(idx)}
                  className={`text-center py-4 px-3 min-w-[72px] rounded-full cursor-pointer transition ${
                    slotIndex === idx
                      ? "bg-indigo-500 text-white"
                      : "border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <p className="text-xs">{daysOfWeek[dayDate.getDay()]}</p>
                  <p className="text-sm">{dayDate.getDate()}</p>
                </div>
              );
            })}
        </div>

        {/* times */}
        <div className="flex items-center gap-3 w-full overflow-x-auto mt-4 pb-2">
          {docSlots.length > 0 &&
            (docSlots[slotIndex] && docSlots[slotIndex].length > 0 ? (
              docSlots[slotIndex].map((slot, i) => (
                <button
                  key={i}
                  onClick={() => setSlotTime(slot.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition ${
                    slot.time === slotTime
                      ? "bg-indigo-500 text-white"
                      : "border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <p className="text-gray-500 italic">
                No slots available for {daysOfWeek[new Date().getDay()]}
              </p>
            ))}
        </div>

        <VerifiedHotels adventureId={id} />
        
        

        <button
          onClick={handleBook}
          className="bg-indigo-500 mt-6 text-white text-sm font-medium px-10 py-3 rounded-full hover:bg-indigo-600 transition"
        >
          Book An Adventure
        </button>
      </div>

  
        
    </div>
  );
};

export default Adventures;
