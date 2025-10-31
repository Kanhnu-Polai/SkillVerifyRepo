import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  Users,
  IndianRupee,
  Calendar,
  GraduationCap,
  ClipboardList,
  FileText,
  ArrowRight,
  ArrowLeft,
  BadgeCheck,
} from "lucide-react";
import { FaLongArrowAltRight } from "react-icons/fa";


const GovtJobDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  if (!job) {
    return (
      <p className="text-center mt-10 text-gray-600 text-lg">
        No job data available.
      </p>
    );
  }

  const jobDetails = {
    1: {
      qualification:
        "B.E/B.Tech in Civil Engineering from a recognized university with at least 60% marks. Final-year students are also eligible.",
      examProcess: [
        "Preliminary Written Examination (Objective Type)",
        "Main Written Examination (Descriptive Type)",
        "Interview and Document Verification",
      ],
      markingScheme:
        "Each correct answer carries 1 mark; 0.25 marks deducted for wrong answers.",
      ageLimit: "21–32 years as on 01 Jan 2025 (Relaxation for SC/ST/OBC).",
      applicationFee:
        "₹500 for General/OBC candidates, ₹200 for SC/ST/PwD candidates.",
      importantDates: {
        startDate: "2025-10-01",
        lastDate: "2025-11-20",
        examDate: "2025-12-28 (Tentative)",
      },
    },
    2: {
      qualification:
        "Postgraduate degree in Statistics, Mathematical Statistics, or Applied Statistics from a recognized university.",
      examProcess: [
        "Written Examination (Objective + Descriptive Papers)",
        "Interview Round (200 Marks)",
        "Document Verification",
      ],
      markingScheme:
        "Each written paper carries 200 marks. Negative marking of 0.33 marks per wrong answer.",
      ageLimit: "21–30 years as on 01 Aug 2025 (Relaxation as per UPSC norms).",
      applicationFee:
        "₹200 for General/OBC candidates; No fee for SC/ST/PwD/Female candidates.",
      importantDates: {
        startDate: "2025-10-15",
        lastDate: "2025-12-10",
        examDate: "2026-02-14 (Tentative)",
      },
    },
    3: {
      qualification:
        "Bachelor’s Degree in any discipline from a recognized university.",
      examProcess: [
        "Preliminary Examination (Objective)",
        "Main Examination (Descriptive)",
        "Typing Test (for Clerk post)",
        "Document Verification",
      ],
      markingScheme:
        "Each correct answer gives 1 mark; 0.25 marks deducted for each wrong answer.",
      ageLimit: "18–37 years as on 01 Jan 2025 (Relaxation for reserved categories).",
      applicationFee:
        "₹540 for General/OBC, ₹135 for SC/ST/PwD candidates.",
      importantDates: {
        startDate: "2025-09-20",
        lastDate: "2025-11-25",
        examDate: "2026-01-15 (Tentative)",
      },
    },
  };

  const details = jobDetails[job.id];

  // ✅ Reusable Section Component
  const Section = ({ Icon, title, content, isList }) => (
    <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      {isList ? (
        <div className="list-disc pl-6 text-sm text-gray-700 space-y-1">
          {content.map((item, i) => (
            <div className="flex space-x-2 justify-start items-center">
               <span> <FaLongArrowAltRight/></span><span> {item}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 text-sm">{content}</p>
      )}
    </div>
  );

  return (
    <div className="p-6 md:p-10 mx-auto max-w-full bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen rounded-3xl shadow-xl">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-8 text-blue-700 hover:text-blue-900 transition font-semibold"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to All Jobs
      </button>

      {/* 🏛 Header Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start bg-gradient-to-r from-blue-800 to-indigo-900 gap-6 mb-8 rounded-2xl p-8 shadow-lg text-white">
        <img
          src={job.logo}
          alt="Logo"
          className="w-24 h-24 border-2 border-white rounded-full p-2 object-contain bg-white/10"
        />
        <div className="flex flex-col justify-between mt-2">
          <h2 className="md:text-3xl text-xl font-bold">{job.title}</h2>
          <p className="text-gray-200 text-sm mt-1">{job.department}</p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-blue-100" />
              <span>{job.place}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-100" />
              <span>{job.positions} Positions</span>
            </div>
            <div className="flex items-center gap-1">
              <IndianRupee className="w-4 h-4 text-blue-100" />
              <span>{job.salary}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-800 text-base leading-relaxed mb-8 bg-white/70 p-4 rounded-xl shadow-sm">
        {job.description}
      </p>

      {/* 🧩 Grid Section for Larger Screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        <Section
          Icon={GraduationCap}
          title="Qualification"
          content={details.qualification}
        />
        <Section
          Icon={ClipboardList}
          title="Exam Process"
          content={details.examProcess}
          isList
        />
        <Section
          Icon={FileText}
          title="Marking Scheme"
          content={details.markingScheme}
        />
        <Section
          Icon={Calendar}
          title="Important Dates"
          content={[
            `Application Start: ${details.importantDates.startDate}`,
            `Last Date to Apply: ${details.importantDates.lastDate}`,
            `Exam Date (Tentative): ${details.importantDates.examDate}`,
          ]}
          isList
        />
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-green-600" />
            Age Limit
          </h4>
          <p className="text-sm text-gray-700">{details.ageLimit}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-yellow-600" />
            Application Fee
          </h4>
          <p className="text-sm text-gray-700">{details.applicationFee}</p>
        </div>
      </div>

      {/* ✅ Apply Button */}
      <div className="text-center mt-10">
        <a
          href={job.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition shadow-md hover:shadow-lg text-base font-medium"
        >
          Apply on Official Website
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};

export default GovtJobDetails;