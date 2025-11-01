import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, FileText } from "lucide-react";

const Step1BasicInfo = ({ company, setCompany }) => {
  // Optional: Log whenever company data changes (for debugging)
  useEffect(() => {
    console.log("🧾 Updated company:", company);
  }, [company]);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-6 space-y-6 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
        Company  Information
      </h2>
      <p className="text-gray-500 text-center mb-6">
        Let’s start with your company name and a short description.
      </p>

      {/* Company Name Field */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          <Building2 size={18} />
          Company Name
        </label>
        <input
          type="text"
          value={company.companyName || ""}
          onChange={(e) =>
            setCompany({ ...company, companyName: e.target.value })
          }
          placeholder="Enter your company name"
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Description Field */}
      <div className="space-y-1">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          <FileText size={18} />
          Description
        </label>
        <textarea
          value={company.companyDescription || ""}
          onChange={(e) =>
            setCompany({ ...company, companyDescription: e.target.value })
          }
          placeholder="Write a short description about your company..."
          rows={4}
          className="w-full p-3 border h-20 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
        />
      </div>

      {/* Optional live preview for debugging */}
      {/* <pre className="bg-gray-50 text-xs p-2 rounded-lg">
        {JSON.stringify(company, null, 2)}
      </pre> */}
    </motion.div>
  );
};

export default Step1BasicInfo;