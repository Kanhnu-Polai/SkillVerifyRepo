import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  ClipboardList,
  GraduationCap,
  Wallet,
  CalendarDays,
  Heart,
  Eye,
} from "lucide-react";
import { timeAgo } from "../../../utils/time";

const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

export default function PublicJobCard({
  job = {},
  onView = () => {},
  onApply = () => {},
  onSave = () => {},
  isSaved = false,
}) {
  const navigate = useNavigate();

  const {
    companyPhotoLink = "/default-logo.png",
    jobTitle = "Software Engineer",
    companyName = "TechNova Pvt. Ltd.",
    requiredSkill = ["React", "Spring Boot", "MySQL"],
    location = ["Bhubaneswar", "Odisha"],
    jobType = "Full-time",
    createdAt = new Date().toISOString(),
    noOfOpenings = 5,
    numberOfCandidatesShortlisted = 3,
    totalApplicants = 18,
    examRequired = true,
    salary = "₹6 - ₹10 LPA",
    experience = "1-3 years",
    education = "B.Tech / M.Sc. Computer Science",
    applicationDeadline = "2025-12-30",
  } = job;

  const postedAgo = timeAgo(createdAt);

  return (
    <article className="relative bg-white/60 backdrop-blur-md border-4  border-gray-300 rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 w-full max-w-3xl mx-auto ">
      
      {/* Exam Badge */}
      {examRequired && (
        <div className="absolute top-4 right-4">
          <span className="md:px-3 md:py-1 px-1 py-1 text-[8px] md:text-[10px] font-semibold rounded-full bg-yellow-100 text-yellow-800 border border-yellow-400 shadow-sm">
            Exam Required
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex gap-4 items-center">
        <img
  src={companyPhotoLink}
  alt="Company logo"
  onError={(e) => (e.currentTarget.src = "/default-logo.png")}
  className="w-14 h-14 rounded-xl object-contain border border-gray-200 shadow-sm bg-white p-1"
/>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {jobTitle}
          </h2>
          <p className="text-gray-600 text-sm flex items-center gap-1">
            <Briefcase className="w-4 h-4 text-blue-600" /> {companyName}
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mt-3 overflow-x-auto scrollbar-hide">
        {safeArray(requiredSkill).map((skill, i) => (
          <span
            key={i}
            className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium border border-blue-100 whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Location and Job Type */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-4">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-green-600" />{" "}
          {safeArray(location).join(", ") || "—"}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-purple-600" /> {jobType}
        </span>
      </div>

      {/* Job Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-gray-700 mt-4 text-sm">
        <span className="flex items-center gap-1">
          <Wallet className="w-4 h-4 text-amber-600" />Salary: {salary}
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4 text-indigo-600" /> Vacancies:{" "}
          <b>{noOfOpenings}</b>
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="w-4 h-4 text-teal-600" /> Experience:{" "}
          {experience}
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays className="w-4 h-4 text-red-600" /> Deadline:{" "}
          {applicationDeadline}
        </span>
      </div>
      

      {/* Applicants and Shortlisted Section */}
      <div className="mt-4 flex flex-wrap gap-6 text-gray-700 text-sm border-t border-gray-200 pt-3">
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4 text-blue-600" /> Applicants:{" "}
          <b>{totalApplicants}</b>
        </span>
        <span className="flex items-center gap-1">
          <ClipboardList className="w-4 h-4 text-green-600" /> Shortlisted:{" "}
          <b>{numberOfCandidatesShortlisted}</b>
        </span>
      </div>

      

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 items-center mt-5">
        <button
          onClick={onSave}
          className={`flex items-center gap-1 border ${
            isSaved
              ? "bg-red-100 border-red-400 text-red-600"
              : "border-slate-400 text-slate-700 hover:bg-slate-50"
          } text-xs px-4 py-1.5 rounded-md shadow-sm transition`}
        >
          <Heart className="w-3 h-3" /> {isSaved ? "Saved" : "Save"}
        </button>

        <button
          onClick={onView}
          className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs px-4 py-2 rounded-md shadow transition-transform hover:scale-[1.03]"
        >
          <Eye className="w-3 h-3" /> Details
        </button>

        <button
          onClick={onApply}
          className="flex items-center gap-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-xs px-4 py-2 rounded-md shadow transition-transform hover:scale-[1.03]"
        >
          Apply Now
        </button>
      </div>

      {/* Footer */}
      <div className="mt-3 flex justify-end items-center">
        <span className="text-xs text-gray-900 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Posted {postedAgo}
        </span>
      </div>
    </article>
  );
}