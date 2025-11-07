import React from "react";
import { MdAssignment, MdClose } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

const ExamDetailModal = ({
  onClose,
  examTopics = [],
  round1 = false,
  round2 = false,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className="
          bg-gradient-to-br from-white via-gray-50 to-gray-100
          w-full max-w-2xl mx-3 rounded-2xl shadow-2xl
          border border-gray-200 relative overflow-hidden animate-fadeIn
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5 bg-white/80 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <MdAssignment className="text-blue-600 text-2xl" />
            <h1 className="text-xl font-semibold text-gray-800 tracking-wide">
              Exam Information
            </h1>
          </div>
          <button
            onClick={() => onClose(false)}
            className="text-gray-500 hover:text-red-500 transition-transform transform hover:scale-110"
          >
            <MdClose size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 bg-white">
          {/* Intro */}
          <p className="text-gray-600 text-sm leading-relaxed">
            Welcome to the <span className="font-semibold text-blue-600">SkillVerify </span> 
            recruitment assessment. The exam consists of multiple evaluation
            rounds designed to test your technical and communication skills.
          </p>

          {/* Round 1 */}
          {round1 && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition">
              <h2 className="text-gray-800 font-semibold flex items-center gap-2 mb-2">
                <AiOutlineCheckCircle className="text-blue-600" />
                Round 1: <span className="text-blue-700">Online Assessment</span>
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                This round evaluates your technical and logical problem-solving
                abilities through an online coding and aptitude test.
              </p>
              {examTopics.length > 0 && (
                <>
                  <p className="text-gray-700 text-sm font-medium">
                    Included Topics:
                  </p>
                  <ul className="mt-2 ml-2 grid grid-cols-2 gap-1 text-xs">
                    {examTopics.map((topic, index) => (
                      <li
                        key={index}
                        className="bg-blue-600/90 text-white rounded-md px-2 py-1 shadow-sm"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* Round 2 */}
          {round2 && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-violet-300 transition">
              <h2 className="text-gray-800 font-semibold flex items-center gap-2 mb-2">
                <AiOutlineCheckCircle className="text-violet-600" />
                Round 2: <span className="text-violet-700">AI-Based HR Interview</span>
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                Candidates who qualify Round 1 will proceed to an AI-powered HR
                interview conducted by{" "}
                <b className="text-violet-700">SkillVerify AI</b>. This round
                focuses on communication skills, confidence, and behavioral fit.
              </p>

              <p className="text-gray-700 text-sm font-medium">
                Discussion Areas:
              </p>
              <ul className="mt-2 ml-2 grid grid-cols-2 gap-1 text-xs">
                <li className="bg-violet-600/90 text-white rounded-md px-2 py-1 shadow-sm">
                  Resume-Based Questions
                </li>
                <li className="bg-violet-600/90 text-white rounded-md px-2 py-1 shadow-sm">
                  Company Discussion
                </li>
                <li className="bg-violet-600/90 text-white rounded-md px-2 py-1 shadow-sm">
                  Experience & Achievements
                </li>
                <li className="bg-violet-600/90 text-white rounded-md px-2 py-1 shadow-sm">
                  Behavioral Analysis
                </li>
              </ul>
            </div>
          )}

          {/* Summary */}
          {(round1 || round2) && (
            <div className="border-t border-gray-200 pt-3 text-sm text-gray-600 italic">
               <span className="text-blue-600 font-medium">Pro Tip:</span> 
              Qualifying all rounds ensures your resume is automatically 
              shortlisted and forwarded to top recruiters via{" "}
              <span className="text-violet-700 font-semibold">SkillVerify</span>.
            </div>
          )}

          {/* If no round */}
          {!round1 && !round2 && (
            <p className="text-center text-gray-500 italic text-sm">
              ⚠️ Exam details not available yet. Please check back later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamDetailModal;