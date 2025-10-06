// components/common/CallToAction.jsx
import React from "react";
import { motion } from "framer-motion";

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-6 sm:px-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="md:text-3xl text-xl font-bold mb-4">
          Ready to Find or Post Your Next Big Opportunity?
        </h2>
        <p className="md:text-lg text-[12px] mb-8 text-white/90">
          Join thousands of candidates and recruiters already using <strong>SkillVerify</strong> to discover the best matches based on real skills—not just resumes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/jobs"
            className="px-6 py-3 bg-white text-sm md:text-base text-blue-700 font-semibold rounded-full shadow hover:shadow-lg hover:bg-gray-100 transition"
          >
            Explore Jobs
          </a>
          <a
            href="/post-job"
            className="px-6 py-3 border text-sm md:text-base border-white font-semibold rounded-full hover:bg-white hover:text-purple-700 transition"
          >
            Post a Job
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction;