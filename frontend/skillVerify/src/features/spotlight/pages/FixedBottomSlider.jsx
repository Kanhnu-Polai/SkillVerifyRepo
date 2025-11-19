import React, { useEffect, useState } from "react";
import { IoAddSharp } from "react-icons/io5";
import { TbCategoryFilled } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { BsBookmarkFill } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";

import Post from "../Post";
import CreatePost from "../CreatePost";
import CategoryGrid from "./RandomLayout";
import { PiInfinityFill } from "react-icons/pi";
import {
  Home,
  
} from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function FixedBottomSlider() {
  const [activeTopic, setActiveTopic] = useState("Random");
  const [activeTab, setActiveTab] = useState("Random"); 
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [categoryManager,setCategoryManager] = useState(true)
  const navigate = useNavigate()
  const mainTabs = ["Saved", "Account", "Categories"];

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
        {activeTab !== "Categories" && <Post category={activeTopic} />}
        {activeTab == "Random" && <Post/>}
        
        {activeTab === "Categories" && (
          <CategoryGrid 
            setActiveTopic={setActiveTopic}
            setActiveTab={setActiveTab}
            setCategoryManager={setCategoryManager}
          />
        )}
      </div>

     
      <div
        className="fixed bottom-0 left-0 w-full h-16 
      bg-white/60 backdrop-blur-lg 
      border-t border-white/40 
      shadow-[0_-4px_30px_rgba(0,0,0,0.1)]
      z-50 flex justify-around items-center "
      >




      <button
          onClick={() => {
           navigate("/")
            
          }}
          className="flex flex-col items-center hover:scale-105 transition-transform"
        >
          <Home
            className={`w-6 h-6 ${
              activeTab === "Categories" ? "text-gray-600" : "text-gray-600"
            }`}
          />

          <span
            className={`text-xs font-medium ${
              activeTab === "Categories" ? "text-gray-600" : "text-gray-700"
            }`}
          >
           Home
          </span>
        </button>
        {/* Categories */}
        <button
          onClick={() => {
            setActiveTab("Categories");
            setCategoryManager(false)
            
          }}
          className="flex flex-col items-center hover:scale-105 transition-transform"
        >
          <TbCategoryFilled
            className={`w-6 h-6 ${
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
         <div className="-mt-8">
          <button
            onClick={() => setOpen(true)}
            className="w-14 h-14 bg-white shadow-xl rounded-full flex items-center justify-center 
                       hover:scale-110 transition-transform border border-gray-300"
          >
            <IoAddSharp className="w-6 h-6 text-blue-600" />
          </button>
        </div>
        <button
          onClick={() => {
            setActiveTab("Random");   // FIXED
            setActiveTopic("Random");
            setCategoryManager(true)
          }}
          className="flex flex-col items-center hover:scale-105 transition-transform"
        >
          <FaRandom
            className={`w-6 h-6 ${
              categoryManager ? "text-blue-600" : "text-gray-600"
            }`}
          />

          <span
            className={`text-xs font-medium ${
              categoryManager ? "text-blue-600" : "text-gray-700"
            }`}
          >
            {activeTopic === "Categories" ? "Trending" : activeTopic}
          </span>
        </button>
        <button
          onClick={() => {
            setActiveTab("Account");
           
            setCategoryManager(false)
          }}
          className="flex flex-col items-center hover:scale-105 transition-transform"
        >
          <PiInfinityFill
            className={`w-6 h-6 ${
              activeTab === "Account" ? "text-blue-600" : "text-gray-600"
            }`}
          />

          <span
            className={`text-xs font-medium ${
              activeTab === "Account" ? "text-blue-600" : "text-gray-700"
            }`}
          >
           My Post
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