import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Building } from "lucide-react";

const COMPANY_TYPES = [
  "STARTUP",
  "SME",
  "ENTERPRISE",
  "NON_PROFIT",
  "GOVERNMENT_AGENCY",
  "EDUCATIONAL_INSTITUTION",
  "MNC",
  "PRODUCT_BASED",
  "SERVICE_BASED",
  "OTHER",
];

const Step2TypeInfo = ({ company, setCompany }) => {
  const [selectedTypes, setSelectedTypes] = useState(company.companyTypes || []);

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  // Update parent company object whenever selectedTypes changes
  useEffect(() => {
    setCompany({ ...company, companyTypes: selectedTypes });
  }, [selectedTypes]);

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-6 space-y-6 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
        Company Type
      </h2>
      <p className="text-gray-500 text-center mb-6">
        Select one or more categories that best describe your company.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {COMPANY_TYPES.map((type) => {
          const isSelected = selectedTypes.includes(type);
          return (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={`flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-xl border transition-all ${
                isSelected
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {isSelected && <CheckCircle2 size={16} />}
              {type.replaceAll("_", " ")}
            </button>
          );
        })}
      </div>

      {/* Optional Debugging Preview */}
      {/* <pre className="bg-gray-50 text-xs p-2 rounded-lg">
        {JSON.stringify(selectedTypes, null, 2)}
      </pre> */}
    </motion.div>
  );
};

export default Step2TypeInfo;