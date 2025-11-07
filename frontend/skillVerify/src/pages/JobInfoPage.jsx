import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  BookOpen,
  ArrowLeft,
  DollarSign,
  Calendar,
  Mail,
 
 
} from "lucide-react";
import { AiOutlineNodeExpand } from "react-icons/ai";
import { MdOutlineTopic } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";



import ResumeSelectModal from "../components/resume/ResumeSelectModal";
import { toast } from "react-hot-toast";
import ExamDetailModal from "../features/job/modals/ExamDetailModal";

const JobInfoPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [openExamInfoModal,setOpenExamInfoModal] = useState(false) 

  if (!job) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No job data available.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 py-10 px-4 sm:px-8 pb-20">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center gap-2 transition-all duration-200 rounded-full px-4 py-2 text-blue-500 hover:text-blue-700"
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline font-medium">
          Back to listed jobs
        </span>
      </button>

      {/* Card Container */}
      <div className="max-w-full mt-5 mx-auto bg-sky-200 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-start gap-6 p-6 bg-gradient-to-r from-cyan-900 to-gray-800 text-white">
          <div className="flex justify-center items-center">
            <img
            src={job.companyPhotoLink}
            alt={job.companyName}
            onError={(e) => (e.currentTarget.src = "/default-logo.png")}
            className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-md"
          />
          </div>
          <div className="flex flex-col items-start ">
            <div className=" w-full flex items-center justify-center">
                <h1 className="text-2xl sm:text-3xl font-bold mb-1">
              {job.jobTitle}
            </h1>
            </div>
            
            <div>
                <p className="flex items-center gap-2 text-blue-100  ">
              <Briefcase className="w-5 h-5" />
              {job.companyName}
            </p>
            <p className="text-sm text-blue-200 mt-1">
              Posted {job.postedAgo} •{" "}
              {new Date(job.createdAt).toLocaleDateString()}
            </p>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="md:p-6 px-2 py-3 space-y-6">
          {/* Job Highlight */}
          <div className="bg-white w-full pb-3 rounded-xl">
            <div className="h-8 w-full px-2 py-2">
              <p className="text-sm font-medium">Highlight</p>
            </div>
            <div className="flex justify-start p-2 md:text-sm text-xs ">
              <div className="min-w-1/2 flex items-center space-x-2">
                <Briefcase className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                <span className="font-light">Type :</span>
                <span className="font-medium">{job.jobType}</span>
              </div>
              <div className="min-w-1/2 flex items-center space-x-2">
                <Clock className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                <span className="font-light">Experience :</span>
                <span className="font-medium">{job.experience}+ years</span>
              </div>
            </div>

            <div className="flex justify-start p-2 md:text-sm text-xs">
              <div className="min-w-1/2 flex items-center space-x-2">
                <Users className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                <span className="font-light">Openings :</span>
                <span className="font-medium">{job.noOfOpenings}</span>
              </div>
              <div className="min-w-1/2 flex items-center space-x-2">
                <DollarSign className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                <span className="font-light">Salary :</span>
                <span className="font-medium">12 LPA</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-white w-full pb-3 rounded-xl">
            <div className="h-8 w-full px-2 py-2">
              <p className="text-sm font-medium">Locations</p>
            </div>
            <div className="flex justify-start p-2 md:text-sm text-xs ">
              <div className="min-w-1/2 flex items-center space-x-1">
                <MapPin className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                <span className="font-medium">{job.location.join(", ")}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white w-full pb-3 rounded-xl">
            <div className="h-8 w-full px-2 py-2">
              <p className="text-sm font-medium">Description</p>
            </div>
            <div className="flex justify-start p-2 md:text-sm text-xs">
              <span className="font-normal antialiased whitespace-pre-line">
                {job.jobDescription.replace(/\\n/g, "\n")}
              </span>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white w-full pb-3 rounded-xl">
            <div className="h-8 w-full px-2 py-2">
              <p className="text-sm font-medium">Required Skills</p>
            </div>

            <div className="flex flex-wrap gap-2 p-2 md:text-sm text-xs">
              {job.requiredSkill.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Exam Details */}
          {job.examRequired && (
            <div className="bg-white w-full pb-3 rounded-xl">
              <div className="h-8 w-full px-2 py-2 flex items-center justify-between">
                <p className="text-sm font-medium">Exam Details</p>
                <button onClick={()=>setOpenExamInfoModal(true)} className="mt-3" ><IoIosInformationCircleOutline className=" hover:text-slate-900 cursor-pointer text-slate-800 text-3xl font-bold" /></button>
              </div>

              <div className="p-2 md:text-sm text-xs space-y-2">
                <div className="flex items-center space-x-2">
                  <BookOpen className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                  <span className="font-medium">Exam Required:</span>
                  <span className="text-green-600 font-semibold">Yes</span>
                </div>

                {/* Topics */}
                <div className="w-full pb-3 rounded-xl bg-sky-50 shadow-md">
                  <div className="h-8 w-full px-2 py-2">
                    <p className="text-sm font-medium">Exam Topics</p>
                  </div>
                  <div className="flex justify-start p-2 md:text-sm text-xs ">
                    <MdOutlineTopic className="md:w-5 md:h-5 w-4 h-4 text-indigo-800 mr-2" />
                    <span className="font-medium">
                      {job.examTopics.join(", ")}
                    </span>
                  </div>
                </div>

                {/* Rounds */}
                <div className="w-full pb-3 rounded-xl bg-sky-50 shadow-md">
                  <div className="h-8 w-full px-2 py-2">
                    <p className="text-sm font-medium">Exam Rounds</p>
                  </div>
                  <div className="flex justify-start p-2 md:text-sm text-xs ">
                    <AiOutlineNodeExpand className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                    <span className="font-medium">
                      {job.round1Required && (
                        <span className="text-pink-700 px-3 py-1 rounded-full text-xs font-semibold">
                          Round 1
                        </span>
                      )}
                      {job.round2Required && (
                        <span className="text-pink-700 px-3 py-1 rounded-full text-xs font-semibold">
                          Round 2
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="bg-white w-full pb-3 rounded-xl">
            <div className="h-8 w-full px-2 py-2">
              <p className="text-sm font-medium">Last Date to Apply</p>
            </div>

            <div className="p-2 md:text-sm text-xs space-y-1 text-gray-700">
              <div className="flex items-center space-x-2">
                <Calendar className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                <p>
                  <span className="font-bold text-red-500"> {new Date(job.lastDateToApply).toLocaleDateString()}</span>
                 
                </p>
              </div>

              
            </div>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-0 left-0 w-full backdrop-blur-md border-t border-gray-200 justify-between flex md:justify-end items-center py-3 px-4 z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] space-x-2.5">
        {/* Save Button */}
        <button
          onClick={() => {
            setIsSaved(!isSaved);
            toast.success(isSaved ? "Removed from saved" : "Saved job!");
          }}
          className={`flex items-center justify-center gap-2 border hover:border-amber-500 cursor-pointer ${
            isSaved
              ? "bg-red-100 border-red-400 text-red-600"
              : "bg-white border-slate-400 text-slate-700 hover:bg-slate-50"
          } text-sm px-6 py-2 rounded-md shadow transition`}
        >
          {isSaved ? "Saved" : "Save"}
        </button>

        {/* Apply Button */}
        <button
          onClick={() => setIsResumeModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white text-sm px-6 py-2 rounded-md shadow-lg transition-transform hover:scale-[1.05] cursor-pointer hover:border-amber-500"
        >
          Apply Now
        </button>
      </div>

      {/* ✅ Resume Select Modal */}
      {isResumeModalOpen && (
        <ResumeSelectModal
          job={job}
          onClose={() => setIsResumeModalOpen(false)}
          onSuccess={() => {
            toast.success("Application sent!");
            setIsResumeModalOpen(false);
          }}
        />
      )}

      {
        openExamInfoModal && <ExamDetailModal onClose = {setOpenExamInfoModal} examTopics = {job.examTopics} round1={job.round1Required} round2={job.round2Required}/>
      }
    </div>
  );
};

export default JobInfoPage;