import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Flame,
  BriefcaseBusiness,
  Bookmark,
  UserRound,
} from "lucide-react";
import { ScanEye } from "lucide-react";
import { FaFilter } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { MdSort } from "react-icons/md";
import JobDetailsModal from '../modals/JobDetailsModal';
import FilterModal from '../componets/mobileComponets/FilterModal';
import SortList from '../componets/mobileComponets/SortList';

 

const JobFilterTab = ({setOpenMobileFilter}) => {
    const [showSortMenu, setShowSortMenu] = useState(false);
    const sortRef = useRef(null);
    const navigate = useNavigate()

useEffect(() => {
  const handleClickOutside = (e) => {
    if (sortRef.current && !sortRef.current.contains(e.target)) {
      setShowSortMenu(false);
    }
  };

  if (showSortMenu) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showSortMenu]);

     
   
  return (
   <div ref={sortRef}
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
      <div className="relative flex flex-col items-center">
  {/* Sort Button */}
  <button
    className="flex flex-col items-center text-gray-700"
    onClick={() => setShowSortMenu(!showSortMenu)}
  >
    <MdSort className="w-6 h-6" />
    <span className="text-[11px]">Sort</span>
  </button>

  {/* Floating Sort Menu */}
  {showSortMenu && (
    <SortList/>
  )}
</div>

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
            console.log("hello")
         setOpenMobileFilter(true);
        }}
      >
        <IoFilterSharp className="w-7 h-7 text-amber-600" />
        <span className="text-[10px] text-blue-600 -mt-1">Filter</span>
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
  )
}

export default JobFilterTab