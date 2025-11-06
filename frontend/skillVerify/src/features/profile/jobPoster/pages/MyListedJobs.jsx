import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import JobBoxPoster from "../../../job/pages/JobBoxPoster";
import JobDetailsModal from "../../../job/modals/JobDetailsModal";

import {
  fetchJobsByPosterEmail,
  deleteJobById, 
} from "../../../../redux/thunk/jobThunk";
import { useNavigate } from "react-router-dom";


const MyListedJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { jobs, loading, error } = useSelector((s) => s.jobs);
  const userEmail = useSelector((s) => s.auth.user?.email);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (userEmail) dispatch(fetchJobsByPosterEmail(userEmail));
    
  }, [dispatch, userEmail]);

  /* ───────── Handlers ───────── */
  const handleView = (job) => {

    navigate("/profile/job-details",
       { state: { job } }
      
    )
    console.log("sfhshfhsjf")

  }
  


  const handleDelete = async (job) => {
    const ok = window.confirm(`Delete “${job.jobTitle}” @ ${job.companyName}?`);
    if (!ok) return;

    try {
      await dispatch(deleteJobById(job.jobId, userEmail));
      toast.success("Job removed");
      fetchJobsByPosterEmail(userEmail);
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  /* ───────── Render states ───────── */
  if (loading) return <p className="text-center mt-10">Loading jobs…</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  /* ───────── UI ───────── */
  return (
    <>
      {/* list */}
      <div className="p-4 md:space-x-4 space-y-3 md:space-y-0 md:flex-row flex flex-col ">
        {jobs?.length ? (
          jobs.map((job) => (
            <JobBoxPoster
              key={job.jobId}
              job={job}
              onView={() => handleView(job)}
              onEdit={() => console.log("edit", job)}
              onRemove={() => handleDelete(job)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No jobs listed yet.</p>
        )}
      </div>

      {/* modal */}
      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  );
};

export default MyListedJobs;
