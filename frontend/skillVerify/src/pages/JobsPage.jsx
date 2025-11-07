import React, { useEffect, useState } from "react";
import PublicJobCard   from "../features/job/componets/PublicJobCard";
import ResumeSelectModal from "../components/resume/ResumeSelectModal";
import JobDetailsModal from "../features/job/modals/JobDetailsModal";
import Footer          from "../utils/footer/Footer";
import {fetchJobs} from "/src/apiManager/jobApi.js"

import { timeAgo }     from "../utils/time";
import { toast }       from "react-hot-toast";     // ensure react-hot-toast is installed
import JobFilter from "../features/job/jobFilter/JobFilter";
import { useNavigate } from "react-router-dom";


export default function JobsPage() {
  const isSaved = true
  const [jobs, setJobs]          = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // for details modal
  const [applyJob, setApplyJob]  = useState(null);      // full job object for résumé modal
  const [loading, setLoading]    = useState(true);
  const [error, setError]        = useState("");

  const navigate = useNavigate();

  
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchJobs();
        setJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleView = (job) => {
  navigate("/job-info", {
    state: { job }, // ✅ Pass the job object directly
  });
};

  /* --------- loading / error UI --------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading jobs…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  /* --------- main page --------- */
  return (
    <div >
      
          <div className="hidden md:block">
             <JobFilter/>
          </div>
          
      <main className="min-h-screen bg-gray-50  px-4 sm:px-6 lg:px-8 mt-4">
        
        <div className="max-w-7xl mx-auto">
         
         

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {jobs.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 ">
                No jobs available right now.
              </p>
            ) : (
              jobs.map((job) => (
                <PublicJobCard
                  key={job.jobId}
                  job={{
                    ...job,
                    postedAgo: timeAgo(job.createdAt),
                    shortlisted: job.numberOfCandidatesShortlisted,
                  }}
                  onView={() => handleView(job)}
                  onApply={() => setApplyJob(job)}      // ✅ pass full job
                  onSave={() => console.log("Save", job.jobId)}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* job details modal */}
      {selectedJob && (
        
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

      {/* résumé select modal */}
      {applyJob && (
        <ResumeSelectModal
          job={applyJob}                       // ✅ full job object
          onClose={() => setApplyJob(null)}
          onSuccess={() => toast.success("Application sent!")}
        />
      )}

     <div className="mb-18">
       <Footer />
     </div>
      <div className="fixed md:hidden bottom-0 left-0 w-full backdrop-blur-md border-t border-gray-200 justify-between flex md:justify-end items-center py-3 px-4 z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] space-x-2.5">
              {/* Save Button */}
              
      
               <JobFilter/>
            </div>
    </div>
  );
}