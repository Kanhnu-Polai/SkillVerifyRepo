// src/components/home/Testimonials.jsx
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Anjali Verma",
    role: "Software Engineer @ TCS",
    feedback:
      "SkillVerify helped me land my dream job with verified assessments. The platform felt modern, fair, and merit-based!",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Rahul Mehra",
    role: "Talent Acquisition @ Infosys",
    feedback:
      "We saved hours in filtering resumes. Only qualified candidates made it to the interviews. Highly recommend SkillVerify.",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Sneha Patil",
    role: "Student @ NIT Rourkela",
    feedback:
      "The platform gave me exposure and practice. The auto-graded assessments were a game changer!",
    image: "https://i.pravatar.cc/100?img=32",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="md:text-3xl text-lg font-bold text-gray-800 mb-2"> Testimonials</h2>
        <p className="text-gray-600 text-[13px] md:text-lg">What our users are saying....</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            className="bg-blue-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="md:w-12 md:h-12 w-10 h-10 rounded-full ring-2 ring-white shadow"
              />
              <div>
                <h4 className="font-semibold">{t.name}</h4>
                <p className="md:text-sm text-[13px] text-gray-500">{t.role}</p>
              </div>
            </div>
            <p className="md:text-sm text-[11px] text-gray-700 italic">“{t.feedback}”</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;