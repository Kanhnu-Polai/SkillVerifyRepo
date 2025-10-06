// src/components/home/TrendingJobs.jsx
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, CalendarDays, Users } from "lucide-react";

const jobs = [
  {
    title: "Frontend Developer (React.js)",
    company: "TechNova Inc.",
    location: "Bengaluru, India",
    type: "Full Time",
    applicants: 43,
    posted: "2 days ago",
  },
  {
    title: "Backend Engineer (Spring Boot)",
    company: "SkillMatrix Pvt Ltd",
    location: "Remote",
    type: "Internship",
    applicants: 28,
    posted: "1 day ago",
  },
  {
    title: "UI/UX Designer",
    company: "DesignX Studio",
    location: "Mumbai, India",
    type: "Part Time",
    applicants: 15,
    posted: "5 hours ago",
  },
];

const TrendingJobs = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-white to-white">
      <motion.div
        className="max-w-5xl mx-auto text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="md:text-3xl text-lg font-bold text-gray-800 mb-3">
           Trending
        </h2>
        <p className="text-gray-600 md:text-lg text-[13px]">
          Explore the most recent and in-demand job opportunities.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map((job, i) => (
          <motion.div
            key={i}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="md:text-xl text-[15px] font-semibold text-blue-700 mb-1">{job.title}</h3>
            <p className="text-gray-700 mb-2 text-[14px] md:text-base">{job.company}</p>

            <div className="flex items-center text-xs md:text-sm text-gray-600 gap-2 mb-1">
              <MapPin size={16} /> {job.location}
            </div>

            <div className="flex items-center text-xs md:text-sm text-gray-600 gap-2 mb-1">
              <Briefcase size={16} /> {job.type}
            </div>

            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Users size={16} /> {job.applicants} applicants
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays size={16} /> {job.posted}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingJobs;