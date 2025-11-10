// src/components/home/HowItWorks.jsx
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, FileText, Send, BadgeCheck } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Step 1: Create Your Profile",
    desc: "Sign up and build your verified profile with your skills, certifications, and education.",
  },
  {
    icon: BadgeCheck,
    title: "Step 2: Prove Your Skills",
    desc: "Take assessments to validate your skills and increase your chances of getting shortlisted.",
  },
  {
    icon: Send,
    title: "Step 3: Apply & Get Hired",
    desc: "Apply to jobs, track your application status, and land your dream opportunity.",
  },
];

const HowItWorks = () => {
  return (
    <section className=" py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="md:text-3xl text-lg font-bold text-gray-900 mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 md:text-lg text-[13px]">
          Follow these simple steps to get hired or hire top talent with confidence.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center p-6 border rounded-xl shadow-md  hover:shadow-xl transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="md:mb-4  md:w-16  md:h-16  mb-2 w-14  h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <step.icon size={32} />
            </div>
            <h3 className="text-[15px] md:text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
            <p className="text-gray-600 text-[11px] md:text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;