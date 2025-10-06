// src/components/home/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => (
  <>
    {/* ───────────── Hero ───────────── */}
    <section className="w-full bg-white py-12 md:py-20 px-6 text-center  shadow-md border-b-4 border-indigo-800 rounded-2xl">
      <motion.div
        className="mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Heading */}
        <h1 className="mb-4 md:text-4xl font-extrabold leading-tight tracking-tight">
          Find Your Dream&nbsp;
          <span className="inline-block min-w-[9ch] bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            <TypeAnimation
              sequence={[
                "Job",          1800,
                "Internship",   1800,
                "Career",       1800,
                "Opportunity",  1800,
              ]}
              speed={55}
              wrapper="span"
              repeat={Infinity}
            />
          </span>
          &nbsp;or&nbsp;Post One&nbsp;Today!
        </h1>

        {/* Sub-copy */}
        <p className="mb-10 text-xs md:text-lg text-gray-700">
          SkillVerify helps candidates, companies&nbsp;and colleges connect with
          <br className="hidden sm:block" />
          verified skill&nbsp;profiles.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:text-lg text-xs">
          <button className="rounded-[9px] md:rounded-full bg-blue-600 min-w-24 md:min-w-32 md:px-6 md:py-2 text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors">
            Explore Jobs
          </button>

          <button className="rounded-[9px] md:rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600  min-w-24 md:min-w-32 md:px-6 md:py-2 py-2 text-white shadow hover:from-fuchsia-600 hover:to-violet-700 focus:outline-none focus:ring-4 focus:ring-fuchsia-300 transition-colors">
            Post a Job
          </button>
        </div>
      </motion.div>
    </section>

   {/* Curved illusion without SVG */}
{/* Fade divider between Hero → Feature */}
 </>
);

export default HeroSection;