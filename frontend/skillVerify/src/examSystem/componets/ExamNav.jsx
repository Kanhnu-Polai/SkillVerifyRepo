import React from "react";

const ExamNav = ({userId}) => {
  return (
    <nav className="h-16 bg-slate-900 flex justify-between items-center px-6 shadow-md">
      {/* Left Section: Logo & Title */}
      <div className="flex flex-col leading-tight">
        
       
        {/* Main Title */}
        
        <h1 className="text-3xl font-bold tracking-tight text-white">
          <span className="bg-amber-600  text-white px-2 py-1 rounded-md font-extrabold shadow-sm">
            Test
          </span>
          <span className="ml-1 text-gray-100 ">Engine </span>
          
        </h1>
        
        
      </div>

      {/* Right Section: Optional Buttons */}
      <div className="flex items-center space-x-3">
        <button className="bg-amber-600 hover:bg-amber-500 text-white px-4 py-1 rounded-md text-sm transition">
            {
                userId ? `CANDIDATE-${userId}`:" Dashboard"
            }
         
        </button>
      </div>
    </nav>
  );
};

export default ExamNav;