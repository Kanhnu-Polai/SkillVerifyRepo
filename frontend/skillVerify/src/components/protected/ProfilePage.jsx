// src/components/protected/ProfilePage.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

/* Seeker-only pages */
import Applications from "../../features/profile/jobSeeker/pages/Applications";
import SavedJobs from "../../features/profile/jobSeeker/pages/SavedJobs";
import ResumeManager from "../../features/profile/jobSeeker/pages/ResumeManager";
import Settings from "../../features/profile/jobSeeker/pages/Settings";
import JobSeekerNav from "../../features/profile/jobSeeker/navbar/JobSeekerNav";
import JobPosterNav from "../../features/profile/jobPoster/navbar/JobPosterNav";
import MyListedJobs from "../../features/profile/jobPoster/pages/MyListedJobs";
import JobApplicants from "../../features/profile/jobPoster/pages/JobApplicants";
import ShortlistedCandidates from "../../features/profile/jobPoster/pages/ShortlistedCandidates";
import RevievedResumes from "../../features/profile/jobPoster/pages/RevievedResumes";
import PosterSetting from "../../features/profile/jobPoster/pages/PosterSetting";
import Footer from "../../utils/footer/Footer";

import ProfileNav from "../../features/profile/componets/ProfileInfo";
import Company from "../../features/profile/jobPoster/pages/Company";
import CompanyDetails from "../../features/company/componets/CompanyDetails";

const ProfilePage = () => {
  const { userData } = useSelector((state) => state.userData);
  const role = userData?.role || "GUEST";

  const renderRoleSpecificContent = () => {
    switch (role) {
      case "JOB_SEEKER":
        return (
          <>
            <div>
              <JobSeekerNav />

              <Routes>
                <Route path="applied-job" element={<Applications />} />
                <Route path="saved-jobs" element={<SavedJobs />} />
                <Route path="resume-manager" element={<ResumeManager />} />
                <Route path="settings" element={<Settings />} />
                <Route path="bio" element={<ProfileNav></ProfileNav>} />
              </Routes>
            </div>
          </>
        );

      case "JOB_POSTER":
        return (
          <>
            <JobPosterNav></JobPosterNav>

            <Routes>
              <Route path="bio" element={<ProfileNav></ProfileNav>}></Route>
              <Route
                path="my-listed-jobs"
                element={<MyListedJobs></MyListedJobs>}
              ></Route>
              <Route
                path="job-applications"
                element={<JobApplicants></JobApplicants>}
              ></Route>
              <Route
                path="short-listed"
                element={<ShortlistedCandidates></ShortlistedCandidates>}
              ></Route>
              <Route
                path="reviced-resumes"
                element={<RevievedResumes></RevievedResumes>}
              ></Route>
              <Route path="company" element = {<Company/>}/>
              <Route
                path="poster-settings"
                element={<PosterSetting></PosterSetting>}
              ></Route>
              <Route path="company-details" element = {<CompanyDetails/>} />
            </Routes>
          </>
        );

      default:
        return (
          <div className="mt-10 text-gray-600">
            No profile sections available for this user role.
          </div>
        );
    }
  };

  return (
    <>
      <div className="flex flex-row items-start gap-6">
        <div className="">{renderRoleSpecificContent()}</div>
      </div>

      <div className="relative top-56">
        <Footer></Footer>
      </div>
    </>
  );
};

export default ProfilePage;
