import React, { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { TbCategoryFilled } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { BsBookmarkFill } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";

import Post from "../Post";
import CreatePost from "../CreatePost";
import CategoryGrid from "./RandomLayout";

export default function FixedBottomSlider() {
  const [activeTopic, setActiveTopic] = useState("Home");
  const [activeTab, setActiveTab] = useState("Home"); 
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Tabs that should NOT highlight Trending
  const mainTabs = ["Home", "Saved", "Account", "Categories"];

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="pb-20">
      {/* MAIN CONTENT */}
      <div className="p-4">
        {activeTopic !== "Categories" && <Post />}
        {activeTopic === "Categories" && (
          <CategoryGrid 
            setActiveTopic={setActiveTopic}
            setActiveTab={setActiveTab}
          />
        )}
      </div>

      {/* FIXED BOTTOM NAVBAR */}
      <div
        className="fixed bottom-0 left-0 w-full bg-white/70 backdrop-blur-lg 
                   border-t shadow-[0_-4px_20px_rgba(0,0,0,0.06)]
                   p-3 flex justify-around items-center z-50"
      >

        {/* Categories */}
        <button
          onClick={() => {
            setActiveTab("Categories");
            setActiveTopic("Categories");
          }}
          className="flex flex-col items-center hover:scale-105 transition-transform"
        >
          <TbCategoryFilled
            className={`w-7 h-7 ${
              activeTab === "Categories" ? "text-blue-600" : "text-gray-600"
            }`}
          />

          <span
            className={`text-xs font-medium ${
              activeTab === "Categories" ? "text-blue-600" : "text-gray-700"
            }`}
          >
            Categories
          </span>
        </button>

        {/* Trending */}
        <button
          onClick={() => {
            setActiveTab("Trending");   // FIXED
            setActiveTopic("Trending");
          }}
          className="flex flex-col items-center hover:scale-105 transition-transform"
        >
          <FaRandom
            className={`w-7 h-7 ${
              activeTab === "Trending" ? "text-blue-600" : "text-gray-600"
            }`}
          />

          <span
            className={`text-xs font-medium ${
              activeTab === "Trending" ? "text-blue-600" : "text-gray-700"
            }`}
          >
            {activeTopic === "Categories" ? "Rand" : activeTopic}
          </span>
        </button>

        {/* Create Post Button */}
        <div className="-mt-8">
          <button
            onClick={() => setOpen(true)}
            className="w-14 h-14 bg-white shadow-xl rounded-full flex items-center justify-center 
                       hover:scale-110 transition-transform border border-gray-300"
          >
            <IoAddSharp className="w-8 h-8 text-blue-600" />
          </button>
        </div>

        {/* Saved */}
        <button
          onClick={() => {
            setActiveTab("Saved");
            setActiveTopic("Saved");
          }}
          className="flex flex-col items-center hover:scale-105 transition-transform"
        >
          <BsBookmarkFill
            className={`w-6 h-6 ${
              activeTab === "Saved" ? "text-blue-600" : "text-gray-600"
            }`}
          />

          <span
            className={`text-xs font-medium mt-0.5 ${
              activeTab === "Saved" ? "text-blue-600" : "text-gray-700"
            }`}
          >
            Saved
          </span>
        </button>

        {/* Account */}
        <button
          onClick={() => {
            setActiveTab("Account");
            setActiveTopic("Account");
          }}
          className="flex flex-col items-center hover:scale-105 transition-transform"
        >
          <FaUserCircle
            className={`w-8 h-8 ${
              activeTab === "Account" ? "text-blue-600" : "text-gray-600"
            }`}
          />

          <span
            className={`text-xs font-medium ${
              activeTab === "Account" ? "text-blue-600" : "text-gray-700"
            }`}
          >
            Account
          </span>
        </button>
      </div>

      {/* CREATE POST MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-[999] flex justify-center items-start md:items-center p-2">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl">
            <CreatePost setOpen={setOpen} />
          </div>
        </div>
      )}
    </div>
  );
}