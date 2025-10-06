import React from "react";
import { FaClock, FaMapMarkerAlt, FaUsers, FaBuilding } from "react-icons/fa";

export default function JobCard() {
  return (
    <div className="max-w-md bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-200">
      {/* Logo and Company */}
      <div className="flex items-center gap-3 ">
        <img
          src="https://1000logos.net/wp-content/uploads/2021/02/Flipkart-logo.png"
          alt="Company Logo"
          className="h-10 w-10 rounded-full object-cover"
        />
       
        <div>
          <h2 className="text-xl font-bold text-gray-800">Product Manager</h2>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <FaBuilding className="inline" /> Flipkart
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">Agile</span>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">Road-mapping</span>
        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">SQL</span>
      </div>

      {/* Location, Type, Time */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 items-center">
        <span className="flex items-center gap-1"><FaMapMarkerAlt /> Bengaluru</span>
        <span className="flex items-center gap-1"><FaClock /> Full-time</span>
        <span className="flex items-center gap-1"><FaClock /> 5 days ago</span>
      </div>

      {/* Additional Fields */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <FaUsers className="text-gray-500" />
          <span>Vacancies: <strong>3</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <FaUsers className="text-gray-500" />
          <span>Shortlisted: <strong>12</strong></span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 shadow-sm">
          View More
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 shadow-sm">
          Apply
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 shadow-sm">
          Exam Required
        </button>
      </div>
    </div>
  );
}