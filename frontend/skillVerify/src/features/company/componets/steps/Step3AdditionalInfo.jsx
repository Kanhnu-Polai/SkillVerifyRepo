import React from "react";
import { motion } from "framer-motion";
import { Building2, Globe, Users } from "lucide-react";

const Step3AdditionalInfo = ({ company, setCompany }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-6 space-y-6 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
        Company Details
      </h2>
      <p className="text-gray-500 text-center mb-6">
        Tell us more about your company’s size and online presence.
      </p>

      {/* Number of Employees */}
      <div className="space-y-2">
        <label className="block text-gray-700 font-medium">
          <Users className="inline mr-2 text-indigo-500" size={18} />
          Number of Employees
        </label>
        <input
          type="number"
          placeholder="e.g. 120"
          value={company.numberOfEmployees}
          onChange={(e) =>
            setCompany({ ...company, numberOfEmployees: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>

      {/* Company Website */}
      <div className="space-y-2">
        <label className="block text-gray-700 font-medium">
          <Globe className="inline mr-2 text-indigo-500" size={18} />
          Company Website
        </label>
        <input
          type="url"
          placeholder="https://yourcompany.com"
          value={company.website}
          onChange={(e) => setCompany({ ...company, website: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
      </div>

      
    </motion.div>
  );
};

export default Step3AdditionalInfo;