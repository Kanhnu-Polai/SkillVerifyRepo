// src/components/account/ProfilePage.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import ProfileHeader from "./ProfileHeader";
import { uploadPhoto } from "../../../apiManager/userServiceApi";
import ContactInfo from "./ContactInfo";
import AddSocialMediaProfile from "./AddSocialMediaProfile";
import Experience from "./Experinece";
import Education from "./Education";
import ProfileInsights from "./ProfileInsights";
import { fetchUserData } from "../../../redux/thunk/UserDataThunk";


const ProfileInfo = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { userData } = useSelector((state) => state.userData);
  const userEmail = localStorage.getItem("userEmail")

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setError("");

    try {
      const res = await uploadPhoto(file, userData?.email);
      dispatch(fetchUserData(userEmail))
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
        <div className="flex flex-col justify-center items-start  md:flex-row gap-6">
          <div className="md:w-1/3 w-full bg-white  rounded-lg shadow-md p-2 space-y-4 " >
            {loading && (
              <div className="absolute   inset-0 flex items-center justify-center font-medium bg-white/60 z-10 ">
                <CircularProgress size={30} />
              </div>
            )}
            <ProfileHeader
              photoUrl={userData?.photoUrl}
              fullName={userData?.fullName}
             followersCount={userData?.followersCount}
             followingCount={userData?.followingCount}
              id="0001"
              onPhotoChange={handlePhotoChange}
              role={userData?.role}
            />
             <ProfileInsights views={userData.profileView} postsCount = {userData.postsCount} role = {userData.role} />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <ContactInfo userData={userData}></ContactInfo>
            <AddSocialMediaProfile userData ={userData} /> 
          </div>
          <div className="md:w-2/3 flex flex-col gap-6 w-full p-3 shadow-md  text-blue-200 bg-white/60 ">
           <section className=" bg-gradient-to-r from-cyan-700 to-cyan-800 rounded-2xl shadow-md p-6 ">
              <Experience experience = {userData.workExperience}/>
            </section>
      
            <section className=" bg-gradient-to-r from-cyan-700 to-cyan-800 rounded-2xl shadow-md p-6">
              <Education education={userData.educations}/>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfileInfo;