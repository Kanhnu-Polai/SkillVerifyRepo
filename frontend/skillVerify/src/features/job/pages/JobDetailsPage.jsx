import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  FileText,
  BookOpen,
  ArrowLeft,
  DollarSign,
  Calendar,
  Mail,
} from "lucide-react";
import { AiFillInfoCircle, AiOutlineInfoCircle } from "react-icons/ai";

import { FaMoneyBill } from "react-icons/fa6";
import { CiMoneyCheck1 } from "react-icons/ci";
import { MdOutlineTopic } from "react-icons/md";
import { GiProcessor } from "react-icons/gi";
import { AiOutlineRise } from "react-icons/ai";
import { AiOutlineNodeExpand } from "react-icons/ai";
import { CiSquareQuestion } from "react-icons/ci";

const JobDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;
  console.log(job);

  if (!job) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No job data available.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gray-50 py-10 px-4 sm:px-8 ">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center gap-2  transition-all duration-200  rounded-full px-4 py-2 text-blue-500 hover:text-blue-700"
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline font-medium">
          Back to listed jobs
        </span>
      </button>

      {/* Card Container */}
      <div className="max-w-full mt-5 mx-auto bg-sky-200 rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-gradient-to-r from-cyan-700 to-gray-900 text-white">
          <img
            src={job.companyPhotoLink}
            alt={job.companyName}
            onError={(e) => (e.currentTarget.src = "/default-logo.png")}
            className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">
              {job.jobTitle}
            </h1>
            <p className="flex items-center gap-2 text-blue-100">
              <Briefcase className="w-5 h-5" />
              {job.companyName}
            </p>
            <p className="text-sm text-blue-200 mt-1">
              Posted {job.postedAgo} •{" "}
              {new Date(job.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="md:p-6 px-2 py-3 space-y-6">
          <div className="bg-white w-full pb-3 rounded-xl">
            <div className=" h-8 w-full px-2 py-2">
              <p className="text-sm font-medium">Highlight</p>
            </div>
            <div className="flex justify-start p-2 md:text-sm text-xs ">
              <div className="min-w-1/2 flex items-center space-x-2">
                {" "}
                <Briefcase className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                <span className="font-light">Type :</span>{" "}
                <span className="font-medium">{job.jobType}</span>
              </div>
              <div className="min-w-1/2 flex items-center space-x-2">
                {" "}
                <Clock className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                <span className="font-light">Experinece :</span>{" "}
                <span className="font-medium">{job.experience}+ years</span>
              </div>
            </div>

            <div className="flex justify-start p-2 md:text-sm text-xs">
              <div className="min-w-1/2 flex items-center space-x-2">
                {" "}
                <Users className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                <span className="font-light">Openings :</span>{" "}
                <span className="font-medium">{job.noOfOpenings}</span>
              </div>
              <div className="min-w-1/2 flex items-center space-x-2">
                {" "}
                <DollarSign className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                <span className="font-light">Salary :</span>{" "}
                <span className="font-medium">12 LAP</span>
              </div>
            </div>
          </div>

          <div className="bg-white w-full pb-3 rounded-xl">
            <div className=" h-8 w-full px-2 py-2">
              <p className="text-sm font-medium">Locations</p>
            </div>
            <div className="flex justify-start p-2 md:text-sm text-xs ">
              <div className="min-w-1/2 flex items-center space-x-1">
                {" "}
                <MapPin className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                <span className="font-light"></span>{" "}
                <span className="font-medium">{job.location.join(", ")}</span>
              </div>
            </div>
          </div>

          <div className="bg-white w-full pb-3 rounded-xl">
            <div className=" h-8 w-full px-2 py-2">
              <p className="text-sm font-medium">Description</p>
            </div>
            <div className="flex justify-start p-2 md:text-sm text-xs ">
              <div className="min-w-1/2 flex  space-x-1">
                {" "}
                <span className="font-light"></span>{" "}
                <span className="font-normal antialiased whitespace-pre-line">
                  {" "}
                  {job.jobDescription.replace(/\\n/g, "\n")}
                </span>
              </div>
            </div>
          </div>
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

          {job.examRequired && (
            <div className="bg-white w-full pb-3 rounded-xl">
              <div className="h-8 w-full px-2 py-2">
                <p className="text-sm font-medium">Exam Details</p>
              </div>

              <div className="p-2 md:text-sm text-xs space-y-2">
                <div className="flex items-center space-x-2">
                  <BookOpen className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                  <span className="font-medium">Exam Required:</span>
                  <span className="text-green-600 font-semibold">Yes</span>
                </div>
                <div className=" w-full pb-3 rounded-xl bg-sky-50 shadow-md">
                  <div className=" h-8 w-full px-2 py-2">
                    <p className="text-sm font-medium">Exam Topics</p>
                  </div>
                  <div className="flex justify-start p-2 md:text-sm text-xs ">
                    <div className="min-w-1/2 flex items-center space-x-1">
                      {" "}
                      <MdOutlineTopic className="md:w-5 md:h-5 w-4 h-4 text-indigo-800 " />
                      <span className="font-light"></span>{" "}
                      <span className=" font-medium">
                        {job.examTopics.join(", ")}
                      </span>
                    </div>
                  </div>
                </div>
                <div className=" w-full pb-3 rounded-xl bg-sky-50 shadow-md">
                  <div className=" h-8 w-full px-2 py-2">
                    <p className="text-sm font-medium">Exam Rounds</p>
                  </div>
                  <div className="flex justify-start p-2 md:text-sm text-xs ">
                    <div className="min-w-1/2 flex items-center space-x-1">
                      {" "}
                      <AiOutlineNodeExpand className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                      <span className="font-light"></span>{" "}
                      <span className="font-medium">
                        {job.round1Required && (
                          <span className=" text-pink-700 px-3 py-1 rounded-full text-xs font-semibold">
                            Round 1
                          </span>
                        )}
                        {job.round2Required && (
                          <span className=" text-pink-700 px-3 py-1 rounded-full text-xs font-semibold">
                            Round 2
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="bg-white w-full pb-3 rounded-xl">
            <div className="h-8 w-full px-2 py-2">
              <p className="text-sm font-medium">Additional Details</p>
            </div>

            <div className="p-2 md:text-sm text-xs space-y-1 text-gray-700">
              <div className="flex items-center space-x-2">
                <Calendar className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                <p>
                  <span className="font-medium">Last Date to Apply:</span>{" "}
                  {new Date(job.lastDateToApply).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="md:w-5 md:h-5 w-4 h-4 text-indigo-800" />
                <p>
                  <span className="font-medium">Publisher:</span>{" "}
                  {job.publisherEmail}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
