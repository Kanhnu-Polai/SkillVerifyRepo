import React from "react";
import Select from "react-select";

const options = [
  { value: "DRAFT", label: "Draft" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];

export default function StatusPicker({ value, onChange }) {
  const handleChange = (selectedOption) => {
    onChange(selectedOption ? selectedOption.value : null);
  };

  // Set the value in the format react-select expects
  const selectedOption = options.find((opt) => opt.value === value) || null;

  return (
    <div className="rounded-md p-1">
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select status..."
        isClearable
        closeMenuOnSelect={true}
      />
    </div>
  );
}
