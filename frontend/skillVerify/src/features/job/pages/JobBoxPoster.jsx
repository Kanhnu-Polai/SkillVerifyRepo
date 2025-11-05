// src/components/account/jobPosterNavComponets/jobs/JobBoxPoster.jsx
import React from "react";
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
import { timeAgo } from "../../../utils/time";
import { niceDate } from "../../../utils/time";
const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

const JobBoxPoster = ({
  job = {},
  onView = () => {},
  onEdit = () => {},
  onRemove = () => {},
}) => {
  const {
    companyPhotoLink = "/default-logo.png",
    jobTitle = "Untitled role",
    companyName = "Unknown company",
    requiredSkill = [],
    location = [],
    jobType = "—",
    postedAgo = "just now",
    noOfOpenings = 0,
    shortlisted = 0,
    examRequired = false,
    createdAt = null,
  } = job;

  return (
    <article
      className="
        bg-white border-4 border-gray-200 rounded-2xl p-5
        shadow-sm hover:shadow-lg hover:scale-105 transition-all
        w-full max-w-3xl hover:bg-slate-200 
      "
    >
      <div className="grid sm:grid-cols-[auto,1fr] gap-4  rounded p-2">
        <div className="flex space-x-4 justify-between  items-center">
          <div className="flex space-x-4">
            <img
              src={companyPhotoLink}
              alt="logo"
              onError={(e) => (e.currentTarget.src = "/default-logo.png")}
              className="w-14 h-14 rounded-md object-cover row-span-2 shrink-0"
            />

            <div>
              <h2 className="text-lg font-semibold truncate">{jobTitle}</h2>
              <p className="text-gray-600 text-sm flex items-center gap-1 truncate">
                <Briefcase className="w-4 h-4" /> {companyName}
              </p>
            </div>
            
          </div>
          <div className=" h-full">
              <AiOutlineMore className="text-2xl" />
            </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
        {safeArray(requiredSkill).map((s, i) => (
          <span
            key={i}
            className="bg-blue-100 text-slate-950 px-2 py-0.5 rounded-full text-xs font-medium"
          >
            {s}
          </span>
        ))}
      </div>

      {/* meta */}
      <div className="flex flex-wrap items-center gap-5 text-sm text-gray-600 mt-3">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {safeArray(location).join(", ") || "—"}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="w-4 h-4" /> {jobType}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" /> {postedAgo}
        </span>
        {createdAt && (
          <span className="text-xs text-gray-500 italic">
            ({niceDate(createdAt)})
          </span>
        )}
      </div>

      {/* stats */}
      <div className="flex gap-6 text-sm text-gray-700 mt-3">
        {/* Vacancies */}
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4" /> Vacancies&nbsp;<b>{noOfOpenings}</b>
        </span>

        {/* Shortlisted with tooltip */}
        <div className="relative group inline-block">
          <span className="flex items-center gap-1 cursor-default">
            <ClipboardList className="w-4 h-4" />
            Shortlisted&nbsp;<b>{shortlisted}</b>
          </span>

          {/* Tooltip box */}
          <div
            className="
      absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
      hidden group-hover:block
      bg-gray-800 text-white text-xs rounded-md px-2 py-1 
      whitespace-nowrap shadow-lg z-10
    "
          >
            Total shortlisted candidates
          </div>
        </div>
      </div>

      {/* action bar */}
      <div className="flex flex-wrap gap-3 items-center mt-4">
        {examRequired && (
          <span className="text-xs font-semibold border border-yellow-400 text-yellow-700 px-2 py-0.5 rounded-full">
            Exam Required
          </span>
        )}

        <button
          onClick={onView}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-md cursor-pointer"
        >
          <Eye size={14} /> View
        </button>
        <button
          onClick={onEdit}
          className="flex items-center gap-1 border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs px-3 py-1.5 rounded-md cursor-pointer"
        >
          <Pencil size={14} /> Edit
        </button>
        <button
          onClick={onRemove}
          className="flex items-center gap-1 border border-red-600 text-red-600 hover:bg-red-50 text-xs px-3 py-1.5 rounded-md cursor-pointer"
        >
          <Trash2 size={14} /> Remove
        </button>
      </div>
    </article>
  );
};

export default JobBoxPoster;
