import React from "react";
import T2 from "./T2";
import ProfileNav from "../account/jobseekernavcomponets/ProfileNav";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <aside className="w-52 md:w-64 bg-white shadow-md border-r sticky top-0 h-screen">
       <T2></T2>
      </aside>

      {/* Right Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
       <Outlet></Outlet>
      </main>
    </div>
  );
};

export default ProfileLayout;
