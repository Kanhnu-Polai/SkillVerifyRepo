// ───────────────────────────────────────────────────────────────
//  src/components/account/jobPosterNavComponets/MyListedJobs.jsx
// ───────────────────────────────────────────────────────────────
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector }   from "react-redux";
import { toast }                      from "react-hot-toast";

import JobBoxPoster                   from "./jobs/JobBoxPoster";
import JobDetailsModal                from "./jobs/JobDetailsModal";

import {
  fetchJobsByPosterEmail,
  deleteJobById,            // 🔽 new thunk
} from "../../../redux/thunk/jobThunk";
import Footer from "../../../utils/footer/Footer";

const MyListedJobs = () => {
  const dispatch          = useDispatch();
  const { jobs, loading, error } = useSelector((s) => s.jobs);
  const userEmail         = useSelector((s) => s.auth.user?.email);

  /* ───────── Selected job for <JobDetailsModal> ───────── */
  const [selectedJob, setSelectedJob] = useState(null);

  /* ───────── Fetch jobs whenever we have an email ─────── */
  useEffect(() => {
    if (userEmail) dispatch(fetchJobsByPosterEmail(userEmail));
  }, [dispatch, userEmail]);

  /* ───────── Handlers ───────── */
  const handleView   = (job) => setSelectedJob(job);

  const handleDelete = async (job) => {
    const ok = window.confirm(
      `Delete “${job.jobTitle}” @ ${job.companyName}?`
    );
    if (!ok) return;

    try {
      await dispatch(deleteJobById(job.jobId, userEmail));
      toast.success("Job removed");
      fetchJobsByPosterEmail(userEmail)
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  };

  /* ───────── Render states ───────── */
  if (loading) return <p className="text-center mt-10">Loading jobs…</p>;
  if (error)   return <p className="text-center text-red-500 mt-10">{error}</p>;

  /* ───────── UI ───────── */
  return (
    <>
      {/* list */}
      <div className="p-4 space-y-4">
        {jobs?.length ? (
          jobs.map((job) => (
            <JobBoxPoster
              key={job.jobId}
              job={job}
              onView={()   => handleView(job)}
              onEdit={()   => console.log("edit", job)}
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