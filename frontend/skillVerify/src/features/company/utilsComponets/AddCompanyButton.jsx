import React from "react";
import { FaPlusCircle } from "react-icons/fa";

const AddCompanyButton = ({click}) => {
  return (
    <div>
      <button onClick={()=>click(true)}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md 
                   hover:bg-indigo-700 hover:shadow-lg hover:scale-105 
                   transition-all duration-300 ease-in-out"
      >
        <FaPlusCircle className="text-lg" />
        <span>Add Company</span>
      </button>
    </div>
  );
};

export default AddCompanyButton;