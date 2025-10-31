import React from "react";

const CompanyType = ({ mnc, productBased, startup, onChange }) => {
  const handleSelect = (type) => {
    onChange(type, !type);
  };

  const renderCheckbox = (label, checked, color, typeKey) => (
    <label
      key={label}
      className="flex items-center gap-2 cursor-pointer select-none group"
      onClick={() => onChange(typeKey, !checked)}
    >
      <div
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
          checked
            ? `border-${color}-500 bg-${color}-100`
            : "border-gray-400 bg-white group-hover:border-indigo-400"
        }`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-3.5 h-3.5 text-${color}-600`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span
        className={`transition-colors duration-200 ${
          checked ? `text-${color}-600` : "group-hover:text-indigo-600"
        }`}
      >
        {label}
      </span>
    </label>
  );

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 text-sm font-medium text-gray-700">
      {renderCheckbox("Startup", startup, "indigo", "startup")}
      {renderCheckbox("MNC", mnc, "blue", "mnc")}
      {renderCheckbox("Product Based", productBased, "green", "productBased")}
    </div>
  );
};

export default CompanyType;