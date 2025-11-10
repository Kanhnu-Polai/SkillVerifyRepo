// src/components/home/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  Briefcase,
  ShieldCheck,
  Filter,
  MonitorSmartphone,
  UploadCloud,
  Users,
  BellRing,
  BarChart2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  // ✅ Get role safely from localStorage
  const role = localStorage.getItem("role");

  const naviagte = useNavigate()

  // ✅ Determine slogan text
  const getSloganText = () => {
    if (role === "JOB_SEEKER") return "Find Your Dream Opportunity!";
    if (role === "JOB_POSTER") return "Find the Right Talent for Your Company!";
    return "Find Your Dream Job or Post One Today!";
  };

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="w-full md:h-[500px] py-12 md:py-20 px-6 flex justify-center items-center text-center shadow-md  shadow-blue-400 rounded-b-4xl  ">
        <motion.div
          className="mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Heading */}
          <h1 className="mb-4 md:text-6xl font-extrabold leading-tight tracking-tight">
            {role === "JOB_POSTER" ? "Hire the Best " : "Find Your Dream "}
            <span className="inline-block min-w-[9ch] bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              <TypeAnimation
                sequence={
                  role === "JOB_POSTER"
                    ? ["Candidate", 1800, "Intern", 1800, "Employee", 1800]
                    : ["Job", 1800, "Internship", 1800, "Career", 1800]
                }
                speed={55}
                wrapper="span"
                repeat={Infinity}
              />
            </span>
            {role === "JOB_POSTER" ? " Today!" : " Now!"}
          </h1>

          {/* Subtext */}
          <p className="mb-10 text-xs md:text-lg text-gray-700">
            {role === "JOB_SEEKER" &&
              "SkillVerify connects job seekers with verified employers for internships and full-time roles."}
            {role === "JOB_POSTER" &&
              "SkillVerify helps companies connect with skilled and verified candidates easily."}
            {!role &&
              "SkillVerify helps candidates, companies, and colleges connect with verified skill profiles."}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 md:text-lg text-xs">
            {/* Show based on role */}
            {!role && (
              <>
                <button className="rounded-[9px] md:rounded-full bg-blue-600 min-w-24 md:min-w-32 md:px-6 md:py-2 text-white shadow hover:bg-blue-700 focus:outline-none  focus:ring-4 focus:ring-blue-300 transition-colors"
                onClick={()=>{
                  naviagte("/jobs")
                }}>
                  Explore Jobs
                </button>

                <button className="rounded-[9px] md:rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 min-w-24 md:min-w-32 md:px-6 md:py-2 py-2 text-white shadow hover:from-fuchsia-600 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 transition-colors">
                  Post a Job
                </button>
              </>
            )}

            {role === "JOB_SEEKER" && (
              <button className="rounded-[9px] md:rounded-full bg-blue-600 min-w-24 md:min-w-32 md:px-6 md:py-2 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 px-4 p-3 transition-colors"
              onClick={()=>{
                  naviagte("/jobs")
                }}>
                Explore Jobs
              </button>
            )}

            {role === "JOB_POSTER" && (
              <button className="rounded-[9px] md:rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 min-w-24 md:min-w-32 md:px-6 md:py-2 py-2 text-white shadow hover:from-fuchsia-600 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 transition-colors">
                Post a Job
              </button>
            )}
          </div>
        </motion.div>
       
      </section>
       
    </>
  );
};

export default HeroSection;