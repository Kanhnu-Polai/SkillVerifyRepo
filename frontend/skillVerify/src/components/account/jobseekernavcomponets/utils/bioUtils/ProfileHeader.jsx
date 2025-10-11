import React from "react";
import { FaUserFriends, FaUserPlus } from "react-icons/fa"; // ✅ followers + following icons

const ProfileHeader = ({ photoUrl, fullName, id, onPhotoChange, role ,followersCount,followingCount}) => {
  return (
    <div className="bg-gradient-to-r from-cyan-700 to-cyan-800 w-full p-5 rounded-2xl shadow-lg">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Profile photo */}
        <div className="relative group shrink-0 mx-auto sm:mx-0">
          <img
            src={photoUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-xl object-cover border-2 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
          <label
            className="absolute inset-0 rounded-xl bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white text-sm font-medium"
          >
            📷 Update
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPhotoChange}
            />
          </label>
        </div>

        {/* Name + ID + Role */}
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <h2 className="text-xl font-semibold text-white">
            {fullName || "Your Name"}
          </h2>
          <p className="text-xs text-blue-100 tracking-wide">
            #SKILLVERIFY{id || "0000"}
          </p>
          <span className="text-[8px] bg-emerald-500 px-2 py-1 text-white rounded-full shadow-md w-fit mx-auto sm:mx-0">
            {role || "Member"}
          </span>
        </div>
      </div>
     


      {/* Skills / Bio */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
        {["Backend Development", "SpringBoot", "Flask", "Docker"].map((skill) => (
          <span
            key={skill}
            className="bg-blue-800/40 text-blue-100 px-3 py-1 rounded-[8px] text-[7px] md:text-[10px] font-medium hover:bg-blue-900/50 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-4 w-full rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-400 flex justify-between items-center px-5 py-2 text-sm text-white font-medium shadow-md">
        <button className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer ">
          <FaUserFriends className="text-white text-sm md:text-lg" />
          Followers: <span className="font-semibold ">{followersCount}</span>
        </button>
        <button className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
          <FaUserPlus className="text-white text-sm md:text-lg" />
          Following: <span className="font-semibold">{followingCount}</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
