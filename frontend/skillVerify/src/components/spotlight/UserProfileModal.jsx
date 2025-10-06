// UserProfileModal.jsx
import React from "react";
import { FaUserFriends, FaUserPlus, FaStar } from "react-icons/fa";

const UserProfileModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 flex flex-col items-center transition-all">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
           
          </h2>
          <button
            className="text-gray-700 dark:text-gray-200 font-bold text-lg"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Avatar */}
        <img
          src={user.photoUrl}
          alt={user.fullName}
          className="w-24 h-24 rounded-full mb-3 border-4 border-indigo-500"
        />

        {/* Name & Email */}
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          {user.fullName}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-3">
          {user.email}
        </p>

        {/* Bio */}
        {user.bio && (
          <p className="text-center text-gray-700 dark:text-gray-300 mb-4">
            {user.bio}
          </p>
        )}

        {/* Followers / Following */}
        <div className="flex justify-around w-full mb-4">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-gray-900 dark:text-white">
              {12}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-300">
              Followers
            </span>
          </div>
          <div className="flex flex-col items-center">
           
            <span className="font-semibold text-gray-900 dark:text-white">
              {7}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-300">
              Following
            </span>
          </div>
        </div>

        {/* Role Badge */}
        {user.role && (
          <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-800 to-indigo-900 text-white rounded-full text-[12px] md:text-xs  mb-2">
            <FaStar /> {user.role}
          </div>
        )}

        {/* Optional additional buttons */}
        <div className="flex gap-4 mt-2">
          <button className="px-4 min-w-28 md:min-w-32 py-2 bg-indigo-500 text-white text-[15px] md:text-base rounded-lg hover:bg-indigo-600 transition">
            Follow
          </button>
          <button className="px-4 py-2 min-w-28 bg-gray-200 md:min-w-32 dark:bg-gray-700 text-[15px] md:text-base  text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            Message
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfileModal;
