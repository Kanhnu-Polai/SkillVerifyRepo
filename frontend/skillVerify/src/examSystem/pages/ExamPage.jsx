import React, { useState } from "react";
import ExamNav from "../componets/ExamNav";
import { useLocation } from "react-router-dom";
import ExamOverview from "../componets/ExamOverview";
import ExamInitiation from "../componets/ExamInitiation";
import UserPhoto from "../componets/UserPhoto";
import AllowCamera from "../componets/AllowCamera";

const ExamPage = () => {
  const location = useLocation();
  const examInfo = location.state?.examInfo;

  console.log(examInfo);

  const[openExamOverview,setOpenExamOverview] = useState(true)
  const[openExamInitiaton,setOpenExamInitiaton] = useState(false)

   const[openPhotoModal,setOpenPhotoModal] = useState(false)
   const[openAllowCamera,setOpenAllowCamera] = useState(false)

  return (
    <div className="bg-sky-600 min-h-screen flex flex-col">
      {/* Navbar */}
      <ExamNav userId={examInfo?.userId} />

      {/* Content Centered */}
      <div className="flex flex-1 justify-center items-center bg-white">
       {
        openExamOverview && <ExamOverview examInfo={examInfo} setOpenExamOverview= {setOpenExamOverview} setOpenExamInitiaton = {setOpenExamInitiaton} setOpenPhotoModal = {setOpenPhotoModal} />   
       }

       {
        openExamInitiaton && <ExamInitiation examInfo={examInfo}  setOpenExamOverview= {setOpenExamOverview} setOpenExamInitiaton = {setOpenExamInitiaton} setOpenPhotoModal = {setOpenPhotoModal} />
       
       }

       {
        openPhotoModal && <UserPhoto examInfo={examInfo} setOpenExamOverview= {setOpenExamOverview} setOpenExamInitiaton = {setOpenExamInitiaton} setOpenPhotoModal = {setOpenPhotoModal} setOpenAllowCamera = {setOpenAllowCamera}/>
       }

       {
        openAllowCamera && <AllowCamera/>
       }
      </div>
    </div>
  );
};

export default ExamPage;