import React, { useState } from "react";
import {
  FaFire, FaClock, FaUserFriends, FaRegBookmark,
  FaUser, FaTag, FaStar, FaCity, FaRegPlusSquare
} from "react-icons/fa";
import CreatePost from "./CreatePost";

const SpotlightNav = ({ activeTopic, setActiveTopic }) => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Recommended", icon: <FaStar /> },
    { name: "Trending", icon: <FaFire /> },
    { name: "Business", icon: <FaCity /> },
    { name: "Recent", icon: <FaClock /> },
    { name: "Following", icon: <FaUserFriends /> },
    { name: "Saved", icon: <FaRegBookmark /> },
    { name: "My Posts", icon: <FaUser /> },
    { name: "Tags", icon: <FaTag /> },
  ];

  return (
    <div className="flex flex-col gap-2 p-4 bg-gradient-to-r from-slate-900 to-slate-700 h-full rounded-md">

      {/* Heading */}
      <h2 className="text-white text-lg md:text-xl font-bold mt-5">Spotlight</h2>

      {/* Create Post */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 border-2 border-gray-300 rounded-xl text-sm md:text-lg px-3 py-2 w-full bg-white font-medium text-gray-700 hover:text-blue-600 hover:shadow-md transition"
      >
        <FaRegPlusSquare className="text-blue-600 text-xl" />
        Create Post
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-start md:items-center p-2"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <CreatePost setOpen={setOpen} />
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <ul className="space-y-2 mt-4">
        {navItems.map((item) => (
          <li
            key={item.name}
            onClick={() => setActiveTopic(item.name)}
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer 
            transition-all duration-200 whitespace-nowrap
            ${
              activeTopic === item.name
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm md:text-base font-medium">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpotlightNav;