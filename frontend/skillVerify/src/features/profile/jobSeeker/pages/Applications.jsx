import React, { useEffect, useState } from "react";
import axios from "axios";
import ApplicationCard from "./ApplicationCard";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useSelector((state) => state.userData);
  const userEmail = userData?.email;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8088/api/applications/by-user/${userEmail}`
        );
        setApplications(response.data.body || []);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userEmail) fetchApplications();
  }, [userEmail]);

  return (
    <div className="w-full px-4 py-6">
      {loading ? (
        <div className="flex items-center gap-2 text-blue-600 justify-center">
          <Loader2 className="animate-spin" />
          <span>Loading your applications...</span>
        </div>
      ) : applications.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          You haven’t applied to any jobs yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {applications.map((job, index) => {
            const interview = {
              round1: job.round1Required
                ? {
                    title: "Online Exam",
                    date: "22 July 2025",
                    time: "2 Hours",
                    location: "Remote",
                  }
                : null,
              round2: job.round2Required
                ? { title: "AI HR Interview" }
                : null,
            };

            return (
              <ApplicationCard
              job={job}
                key={index}
                applicationId={`APP${String(index + 1).padStart(3, "0")}`}
                companyLogo={job.companyPhotoLink}
                company={job.companyName || "N/A"}
                position={job.jobTitle || "N/A"}
                experience={`${job.experience || 0}+ yrs`}
                salary={"₹12 LPA"}
                appliedOn={job.lastDateToApply}
                status={job.status || "Applied"}
                examTopics={job.examTopics || ["Java", "DSA", "Spring Boot", "OOPs", "SQL"]}
                interview={interview}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Applications;