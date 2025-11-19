import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Flame,
  BriefcaseBusiness,
  Bookmark,
  UserRound,
} from "lucide-react";
import { ScanEye } from "lucide-react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation()


  return (
    <div
      className="
      fixed bottom-0 left-0 w-full h-16 
      bg-white/60 backdrop-blur-lg 
      border-t border-white/40 
      shadow-[0_-4px_30px_rgba(0,0,0,0.1)]
      z-50 flex justify-around items-center 
      md:hidden
    "
    >
      {/* Home */}
      <button className="flex flex-col items-center text-gray-700"
      onClick={() => {
          navigate("/");
        }}>
        <Home className="w-6 h-6" />
        <span className="text-[11px]">Home</span>
      </button>

      {/* Spotlight */}
      <button className="flex flex-col items-center text-gray-700"
       onClick={() => {
          navigate("/spotlight");
        }}>
        <ScanEye className="w-6 h-6" />
        <span className="text-[11px]">Spotlight</span>
      </button>

      {/* Center Jobs Button */}
      <button
        className="
        w-14 h-14 rounded-full 
        bg-white shadow-xl 
        flex flex-col items-center justify-center
        -mt-10 border border-gray-200 
        hover:scale-110 transition-transform
      "
        onClick={() => {
          navigate("/jobs");
        }}
      >
        <BriefcaseBusiness className="w-7 h-7 text-amber-600" />
        <span className="text-[10px] text-blue-600 -mt-1">Jobs</span>
      </button>

      {/* Saved */}
      <button className="flex flex-col items-center text-gray-700">
        <Bookmark className="w-6 h-6" />
        <span className="text-[11px]">Saved</span>
      </button>

      {/* Profile */}
      <button className="flex flex-col items-center text-gray-700">
        <UserRound className="w-6 h-6" />
        <span className="text-[11px]">Profile</span>
      </button>
    </div>
  );
};

export default BottomNav;