import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

const Step4BranchesInfo = ({ company, setCompany }) => {
  const [branchCount, setBranchCount] = useState(company.numberOfBranches || 0);
  const [branches, setBranches] = useState(company.branches || []);
  const [currentBranchIndex, setCurrentBranchIndex] = useState(0);
  const [showBranchForm, setShowBranchForm] = useState(false);

  const handleConfirmCount = () => {
    if (branchCount <= 0) return;

    const newBranches = Array.from({ length: branchCount }, (_, index) => ({
      branchName: branches[index]?.branchName || "",
      headQuarter: branches[index]?.headQuarter || index === 0,
      address: {
        street: branches[index]?.address?.street || "",
        city: branches[index]?.address?.city || "",
        state: branches[index]?.address?.state || "",
        country: branches[index]?.address?.country || "",
        zipCode: branches[index]?.address?.zipCode || "",
      },
    }));
    setBranches(newBranches);
    setShowBranchForm(true);
  };

  useEffect(() => {
    if (showBranchForm) {
      setCompany({
        ...company,
        numberOfBranches: branchCount,
        branches,
      });
    }
  }, [branches, branchCount]);

  const handleChange = (field, value) => {
    const updated = [...branches];
    updated[currentBranchIndex][field] = value;
    setBranches(updated);
  };

  const handleAddressChange = (field, value) => {
    const updated = [...branches];
    updated[currentBranchIndex].address[field] = value;
    setBranches(updated);
  };

  const currentBranch = branches[currentBranchIndex] || {};

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-6 space-y-6 max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-2">
        Company Branches
      </h2>

      {!showBranchForm ? (
        <div className="space-y-3">
          <label className="block text-gray-700 font-medium">
            <Building2 className="inline mr-2 text-indigo-500" size={18} />
            Number of Branches
          </label>

          <input
            type="number"
            min="0"
            placeholder="e.g. 3"
           
            onChange={(e) => {
              const val = Number(e.target.value);
              setBranchCount(val);
              setCompany({ ...company, numberOfBranches: val });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex justify-end mt-4">
            <button
              disabled={branchCount <= 0}
              onClick={handleConfirmCount}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
            >
              Add Branch Info
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-700">
                Branch {currentBranchIndex + 1} of {branchCount}{" "}
                {currentBranch.headQuarter && "(Headquarters)"}
              </h3>
              <button
                onClick={() => setShowBranchForm(false)}
                className="text-sm text-indigo-600 underline"
              >
                Change count
              </button>
            </div>

            <input
              type="text"
              placeholder="Branch Name"
              value={currentBranch.branchName}
              onChange={(e) => handleChange("branchName", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {["street", "city", "state", "country", "zipCode"].map((f) => (
                <input
                  key={f}
                  type="text"
                  placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                  value={currentBranch.address?.[f] || ""}
                  onChange={(e) => handleAddressChange(f, e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={currentBranch.headQuarter}
                onChange={(e) => {
                  const updated = branches.map((b, i) => ({
                    ...b,
                    headQuarter: i === currentBranchIndex ? e.target.checked : false,
                  }));
                  setBranches(updated);
                }}
              />
              <label className="text-gray-600 text-sm">Headquarter</label>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentBranchIndex === 0}
              onClick={() => setCurrentBranchIndex((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={() =>
                currentBranchIndex + 1 < branchCount
                  ? setCurrentBranchIndex((prev) => prev + 1)
                  : alert("All branches added ✅")
              }
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
              {currentBranchIndex + 1 < branchCount ? "Next Branch" : "Done"}
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Step4BranchesInfo;