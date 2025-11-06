// src/components/account/jobPosterNavComponets/jobs/JobBoxPoster.jsx
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineMore } from "react-icons/ai";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  ClipboardList,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import { timeAgo, niceDate } from "../../../utils/time";

const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

const JobBoxPoster = ({
  job = {},
  onView = () => {},
  onEdit = () => {},
  onRemove = () => {},
}) => {
  const {
    companyPhotoLink = "/default-logo.png",
    jobTitle = "Untitled Role",
    companyName = "Unknown Company",
    requiredSkill = [],
    location = [],
    jobType = "—",
    postedAgo = "just now",
    noOfOpenings = 0,
    shortlisted = 0,
    examRequired = false,
    createdAt = null,

   numberCandidateApply = 0,

  } = job;

  const [openOption, setOpenOption] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <article
      className="
         border flex flex-col justify-between border-green-300 rounded-2xl p-6
        shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300
        w-full max-w-3xl 
      "
    >
      {/* Header Section */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-4">
          <img
            src={companyPhotoLink}
            alt="logo"
            onError={(e) => (e.currentTarget.src = '/default-logo.png')}
            className="w-14 h-14 rounded-lg object-cover border border-gray-200"
          />
          <div>
            <h2 className="md:text-lg font-san  text-sm font-semibold text-gray-900 leading-tight">
              {jobTitle}
            </h2>
            <p className="text-gray-600 md:text-sm text-xs  flex items-center gap-1">
              <Briefcase className="w-4 h-4 object-contain rounded-md text-black" /> {companyName}
            </p>
          </div>
        </div>

        {/* 3-dot menu */}
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setOpenOption(!openOption)}
            className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition"
          >
            <AiOutlineMore className="text-2xl text-gray-600" />
          </div>

          {openOption && (
            <div className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 py-2 z-20 animate-fadeIn">
              <button
                onClick={onEdit}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
              >
                <Pencil size={16} /> <span>Edit</span>
              </button>
              <button
                onClick={onRemove}
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
              >
                <Trash2 size={16} /> <span>Remove</span>
              </button>
            </div>
          )}
        </div>
      </div>

      
      
      <div className="flex justify-between items-center gap-3">
        
       <div className="flex justify-center items-center space-x-1"> <h1 className="text-xs font-medium antialiased text-violet-700 "> {numberCandidateApply} </h1><span className="text-xs text-pink-500"> Applicants</span></div>
        <button
          onClick={onView}
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg transition-all duration-200 text-white text-xs px-4 py-1.5 rounded-md "
        >
          Details
        </button>
        
        
      </div>
    </article>
  );
};

export default JobBoxPoster;
