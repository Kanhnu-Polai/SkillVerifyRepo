import React from "react";
import { GraduationCap, ArrowRightCircle } from "lucide-react";

const JobQualification = ({ qualificationList = [] }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
      {/* 🧠 Heading */}
      <div className="flex items-center gap-2 mb-4 border-b pb-2">
        <GraduationCap className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg md:text-xl font-semibold text-gray-900">
          Qualification
        </h3>
      </div>

      {/* 📋 List of qualifications */}
      {qualificationList.length > 0 ? (
        <ul className="space-y-3">
          {qualificationList.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-gray-700 text-sm leading-relaxed"
            >
              <ArrowRightCircle className="w-5 h-5 mt-0.5 text-blue-500 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm italic">
          Qualification details not available.
        </p>
      )}
    </div>
  );
};

export default JobQualification;