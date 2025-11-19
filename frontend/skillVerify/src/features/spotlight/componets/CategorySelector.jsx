import React from "react";
import Select from "react-select";

const options = [
  { value: "Technology", label: "Technology" },
  { value: "Science", label: "Science" },
  { value: "Education", label: "Education" },
  { value: "Health", label: "Health" },
  { value: "Travel", label: "Travel" },
  { value: "Food", label: "Food" },
  { value: "Finance", label: "Finance" },
  { value: "Sports", label: "Sports" },
  { value: "Music", label: "Music" },
  { value: "Movies", label: "Movies" },
  { value: "Art", label: "Art" },
  { value: "Politics", label: "Politics" },
  { value: "Environment", label: "Environment" },
  { value: "Fashion", label: "Fashion" },
  { value: "Gaming", label: "Gaming" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Books", label: "Books" },
  { value: "History", label: "History" },
  { value: "Culture", label: "Culture" },
  { value: "Business", label: "Business" },
  { value: "Programming", label: "Programming" },
  { value: "AI & ML", label: "AI & ML" },
  { value: "Startups", label: "Startups" },
  { value: "Cryptocurrency", label: "Cryptocurrency" },
  { value: "Photography", label: "Photography" },
  { value: "DIY", label: "DIY" },
  { value: "Fitness", label: "Fitness" },
  { value: "Parenting", label: "Parenting" },
  { value: "Motivation", label: "Motivation" },
  { value: "Productivity", label: "Productivity" },
  { value: "Self-Help", label: "Self-Help" },
  { value: "Relationships", label: "Relationships" },
  { value: "Marketing", label: "Marketing" },
  { value: "Economy", label: "Economy" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Pets", label: "Pets" },
  { value: "Design", label: "Design" },
  { value: "Comics", label: "Comics" },
  { value: "Nature", label: "Nature" },
  { value: "Adventure", label: "Adventure" },
  { value: "Spirituality", label: "Spirituality" },
  { value: "Automobile", label: "Automobile" },
  { value: "Tech Gadgets", label: "Tech Gadgets" },
  { value: "Networking", label: "Networking" },
  { value: "Software", label: "Software" },
  { value: "Hardware", label: "Hardware" },
  { value: "EdTech", label: "EdTech" },
  { value: "Online Learning", label: "Online Learning" },
  { value: "Blockchain", label: "Blockchain" },
  { value: "Space Exploration", label: "Space Exploration" },
  { value: "Robotics", label: "Robotics" },
  { value: "Psychology", label: "Psychology" }
];

export const CategorySelector = ({ value = [], onChange }) => {

  // Convert value array → react-select expects array of objects
  const selectedOptions = options.filter(opt => value.includes(opt.value));

  const handleChange = (selected) => {
    // selected is array of objects → extract "value" only
    const values = selected ? selected.map((opt) => opt.value) : [];
    onChange(values);
  };

  return (
    <div className="rounded-md p-1">
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder="Select categories..."
        className="basic-multi-select"
        classNamePrefix="select"
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
      />
    </div>
  );
};