// src/components/protected/ProfilePage.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Bio            from "../account/Bio";

/* Seeker-only pages */
import Applications   from "../account/jobseekernavcomponets/Applications";
import SavedJobs      from "../account/jobseekernavcomponets/SavedJobs";
import ResumeManager  from "../account/jobseekernavcomponets/ResumeManager";
import Settings       from "../account/jobseekernavcomponets/Settings";
import JobSeekerNav from "../account/jobseekernavcomponets/JobSeekerNav";
import JobPosterNav from "../account/jobPosterNavComponets/JobPosterNav";
import MyListedJobs from "../account/jobPosterNavComponets/MyListedJobs";
import JobApplicants from "../account/jobPosterNavComponets/JobApplicants";
import ShortlistedCandidates from "../account/jobPosterNavComponets/ShortlistedCandidates";
import RevievedResumes from "../account/jobPosterNavComponets/RevievedResumes";
import PosterSetting from "../account/jobPosterNavComponets/PosterSetting";
import Footer from "../../utils/footer/Footer";
import About from "../../utils/footer/About";
import ProfileNav from "../account/jobseekernavcomponets/ProfileNav";
import T2 from "../test/T2";

const ProfilePage = () => {
  
  const { userData } = useSelector((state) => state.userData);
  const role = userData?.role || "GUEST";

 
  const renderRoleSpecificContent = () => {
    switch (role) {
      case "JOB_SEEKER":
        return (
          <>
           <div className="border-4">
            
             <JobSeekerNav />

            <Routes>
              
              <Route path="applied-job"     element={<Applications   />} />
              <Route path="saved-jobs"      element={<SavedJobs      />} />
              <Route path="resume-manager"  element={<ResumeManager  />} />
              <Route path="settings"        element={<Settings       />} />
               <Route path="bio"        element={<ProfileNav></ProfileNav>} />
            </Routes>
           </div>
          </>
        );

      
      case "JOB_POSTER":
        return(
          <>
           <JobPosterNav></JobPosterNav>

           <Routes>
            <Route path="bio" element={<ProfileNav></ProfileNav>}></Route>
            <Route path="my-listed-jobs" element = {<MyListedJobs></MyListedJobs>}></Route>
            <Route path="job-applications" element = {<JobApplicants></JobApplicants>}></Route>
            <Route path="short-listed" element = {<ShortlistedCandidates></ShortlistedCandidates>}></Route>
            <Route path="reviced-resumes" element={<RevievedResumes></RevievedResumes>}></Route>
            <Route path="poster-settings" element={<PosterSetting></PosterSetting>}></Route>
           </Routes>
          </>
        )
       

             
      // case "ADMIN":
      //   return <AdminDashboard />;

      default:
        return (
          <div className="mt-10 text-gray-600">
            No profile sections available for this user role.
          </div>
        );
    }
  };

  /* --------------------------------------------------------------------
     MAIN RENDER
  -------------------------------------------------------------------- */
  return (<>
    <div className="flex flex-row items-start gap-6">
     {/* <div className="hidden md:block">
       <Bio />
     </div> */}
      <div className="">{renderRoleSpecificContent()}</div>
      
    </div>

    <div className="relative top-56">
     <Footer></Footer>
    </div>
    </>
  );
};

export default ProfilePage;