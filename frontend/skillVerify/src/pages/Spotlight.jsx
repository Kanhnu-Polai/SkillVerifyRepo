import React, { useState } from "react";
import { AiOutlineCaretLeft } from "react-icons/ai";
import SpotlightNav from "../components/spotlight/SpotlightNav";
import Post from "../components/spotlight/Post";
import { useEffect } from "react";

const Spotlight = () => {
  const [hide, setHide] = useState(false);
  const [activeTopic, setActiveTopic] = useState("Trending");

  const[isMobile,setIsMobile] = useState(false)
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind `md`
    };
    handleResize(); // run initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleTopicChange = (topic) => {
    setActiveTopic(topic);
    if (isMobile) setHide(true); // auto-close only on mobile
  };

  return (
    <div className="relative h-screen">
      {/* Sidebar (overlay style) */}
      <div
        className={`absolute top-0 left-0 h-full bg-gradient-to-r from-slate-900 to-slate-700 rounded-md transition-all duration-300 ease-in-out z-20
          ${hide ? "w-0 overflow-hidden" : "md:w-60 w-52"}`}
      >
        <SpotlightNav activeTopic={activeTopic} setActiveTopic={handleTopicChange}  />
      </div>

      {/* Main content */}
      <div className="flex-1 relative h-full">
        {/* Floating toggle button */}
        <button
          className={`absolute top-2 left-2 z-20 text-blue-500 text-3xl rounded-full
            transition-transform duration-300 ease-in-out ${hide ? "rotate-180" : ""}`}
          onClick={() => setHide(!hide)}
        >
          <AiOutlineCaretLeft />
        </button>

        {/* Content */}
        <div className="pt-6 pl-8 pr-5 h-full overflow-y-auto">
          {activeTopic === "Trending" && <Post />}
          {activeTopic === "Recent" && <h1 className="text-2xl font-bold">⏰ Recent Posts</h1>}
          {activeTopic === "Following" && <h1 className="text-2xl font-bold">👥 Following Posts</h1>}
          {activeTopic === "Saved" && <h1 className="text-2xl font-bold">📑 Saved Posts</h1>}
          {activeTopic === "My Posts" && <h1 className="text-2xl font-bold">👤 My Posts</h1>}
          {activeTopic === "Tags" && <h1 className="text-2xl font-bold">🏷️ Tagged Posts</h1>}
          {activeTopic === "Recommended" && <h1 className="text-2xl font-bold">⭐ Recommended Posts</h1>}
        </div>
      </div>
    </div>
  );
};

export default Spotlight;