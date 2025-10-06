import React from "react";

const ProfileHeader = ({ photoUrl, fullName, id, onPhotoChange, role }) => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-sky-700 w-full p-4 rounded-2xl shadow-md">
      <div className="flex items-start gap-4">
        {/* Profile photo */}
        <div className="relative group shrink-0">
          <img
            src={photoUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-xl object-cover border-2 border-white shadow-lg"
          />
          <label
            className="absolute inset-0 rounded-xl bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity text-white text-xs"
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

        {/* Name + ID + Badge */}
        <div className="flex flex-col gap-1">
          <h2 className="md:text-lg text-md font-semibold text-white">
            {fullName || "Your Name"}
          </h2>
          <p className="md:text-xs text-[9px] text-blue-100 tracking-wide">
            #SKILLVERIFY{id || "0000"}
          </p>
          <span className="text-[7px] md:text-[9px] bg-emerald-600 px-2 py-0.5 text-white rounded-full shadow-sm w-fit">
            {role || "Member"}
          </span>
        </div>
      </div>

      {/* Bio / Skills */}
      <div className="mt-3">
        <span className="inline-block bg-blue-800/40 text-blue-100 px-3 py-1 rounded-full md:text-xs text-[10px] font-medium">
          Backend Development | SpringBoot | Flask | Docker
        </span>
      </div>
    </div>
  );
};

export default ProfileHeader;