// src/components/home/SkillAssessments.jsx
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Clock, BookOpen } from "lucide-react";

const assessments = [
  {
    title: "Verified by Experts",
    description: "Each assessment is created and reviewed by industry professionals to reflect real-world job expectations.",
    icon: ShieldCheck,
  },
  {
    title: "Time-Bound & Structured",
    description: "Tests are designed with time limits and difficulty scaling to evaluate actual problem-solving ability.",
    icon: Clock,
  },
  {
    title: "Auto-Graded & Instant",
    description: "Results are evaluated in real-time so users know where they stand and recruiters get accurate insights.",
    icon: CheckCircle,
  },
  {
    title: "Track & Improve",
    description: "Get personalized insights, retry assessments, and build a verified skill portfolio to stand out.",
    icon: BookOpen,
  },
];

const SkillAssessments = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-blue-50 to-sky-100">
      <motion.div
        className="max-w-4xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="md:text-3xl text-lg font-bold text-gray-800 mb-4">
          Skill Assessments
        </h2>
        <p className="text-gray-600 text-[13px] md:text-lg">
          Validate your expertise and get shortlisted faster with verified, industry-backed assessments.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
        {assessments.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <item.icon size={24} />
              </div>
              <h3 className="md:text-lg text-[15px] font-semibold text-gray-800">
                {item.title}
              </h3>
            </div>
            <p className="text-gray-600 text-[11px] md:text-sm">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SkillAssessments;