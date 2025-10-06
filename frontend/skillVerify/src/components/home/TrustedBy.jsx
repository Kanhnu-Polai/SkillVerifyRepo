// src/components/home/TrustedBy.jsx
import React from "react";

const logos = [
  "https://upload.wikimedia.org/wikipedia/commons/4/44/TCS_New_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d0/Infosys_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/55/NIT_Rourkela_Logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/9e/Accenture.svg",
];

const TrustedBy = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <h3 className="text-2xl font-semibold text-gray-700 mb-8">
          ✅ Trusted by Companies & Colleges
        </h3>
        <div className="flex justify-center items-center flex-wrap gap-8">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="Logo"
              className="h-12 grayscale hover:grayscale-0 transition duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;