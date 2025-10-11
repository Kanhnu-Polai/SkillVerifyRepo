import React, { useState } from "react";
import {
  FaRegFileAlt,
  FaEye,
  FaThumbsUp,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";
import ViewPosts from "./ViewPosts";

const SpotlightStatus = ({ views, postsCount }) => {
  const [openPost, setOpenPost] = useState(false);

  const data = {
    posts: postsCount,
    profileViews: views,
    totalLikes: 97,
    examsAppeared: 6,
    qualifiedExams: 3,
  };

  return (
    <div className="w-full max-w-[680px] bg-gradient-to-br from-cyan-700 to-cyan-900 rounded-2xl p-5 shadow-lg">
      <h2 className="text-white text-lg font-semibold mb-4">Profile Insights</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {/* 🟨 No. of Posts */}
        <div
          onClick={() => setOpenPost(true)}
          className="bg-cyan-800/40 rounded-xl px-4 py-3 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:bg-cyan-800/60 transition-all duration-300 cursor-pointer"
        >
          <FaRegFileAlt className="mb-2 text-2xl text-yellow-300" />
          <p className="text-gray-200 text-xs font-medium text-center">
            No. of Posts
          </p>
          <p className="text-white text-lg font-semibold mt-1">
            {data.posts}
          </p>
        </div>

        {/* 🟩 Profile Views */}
        <div
          
          className="bg-cyan-800/40 rounded-xl px-4 py-3 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:bg-cyan-800/60 transition-all duration-300 cursor-pointer"
        >
          <FaEye className="mb-2 text-2xl text-emerald-300" />
          <p className="text-gray-200 text-xs font-medium text-center">
            Profile Views
          </p>
          <p className="text-white text-lg font-semibold mt-1">
            {data.profileViews}
          </p>
        </div>

        {/* 💗 Total Likes */}
        <div
          onClick={() => console.log("Likes clicked")}
          className="bg-cyan-800/40 rounded-xl px-4 py-3 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:bg-cyan-800/60 transition-all duration-300 cursor-pointer"
        >
          <FaThumbsUp className="mb-2 text-2xl text-pink-300" />
          <p className="text-gray-200 text-xs font-medium text-center">
            Total Likes
          </p>
          <p className="text-white text-lg font-semibold mt-1">
            {data.totalLikes}
          </p>
        </div>

        {/* 📋 Exams Appeared */}
        <div
          onClick={() => console.log("Exams Appeared clicked")}
          className="bg-cyan-800/40 rounded-xl px-4 py-3 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:bg-cyan-800/60 transition-all duration-300 cursor-pointer"
        >
          <FaClipboardList className="mb-2 text-2xl text-sky-300" />
          <p className="text-gray-200 text-xs font-medium text-center">
            Exams Appeared
          </p>
          <p className="text-white text-lg font-semibold mt-1">
            {data.examsAppeared}
          </p>
        </div>

        {/* ✅ Qualified Exams */}
        <div
          onClick={() => console.log("Qualified Exams clicked")}
          className="bg-cyan-800/40 rounded-xl px-4 py-3 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:bg-cyan-800/60 transition-all duration-300 cursor-pointer col-span-2 md:col-span-1"
        >
          <FaCheckCircle className="mb-2 text-2xl text-emerald-400" />
          <p className="text-gray-200 text-xs font-medium text-center">
            Qualified Exams
          </p>
          <p className="text-white text-lg font-semibold mt-1">
            {data.qualifiedExams}
          </p>
        </div>
      </div>

      {/* Example: you can conditionally render your modal here */}
      {
        openPost && <ViewPosts onClose={setOpenPost}/>
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        //   <div className="bg-white rounded-lg p-5 w-[90%] max-w-md">
        //     <h3 className="text-lg font-semibold mb-3 text-cyan-700">
        //       Profile Views Details
        //     </h3>
        //     <p className="text-gray-600">
        //       You have {data.profileViews} profile views!
        //     </p>
        //     <button
        //       onClick={() => setOpenViewModal(false)}
        //       className="mt-4 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
        //     >
        //       Close
        //     </button>
        //   </div>
        // </div>
      }
    </div>
  );
};

export default SpotlightStatus;