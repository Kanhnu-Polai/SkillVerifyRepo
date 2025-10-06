// src/components/account/jobPosterNavComponets/jobs/JobDetailsModal.jsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X, MapPin, Briefcase, Users, ClipboardList ,Clock
} from "lucide-react";

const safeArray = (arr) => (Array.isArray(arr) ? arr : []);

const JobDetailsModal = ({ job, onClose }) => {
  /* ───────────────────────── ESC to close & body-lock ───────────────────────── */
  useEffect(() => {
    if (!job) return;                       // modal not shown
    const onEsc = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [job, onClose]);

  if (!job) return null;

  /* ------------------------------  Safe props  ------------------------------ */
  const {
    companyPhotoLink = "/default-logo.png",
    jobTitle          = "Untitled role",
    companyName       = "Unknown company",
    requiredSkill     = [],
    location          = [],
    jobType           = "—",
    postedAgo         = "just now",
    noOfOpenings      = 0,
    shortlisted       = 0,
    examRequired      = false,
    jobDescription    = "No description provided.",
  } = job;

  /* ------------------------------  Mark-up  ---------------------------------- */
  return createPortal(
    <div className="fixed inset-0 z-[999]   flex items-center md:items-center justify-center ">
      {/* ─ backdrop ─ */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* ─ dialog ─ */}
      <div
        className={`
          relative z-10 w-80 
          md:max-w-2xl mx-auto
          bg-white
          rounded-2xl md:min-w-2xl md:rounded-2xl
          shadow-xl
          md:animate-[fadeIn_.25s_ease-out]
          animate-[slideUp_.25s_ease-out]
          /* scrolling */
          max-h-full md:max-h-[80vh] overflow-y-auto
          /* nice scrollbar */
          scrollbar-thin scrollbar-thumb-gray-300
        `}
      >
        {/* close btn */}
        <button
          onClick={onClose}
          className="absolute top-4  right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        {/* content */}
        <div className="p-3 md:p-6 border md:w-2xl">
          {/* header */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={companyPhotoLink}
              onError={(e) => (e.currentTarget.src = "/default-logo.png")}
              alt="logo"
              className="md:w-16 md:h-16 w-12 h-12 rounded-md object-cover"
            />
            <div>
              <h2 className="md:text-2xl text-[13px] font-bold">{jobTitle}</h2>
              <p className="text-gray-600 text-[12px] md:text-base flex items-center gap-1">
                <Briefcase className="md:w-4 md:h-4 w-2 h-2" /> {companyName}
              </p>
            </div>
          </div>

          {/* meta row */}
          <div className="flex flex-wrap bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-md text-sm text-gray-900 p-3">
            
            <div className="flex  flex-col justify-center   space-y-1 ">
              <span className="flex items-center gap-1 text-[11px] md:text-base">
              <MapPin className="md:w-4 md:h-4 w-2 h-2" />
              {safeArray(location).join(", ") || "—"}
            </span>
              <span className="flex items-center gap-1 text-[11px] md:text-base">
              <Briefcase className="md:w-4 md:h-4 w-2 h-2" /> {jobType}
            </span>
            <span className="flex items-center gap-1 text-[11px] md:text-base">
              <Users className="md:w-4 md:h-4 w-2 h-2" /> Vacancies: {noOfOpenings}
            </span>
            <span className="flex items-center gap-1 text-[11px] md:text-base">
              <ClipboardList className="md:w-4 md:h-4 w-2 h-2" /> Short-listed: {shortlisted}
            </span>
            <span className="flex items-center gap-1 text-[11px] md:text-base">
                <Clock className="md:w-4 md:h-4 w-2 h-2"></Clock>{postedAgo}</span>
            
            </div>
            <div>
              

            </div>
          </div>

          {/* skills / flags */}
          <div className="mt-4 flex flex-wrap gap-1 md:gap-2">
            {safeArray(requiredSkill).map((s, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-600 px-2 md:px-3 py-0.5 rounded-full
                           md:text-xs text-[10px] font-medium"
              >
                {s}
              </span>
            ))}
            {examRequired && (
              <span className="border border-yellow-400 text-yellow-700
                               px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold">
                Exam Required
              </span>
            )}
          </div>

          {/* description */}
          <h3 className="mt-6 mb-1 text-[12px]   md:text-base font-semibold">Job Description</h3>
          <p className="whitespace-pre-line  leading-relaxed text-[10px] md:text-sm">
            {jobDescription}
          </p>
        </div>
      </div>

      {/* ───────── animations ───────── */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0);    }
        }
      `}</style>
    </div>,
    document.body
  );
};

export default JobDetailsModal;