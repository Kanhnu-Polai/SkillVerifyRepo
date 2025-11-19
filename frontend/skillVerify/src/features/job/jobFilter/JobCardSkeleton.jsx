import React from "react";

export default function JobCardSkeleton() {
  return (
    <div className="
      relative bg-white/60 backdrop-blur-md 
      border-4 border-gray-200 mx-2 rounded-2xl p-6 
      shadow-[0_4px_20px_rgba(0,0,0,0.05)]
      animate-pulse 
      w-full max-w-3xl 
    ">

      {/* Exam badge placeholder */}
      <div className="absolute top-4 right-4 w-20 h-5 bg-gray-200 rounded-full"></div>

      {/* Header */}
      <div className="flex gap-4 items-center">
        <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>

        <div className="flex-1">
          <div className="w-32 h-4 bg-gray-200 rounded mb-2"></div>
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex gap-2 mt-4">
        <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
        <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
        <div className="w-14 h-5 bg-gray-200 rounded-full"></div>
      </div>

      {/* Location + Job Type */}
      <div className="flex gap-6 mt-5">
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
        <div className="w-20 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Grid info */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="w-32 h-4 bg-gray-200 rounded"></div>
        <div className="w-28 h-4 bg-gray-200 rounded"></div>
        <div className="w-28 h-4 bg-gray-200 rounded"></div>
        <div className="w-32 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Applicants */}
      <div className="flex gap-6 mt-6">
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <div className="w-20 h-8 bg-gray-200 rounded-md"></div>
        <div className="w-20 h-8 bg-gray-200 rounded-md"></div>
        <div className="w-24 h-8 bg-gray-200 rounded-md"></div>
      </div>

      {/* Footer */}
      <div className="w-28 h-3 bg-gray-200 rounded mt-4 ml-auto"></div>
    </div>
  );
}