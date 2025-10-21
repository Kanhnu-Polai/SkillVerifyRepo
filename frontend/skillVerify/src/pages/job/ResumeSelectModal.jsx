import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function ResumeSelectModal({ job = {}, onClose, onSuccess }) {
  /* resumes + email from Redux ------------------------------------------------*/
  const resumes = useSelector((s) => s.userData?.userData?.resumes) ?? [];
  const userEmail =
    useSelector((s) => s.userData?.userData?.email) ||
    useSelector((s) => s.auth?.user?.email) ||
    "";

  /* local state --------------------------------------------------------------*/
  const [selected, setSelected]   = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState("");

  /* debug --------------------------------------------------------------------*/
  useEffect(() => {
    console.log("[ResumeSelectModal] resumes:", resumes);
  }, [resumes]);

  /* handle apply -------------------------------------------------------------*/
  const handleApply = async () => {
    if (!selected || !job.jobId) return;
    const payload = {
      jobSeekerEmail: userEmail,
      resumeUrl:      selected.resumeLink,
      jobId:          job.jobId,
      jobTitle:       job.jobTitle,
    };

    try {
      setSubmitting(true);
      const res = await axios.post("http://localhost:8088/api/applications/apply", payload, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("[ResumeSelectModal] Axios status:", res.status);
      onSuccess();
      onClose();
    } catch (e) {
      console.error("[ResumeSelectModal] Axios error:", e);
      setError("Could not submit application. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* UI -----------------------------------------------------------------------*/
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-lg p-6 z-10 w-96 max-h-[80vh] overflow-y-auto">
        <h3 className="font-semibold text-lg mb-4">Choose a résumé</h3>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        {resumes.length === 0 ? (
          <p className="text-sm text-gray-600">You haven’t uploaded any resumes yet.</p>
        ) : (
          <ul className="space-y-3">
            {resumes.map((r, idx) => (
              <li key={r.resumePublicId ?? idx} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="resume"
                  checked={selected?.resumePublicId === r.resumePublicId}
                  onChange={() => setSelected(r)}
                  className="accent-blue-600"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{r.resumeTitle}</p>
                </div>
                <a
                  href={r.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs hover:underline"
                >
                  preview
                </a>
              </li>
            ))}
          </ul>
        )}

        <button
          disabled={!selected || submitting}
          onClick={handleApply}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:opacity-40 text-white rounded-md py-2"
        >
          {submitting ? "Applying…" : "Apply with this résumé"}
        </button>
      </div>
    </div>
  );
}