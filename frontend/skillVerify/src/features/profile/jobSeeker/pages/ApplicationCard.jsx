import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { LuNotepadText } from "react-icons/lu";
import { BadgeCheck, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApplicationCard = ({

  applicationId,
  job,
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
  const [showMore, setShowMore] = useState(false);
  const displayedTopics = showMore ? examTopics : examTopics.slice(0, 3);

  const navigate = useNavigate()

  const handleJobDetails = ()=>{
    navigate("/job-info",{
      state:{job}
    })

  }
  return (
    <div
      className="
        bg-white shadow-md border rounded-2xl p-5
        hover:shadow-xl hover:border-blue-400
        transition-all duration-300 flex flex-col justify-between
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 mb-3 " onClick={handleJobDetails}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border">
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={company}
                className="max-h-full max-w-full object-contain"
              />
            ) : (
              <span className="text-gray-600 font-semibold text-lg">
                {company?.[0] || "C"}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{company}</h3>
            <p className="text-sm text-gray-600">{position}</p>
          </div>
        </div>
        <span className="text-xs text-gray-400 font-mono">#{applicationId}</span>
      </div>

      {/* Exam Section */}
      <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white rounded-xl p-4 mb-4">
        <p className="font-medium mb-3 text-sm uppercase tracking-wide border-b border-white/30 pb-1">
          Exam Overview
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Round 1 */}
          {interview.round1 && (
            <div className="bg-white text-gray-800 rounded-xl p-3 flex flex-col justify-between min-h-[15rem] shadow-sm">
              <div>
                <p className="font-semibold text-green-700 flex items-center gap-2 text-sm mb-2">
                  <BadgeCheck className="w-4 h-4" /> Round 1:{" "}
                  {interview.round1.title}
                </p>

                <div className="space-y-1 text-xs">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>Last Date:</span>
                    <span className="font-semibold text-red-600">
                      {interview.round1.date}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Duration:</span>
                    <span>{interview.round1.time}</span>
                  </p>

                  <div className="mt-1">
                    <p className="flex items-center gap-2">
                      <LuNotepadText className="text-blue-500" />
                      <span>Topics:</span>
                    </p>
                    <ul className="list-disc list-inside pl-4">
                      {displayedTopics.map((topic, i) => (
                        <li key={i} className="text-gray-700">
                          {topic}
                        </li>
                      ))}
                    </ul>

                    {examTopics.length > 3 && (
                      <button
                        className="text-blue-600 text-xs mt-1 hover:underline"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? "Show less" : "Show more"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
                  onClick={() => {
                    const queryParams = new URLSearchParams({
                      company,
                      position,
                      topics: JSON.stringify(examTopics),
                    }).toString();
                    window.open(
                      `http://localhost:5174/?${queryParams}`,
                      "_blank"
                    );
                  }}
                >
                  Start Exam
                </button>
              </div>
            </div>
          )}

          {/* Round 2 */}
          {interview.round2 && (
            <div className="bg-white text-gray-800 rounded-xl p-3 flex flex-col justify-between min-h-[15rem] shadow-sm">
              <div>
                <p className="font-semibold text-purple-700 flex items-center gap-2 text-sm mb-2">
                  <BadgeCheck className="w-4 h-4" /> Round 2:{" "}
                  {interview.round2.title}
                </p>

                <div className="text-xs space-y-1">
                  <p>
                    <FiUser className="inline-block mr-1 text-blue-500" />
                    Interviewer:{" "}
                    <span className="font-semibold text-indigo-600">
                      SkillVerify AI
                    </span>
                  </p>
                  <p>
                    <Clock className="inline-block mr-1 w-4 h-4 text-blue-500" />
                    Duration: 30 min
                  </p>
                  <p>
                    <LuNotepadText className="inline-block mr-1 text-blue-500" />
                    Topics: <ul className="list-disc list-inside pl-4">
                      <li >Resume Based</li>
                      <li> Experience</li>
                      <li>Comapany Info</li>
                    </ul>
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-indigo-700 transition">
                  Start Interview
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 text-xs">
        <button onClick={handleJobDetails} className="px-4 py-1.5 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50 transition">
          Job Details
        </button>
        <button className="px-4 py-1.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
          Practice
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;