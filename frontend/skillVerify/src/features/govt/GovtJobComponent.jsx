import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GovtJobComponent = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  // ===== Dummy Government Jobs Data =====
  const govtJobs = [
    {
      id: 1,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQny8-X4yuwPH2NamFebcgmXLJ5jdY-ZZPSTA&s",
      department: "Odisha Public Service Commission (OPSC)",
      place: "Odisha Govt",
      title: "Assistant Engineer (Civil)",
      positions: 125,
      salary: "₹44,900 - ₹1,42,400 / month",
      officialUrl: "https://www.opsc.gov.in",
      description:
        "Odisha Public Service Commission invites applications for the post of Assistant Engineer (Civil) under the Works Department. Candidates with a B.E/B.Tech in Civil Engineering can apply.",
      lastDate: "2025-11-20",
    },
    {
      id: 2,
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5lJiDBMlsCDoHviX0IQYgQ3g0ulIEGc9FGw&s",
      department: "Union Public Service Commission (UPSC)",
      place: "Central Govt",
      title: "Indian Statistical Service (ISS) Exam",
      positions: 45,
      salary: "₹56,100 - ₹1,77,500 / month",
      officialUrl: "https://www.upsc.gov.in",
      description:
        "The UPSC conducts the Indian Statistical Service examination for candidates with postgraduate degrees in Statistics, Mathematical Statistics, or Applied Statistics.",
      lastDate: "2025-12-10",
    },
    {
      id: 3,
      logo: "https://images.indianexpress.com/2018/12/SSClogo759.jpg",
      department: "Bihar Staff Selection Commission (BSSC)",
      place: "Bihar Govt",
      title: "Clerk Recruitment 2025",
      positions: 350,
      salary: "₹25,500 - ₹81,100 / month",
      officialUrl: "https://bssc.bihar.gov.in",
      description:
        "BSSC invites applications for Clerk posts under various departments of the Bihar Government. Candidates with a Bachelor's degree are eligible to apply.",
      lastDate: "2025-11-25",
    },
  ];

  return (
    <div className="w-full p-4 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        🏛️ Latest Government Jobs
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {govtJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-md hover:shadow-xl rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between"
            onClick={() => {
    navigate("/govt-job-details", { state: { job } });
  }}
          >
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={job.logo}
                alt={`${job.place} Logo`}
                className="w-12 h-12 object-cover border rounded-full p-1"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-600">{job.department}</p>
              </div>
            </div>

            {/* Details Section */}
            <div className="text-sm text-gray-700 space-y-1 mb-4">
              <p>
                <span className="font-semibold text-gray-800">State:</span>{" "}
                {job.place}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Positions:</span>{" "}
                {job.positions}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Salary:</span>{" "}
                {job.salary}
              </p>
              <p>
                <span className="font-semibold text-gray-800">Last Date:</span>{" "}
                {job.lastDate}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              <button
                onClick={() => window.open(job.officialUrl, "_blank")}
                className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Apply on Official Site
              </button>

              <button
  onClick={() => {
    navigate("/govt-job-details", { state: { job } });
  }}
  className="flex-1 bg-gray-100 text-gray-800 text-sm py-2 rounded-lg hover:bg-gray-200 transition"
>
  View Details
</button>
            </div>
          </div>
        ))}
      </div>

      
      
          
    
    </div>
  );
};

export default GovtJobComponent;