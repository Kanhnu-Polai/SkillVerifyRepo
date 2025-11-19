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
import JobCardSkeleton from "../features/job/jobFilter/JobCardSkeleton";
import BottomNav from "../components/home/ButtomNav";
import JobFilterTab from "../features/job/jobFilter/JobFilterTab";
import FilterModal from "../features/job/componets/mobileComponets/FilterModal";


export default function JobsPage() {
  const isSaved = true
  const [jobs, setJobs]          = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // for details modal
  const [applyJob, setApplyJob]  = useState(null);      // full job object for résumé modal
  const [loading, setLoading]    = useState(true);
  const [error, setError]        = useState("");
  const[openMobileFilter,setOpenMobileFilter] =useState(false)

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
      <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 mt-6">
      <div className="flex flex-col gap-8 max-w-7xl mx-auto">
        <JobCardSkeleton />
        <JobCardSkeleton />
        <JobCardSkeleton />
      </div>
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
     {
      openMobileFilter && <FilterModal onClose = {setOpenMobileFilter} />
     }
    
      

            <JobFilterTab setOpenMobileFilter = {setOpenMobileFilter}/>
    </div>
  );
}