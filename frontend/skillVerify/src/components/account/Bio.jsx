// src/components/account/Bio.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaPhone, FaMapMarkerAlt, FaUniversity, FaGraduationCap, FaUserGraduate, FaSchool } from "react-icons/fa";
import { MdEmail, MdLocationCity, MdPerson } from "react-icons/md";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress"; // spinner
import UpdateUserModal from "./UpdateUserModal";
import ProfileHeader from "./jobseekernavcomponets/utils/bioUtils/ProfileHeader";
import { uploadPhoto } from "../../apiManager/fileUploadApi";

const Bio = () => {
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
      <aside className="fixed top-24 left-4 w-80 max-h-[calc(100vh-6rem)] overflow-y-auto
        bg-slate-200 rounded-lg shadow-md p-6 font-poppins text-sm text-gray-800 space-y-4 z-20">
        
        {/* Update Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-md border bg-blue-950 text-slate-200 text-xs px-3 py-1 hover:bg-blue-900"
          >
            Update
          </button>
        </div>
        <hr />

        {/* Profile header with spinner overlay */}
        <div className="flex items-start gap-4 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60">
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
        </div>
        <div className="w-full border mt-2">
          
        </div>
        <section>
          <h3 className="text-sm font-semibold mb-1">About</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <FaPhone className="text-xs" />
            <span>{userData?.phone || '(+91) XXXXX XXXXX'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <MdEmail className="text-xs" />
            <span>{userData?.email || 'your@email.com'}</span>
          </div>
        </section>


        {error && <p className="text-red-500 text-xs">{error}</p>}

         <section className="border-t border-gray-300 pt-2">
          <h3 className="text-sm font-semibold mb-1">Address</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-xs" />
            <span>{userData?.address?.street || 'Your Street'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <MdLocationCity className="text-xs" />
            <span>{userData?.address?.city || 'Your City'}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <MdPerson className="text-xs" />
            <span>{userData?.address?.pin || 'PIN Code'}</span>
          </div>
        </section>
       <section className="border-t border-gray-300 pt-2 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">Education</h3>
            <div className="relative group">
              <AddIcon className="p-1 border rounded-full cursor-pointer hover:bg-slate-800 hover:text-white" />
              <span
                className="
                  absolute left-1/2 -translate-x-1/2 -top-8
                  hidden group-hover:block bg-black text-white text-xs
                  px-2 py-1 rounded shadow"
              >
                Add more
              </span>
            </div>
          </div>

          {userData?.educations?.length ? (
            userData.educations.map((edu, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-600">
                <FaGraduationCap className="text-xs" />
                <span>
                  {edu.level} - {edu.institution || edu.institute}, {edu.passingYear}
                </span>
              </div>
            ))
          ) : (
            <>
              <div className="flex items-center gap-2 text-gray-600">
                <FaSchool className="text-xs" />
                <span>Jsco Public School, Bhubaneswar</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaUniversity className="text-xs" />
                <span>CHSE Odisha – Science, 2019</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaGraduationCap className="text-xs" />
                <span>B.Sc Computer Science – Utkal Univ., 2022</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FaUserGraduate className="text-xs" />
                <span>M.Sc CS – Vikram Dev Univ. (Pursuing)</span>
              </div>
            </>
          )}
        </section>

      </aside>

      <UpdateUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Bio;