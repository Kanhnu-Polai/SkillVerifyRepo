import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  ClipboardList,
  Eye,
  Heart,
} from "lucide-react";
import { timeAgo } from "../../utils/time";

const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

export default function PublicJobCard({
  job = {},
  onView = () => {},
  onApply = () => {},
  onSave = () => {},
  isSaved = false, // optional toggle state
}) {
  const navigate = useNavigate();

  const {
    companyPhotoLink = "/default-logo.png",
    jobTitle = "Untitled role",
    companyName = "Unknown company",
    requiredSkill = [],
    location = [],
    jobType = "—",
    createdAt = null,
    noOfOpenings = 0,
    numberOfCandidatesShortlisted = 0,
    examRequired = false,
  } = job;

  const postedAgo = timeAgo(createdAt);

  return (
    <article className="bg-slate-100 border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 w-full max-w-3xl ">
      {/* top grid */}
     {examRequired && <div className=" flex justify-end mb-1">
      <span className="md:px-3 px-1.5 py-1 md:py-1 text-[6px] md:text-[8px] font-semibold rounded-[12px] bg-yellow-100 text-yellow-800 border border-yellow-400 shadow-sm">
      Exam Required
    </span>

     </div>}
      <div className="grid sm:grid-cols-[auto,1fr] gap-4 ">
        <div className="flex justify-start gap-3 ">
          <img
          src={companyPhotoLink}
          alt="Company logo"
          onError={(e) => (e.currentTarget.src = "/default-logo.png")}
          className="md:w-14 md:h-14 w-12 h-12 rounded-md object-cover row-span-2 shrink-0  border-gray-200 shadow-sm"
        />
        <div className="">
          <h2 className="md:text-lg text-[15px] font-semibold antialiased truncate">{jobTitle}</h2>
        <p className="text-gray-600 md:text-sm text-[11px] flex items-center gap-1 truncate">
            <Briefcase className="md:w-4 w-3 md:h-4 h-3" /> {companyName}
          </p>
        </div>
        </div>
        

       

        {/* scrollable skill tags on mobile */}
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 overflow-x-auto scrollbar-hide">
          {safeArray(requiredSkill).map((skill, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium whitespace-nowrap"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      

      {/* meta */}
      <div className="flex flex-wrap items-center gap-5 text-[10px] md:text-sm text-gray-600 mt-3">
        <span className="flex items-center gap-1">
          <MapPin className="md:w-4 md:h-4 w-3 h-3" /> {safeArray(location).join(", ") || "—"}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="md:w-4 md:h-4 w-3 h-3" /> {jobType}
        </span>
       
      </div>

      {/* stats */}
      <div className="flex gap-6 text-[10px] md:text-sm text-gray-700 mt-3">
        <span className="flex items-center gap-1">
          <Users className="md:w-4 md:h-4 w-3 h-3" /> Vacancies&nbsp;<b>{noOfOpenings}</b>
        </span>

        <span className="flex items-center gap-1">
          <ClipboardList className="md:w-4 md:h-4 w-3 h-3" /> Shortlisted&nbsp;
          <b>{numberOfCandidatesShortlisted}</b>
        </span>
      </div>

      {/* actions */}
      <div className="flex md:flex-wrap md:gap-3 justify-between md:justify-start items-center mt-4 ">
        

        
        <button
          onClick={onSave}
          className={`flex items-center gap-1 border  ${
            isSaved
              ? "bg-red-100 border-red-400 text-red-600"
              : "border-slate-400 text-slate-700 hover:bg-slate-50"
          } text-xs px-4 py-1.5 rounded-md shadow-sm cursor-pointer transition`}
        >
          {" "}
          {isSaved ? "Saved" : "Save"}
        </button>

        <button
          onClick={onView}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-md shadow transition-transform hover:scale-[1.03]"
        >
           Details
        </button>
        <button
          onClick={onApply}
          className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-xs px-4 py-2 rounded-md shadow transition-transform hover:scale-[1.03]"
        >
          Apply
        </button>
      </div>
      <div className=" mt-2 flex justify-end items-center">
         <span className="flex items-center  md:gap-1 text-[10px]">
           {postedAgo}
        </span>
      </div>
    </article>
  );
}