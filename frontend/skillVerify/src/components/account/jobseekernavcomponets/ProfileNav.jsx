// src/components/account/ProfilePage.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaUniversity,
  FaGraduationCap,
  FaUserGraduate,
  FaSchool,
  FaBriefcase,
} from "react-icons/fa";
import { MdEmail, MdLocationCity, MdPerson } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import UpdateUserModal from "../UpdateUserModal";
import ProfileHeader from "./utils/bioUtils/ProfileHeader";
import { uploadPhoto } from "../../../apiManager/fileUploadApi";

const ProfileNav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { userData } = useSelector((state) => state.userData);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setError("");

    try {
      const res = await uploadPhoto(file, userData?.email);
      console.log("Photo updated:", res);
    } catch (err) {
      console.error("Photo upload failed:", err);
      setError("Photo upload failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className=" font-poppins text-gray-800 mt-1 flex flex-col  justify-center   ">
        {/* Header */}
        <div className="flex justify-end items-center  mb-8 ">
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-md border bg-blue-950 text-slate-200 text-xs p-1 m-0.5 md:absolute md:top-40 md:text-sm md:px-4 md:py-2 hover:bg-blue-900"
          >
            Update Profile
          </button>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col justify-center items-center  md:flex-row gap-6">
          {/* Left: Photo + Contact */}
          <div className="md:w-1/3 w-full bg-white  rounded-lg shadow-md p-2 space-y-4">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center font-medium bg-white/60 z-10 ">
                <CircularProgress size={30} />
              </div>
            )}
            <ProfileHeader
              photoUrl={userData?.photoUrl}
              fullName={userData?.fullName}
              id="0001"
              onPhotoChange={handlePhotoChange}
              role={userData?.role}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <div className="space-y-2 mt-4  text-blue-200 md:text-xs text-[10px] font-medium  border-2 bg-gradient-to-r from-blue-700 to-sky-700 p-3 rounded-2xl ">
              <p>
                <FaPhone className="inline mr-2 text-gray-100" />
                {userData?.phone || "(+91) XXXXX XXXXX"}
              </p>
              <p>
                <MdEmail className="inline mr-2 text-gray-100" />
                {userData?.email || "your@email.com"}
              </p>
              <p>
                <FaMapMarkerAlt className="inline mr-2 text-gray-100" />
                {userData?.address?.street || "Your Street"},{" "}
                {userData?.address?.city || "City"} -{" "}
                {userData?.address?.pin || "PIN"}
              </p>
            </div>
          </div>

          
          <div className="md:w-2/3 flex flex-col gap-6 w-full p-3 shadow-md  text-blue-200 bg-white/60 ">
           <section className=" bg-gradient-to-r from-blue-700 to-sky-700 rounded-2xl shadow-md p-6 ">
              <div>
                 <h2 className="text-sm md:text-xl  text-blue-100 font-semibold">Experience</h2>
                <div className="w-full h-0.5 rounded-2xl antialiased bg-blue-200 "></div>
               </div>
              <div className="space-y-2  mt-2">
                {userData?.experience?.length
                  ? userData.experience.map((exp, i) => (
                      <p key={i} className="text-gray-700 flex items-center gap-2">
                        <FaBriefcase />
                        {exp.role} - {exp.company}, {exp.year}
                      </p>
                    ))
                  : (
                    <p className="text-blue-200 text-[10px] md:text-xs font-medium flex items-center gap-2">
                      <FaBriefcase /> HulkTech Intern - 2025
                    </p>
                  )}
              </div>
            </section>
            
            <section className=" bg-gradient-to-r from-blue-700 to-sky-700 p-3 rounded-2xl  shadow-md  text-xs md:text-md">
              
              <div className="flex justify-between items-center  p-3">
               <div className=" w-full">
                 <h2 className="text-sm md:text-xl  text-blue-100 font-semibold">Education</h2>
                 <div className="w-full h-0.5 rounded-2xl antialiased bg-blue-200"></div>
                
               </div>
                
                
              </div>
              
              <div className="space-y-2 px-3">
                {userData?.educations?.length
                  ? userData.educations.map((edu, i) => (
                      <p key={i} className=" text-blue-200 flex md:text-xs text-[10px] font-medium items-center gap-2">
                        <FaGraduationCap />
                        {edu.level} - {edu.institution || edu.institute},{" "}
                        {edu.passingYear}
                      </p>
                    ))
                  : (
                    <>
                      <p className="text-gray-700 flex items-center gap-2">
                        <FaSchool /> Jsco Public School, Bhubaneswar
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <FaUniversity /> CHSE Odisha – Science, 2019
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <FaGraduationCap /> B.Sc Computer Science – Utkal Univ., 2022
                      </p>
                      <p className="text-gray-700 flex items-center gap-2">
                        <FaUserGraduate /> M.Sc CS – Vikram Dev Univ. (Pursuing)
                      </p>
                    </>
                  )}
              </div>
            </section>
           
          </div>
        </div>
      </main>

      <UpdateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ProfileNav;