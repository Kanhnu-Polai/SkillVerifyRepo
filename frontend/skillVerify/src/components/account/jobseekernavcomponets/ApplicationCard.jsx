import React from "react";
import { HiOutlineCheck } from "react-icons/hi";
import { LuNotepadText } from "react-icons/lu";
import { AiOutlineTeam } from "react-icons/ai";
import { VscGitStashApply } from "react-icons/vsc";
import { FaCheckCircle, FaClock, FaCalendarAlt, FaUserCheck } from "react-icons/fa";

import { FiUser } from "react-icons/fi";
import { FaMoneyBillWave, FaBriefcase } from "react-icons/fa";

import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  UserCheck,
  BadgeCheck,
  BrainCircuit,
  Building2,
} from "lucide-react";
import JobStatusProgress from "./utils/JobStatusProgress";

const ApplicationCard = ({
  applicationId,
  company,
  companyLogo,
  position,
  experience,
  salary,
  appliedOn,
  status,
  interview = {},
  examTopics = [],
}) => {
  const data = [
  { name: "Applied", status: "completed" },
  { name: "Round 1", status: "completed" },
  { name: "Round 2", status: "failed" },
  { name: "Interview", status: "pending" },
  { name: "Shortlisted", status: "pending" },
]
  return (
    <div className="bg-white w-fit  shadow border-2  rounded-[16px] p-4 sm:p-6 sm:my-6 m-3 ">
      {/* Header Row */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center gap-3">
          {companyLogo ? (
            <img
              src={companyLogo}
              alt={company}
              className="w-12 h-12 rounded-full object-cover border"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 text-gray-700 flex items-center justify-center rounded-full text-lg font-bold">
              {company?.[0] || "C"}
            </div>
          )}
          <div>
            <h3 className="md:text-xl font-semibold text-gray-800 text-sm">{company}</h3>
            <p className="md:text-md text-gray-600 text-sm ">{position}</p>
          </div>
        </div>
        <span className="text-xs font-mono text-gray-400">
          #{applicationId}
        </span>
      </div>

      {/* Gradient Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-4 mb-4">
        <p className="font-medium mb-2 md:text-md text-sm">Exam Overview</p>
        <div className="flex items-center mb-4 ">
          <div className="bg-white text-indigo-500 rounded-2xl p-3 mr-4">
            <BrainCircuit className="md:h-6 md:w-6 h-3 w-3" />
          </div>
          <div>
            <p className="text-sm md:text-lg font-bold">{examTopics?.length || 0}</p>
            <p className=" text-xs md:text-sm text-indigo-100">Topics</p>
          </div>
          <JobStatusProgress stages = {data}></JobStatusProgress>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-indigo-100">
          <div className="text-center flex flex-col  justify-center space-y-1 items-center">
            <p className=" text-xs md:text-lg font-semibold">{experience}</p>
            <p className=" md:text-xs"><FaBriefcase className="text-sm md:text-xl" /></p>
          </div>
          <div className="text-center  flex flex-col  justify-center space-y-1 items-center">
            <p className="text-xs md:text-lg font-semibold">{salary}</p>
            <p className="text-xs"><FaMoneyBillWave  className="text-sm md:text-xl" /></p>
          </div>
          <div className="text-center flex flex-col  justify-center space-y-1 items-center">
            <p className="text-xs md:text-lg font-semibold">{appliedOn}</p>
            <p className="text-xs"><Calendar className="text-xs md:text-xl"></Calendar></p>
          </div>
          <div className="text-center flex flex-col  justify-center space-y-1 items-center">
            <h1 className="text-xs md:text-lg tracking-wide text-gradient bg-gradient-to-r from-sky-400 to-amber-300 bg-clip-text text-transparent ">
         {status}
        </h1>
            <p className="text-xs"><FaCheckCircle className="text-xs md:text-xl" /></p>
          </div>
        </div>
      </div>

      {/* Interview Rounds */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-xs">
        {interview.round1 && (
          <div className="rounded-xl border p-4 bg-gray-100 border-gray-300">
            <p className=" font-semibold text-green-600 flex items-center gap-2 mb-2">
              <BadgeCheck className="w-4 h-4" /> Round 1:{" "}
              {interview.round1.title}
            </p>
            <div className="space-y-1 pl-6 ">
              {interview.round1.date && (
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Last Date to Attempt Exam :</span>{" "}
                  <span className="text-red-600 font-semibold">
                    {interview.round1.date}
                  </span>
                </p>
              )}
              {interview.round1.time && (
                <p className="flex items-center gap-2 ">
                  <Clock className="w-4 h-4" /> <span>Duration : </span>{" "}
                  <span>{interview.round1.time}</span>
                </p>
              )}
              {interview.round1.location && (
                <p className="flex items-center gap-2">
                  <LuNotepadText className="flex-shrink-0" />
                  <span className="flex-shrink-0">Topics :</span>
                  <span
                    className="truncate whitespace-nowrap overflow-hidden text-gray-600"
                    title={examTopics.join(", ")}
                  >
                    {examTopics.join(", ")}
                  </span>
                </p>
              )}
              <div className=" flex justify-end">
               <button
  className="bg-blue-600 text-white px-2 mt-2 py-1  rounded-md cursor-pointer hover:bg-blue-700"
  onClick={() => {
    const queryParams = new URLSearchParams({
      company,
      position,
      topics: JSON.stringify(examTopics),
    }).toString();

    // Open exam center (running on port 5174)
    window.open(`http://localhost:5174/?${queryParams}`, "_blank");
  }}
>
  Start Exam
</button>
              </div>
            </div>
          </div>
        )}

        {interview.round2 && (
          <div className="rounded-xl border p-4 bg-gray-100  border-gray-300  ">
            <p className="text-sm font-semibold text-blue-600 flex items-center gap-2 mb-2">
              <BadgeCheck className="w-4 h-4" /> Round 2:{" "}
              {interview.round2.title}
            </p>
            <div className="pl-6 text-sm text-gray-600 flex flex-col space-y-1  ">
              <div className="flex  space-x-1  ">
                <span className="text-lg">
                  <FiUser></FiUser>
                </span>{" "}
                <span>Interviewer :</span>
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  SkillVerify AI
                </span>
              </div>
              <div className="flex  space-x-1 ">
                <span className="flex items-center space-x-1  ">
                  <span>
                    <Clock className="w-4 h-4" />
                  </span>{" "}
                  <span>Duration : </span> <span>30 Min</span>
                </span>
              </div>
              <div className="flex  space-x-1 items-center">
                <span><LuNotepadText></LuNotepadText> </span>
                <span className="flex-shrink-0">Topics :</span>
                <span>
                  Based on your Submitted Resume.
                </span>
              </div>
            </div>
            <div></div>

            <div className=" flex justify-end">
              <button className="bg-blue-600 text-white px-2 mt-2 py-1 text-sm rounded-md cursor-pointer hover:bg-blue-700">
                Start Interview
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer Buttons */}
      <div className="mt-6 flex justify-end items-center">
        
        <div className="flex gap-2 text-xs">
          <button className="px-4 py-1.5 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50 transition">
            Job Details
          </button>
          <button className="px-4 py-1.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
            Add to Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
