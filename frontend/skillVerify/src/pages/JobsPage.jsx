import React, { useEffect, useState } from "react";
import PublicJobCard   from "./job/PublicJobCard";
import ResumeSelectModal from "./job/ResumeSelectModal";
import JobDetailsModal from "../components/account/jobPosterNavComponets/jobs/JobDetailsModal";
import Footer          from "../utils/footer/Footer";
import { fetchJobs }   from "../apiManager/jobApi";
import { timeAgo }     from "../utils/time";
import { toast }       from "react-hot-toast";     // ensure react-hot-toast is installed
import JobFilterBar from "../utils/job/JobFilterBar";

export default function JobsPage() {
  const [jobs, setJobs]          = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); // for details modal
  const [applyJob, setApplyJob]  = useState(null);      // full job object for résumé modal
  const [loading, setLoading]    = useState(true);
  const [error, setError]        = useState("");

  /* fetch once on mount */
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
       
           {/* <JobFilterBar></JobFilterBar> */}
          
      <main className="min-h-screen bg-gray-50  px-4 sm:px-6 lg:px-8 mt-22">
        
        <div className="max-w-7xl mx-auto">
         
         

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {jobs.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
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
                  onView={() => setSelectedJob(job)}
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

      <Footer />
    </div>
  );
}