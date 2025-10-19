import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { userBookings } from "../assets/assets";

const Mybookings = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const OrderStatusBadge = ({ paid }) => (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
        paid ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
      }`}
    >
      {paid ? (
        <>
          <FaCheckCircle className="mr-1.5 h-3 w-3 text-green-500" />
          Paid
        </>
      ) : (
        <>
          <FaTimesCircle className="mr-1.5 h-3 w-3 text-red-500" />
          Pending
        </>
      )}
    </span>
  );

  return (
    <div className="py-28 px-4 md:x-16 lg:px-24 xl:px-32 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">
            My Bookings
          </h1>
          <p className="mt-2 text-gray-600">
            Track and manage your recent bookings made from adventures website
          </p>
        </div>

        {/* search +filter bar */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {/* search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
              type="text"
              placeholder="Search your bookings "
            />
          </div>

          {/* Status Filter */}
          <div>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500">
              <option value="all">Bookings</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* date filters */}
          <div className="flex space-x-2">
            <input
              type="date"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
            <input
              type="date"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
            />
          </div>
        </div>

        {/* booking list */}
        <div className="space-y-4">
          {userBookings.length > 0 ? (
            userBookings.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* booking info */}
                    <div className="flex items-start space-x-4 flex-1">
                      {/* left side  */}
                      <div className="flex-shrink-0">
                        <img
                          className="h-24 w-24 rounded-lg object-cover border border-gray-200"
                          src={item.image}
                          alt=""
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {item.place}
                        </h3>
                        <h3 className="flex flex-row gap-1 text-sm text-gray-500 mt-1">
                          <FaCalendarAlt className="text-indigo-500" />
                          {item.date}
                        </h3>

                        <h3 className="flex flex-row gap-1  text-sm text-gray-500 mt-1">
                          <FaMapMarkerAlt className="text-indigo-500" />
                          {item.location}
                        </h3>
                      </div>
                    </div>

                    {/* Booking details */}
                    <div className="flex flex-col space-y-4 md:space-y-2 md:text-right">
                      <div>
                        <p className="text-sm text-gray-500">Booking Total</p>
                        <p className="text-lg font-semibold text-gray-900">
                          KES {item.total}
                        </p>
                      </div>
                      <OrderStatusBadge paid={item.is_paid} />

                      {/* booking actions */}
                    {!item.is_paid && (
                      <div>
                        <Link 
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                        
                          <FaMoneyBillWave className="mr-2" />
                          Complete Payment
                        </Link>
                      </div>
                    )}
                    </div>

                    
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <div>
                <FaSearch />
              </div>
              <h3>No bookings Founs</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm
                  ? "Try a different search term"
                  : "You haven't placed any orders yet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mybookings;
