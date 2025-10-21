import React from "react";

const FormattedDate = ({ dateString }) => {
  if (!dateString) return null; // safeguard for missing data

  // Convert the string to a Date object
  const date = new Date(dateString);

  // Format date to YYYY-MM-DD
  const formattedDate = date.toISOString().split("T")[0];

  return (
    <span className="text-gray-500 text-xs md:text-sm">
      {formattedDate}
    </span>
  );
};

export default FormattedDate;