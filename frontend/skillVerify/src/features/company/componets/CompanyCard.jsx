import React, { useState } from "react";
import { Building2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineMore } from "react-icons/ai";

const CompanyCard = ({ company, onView, onEdit }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // track which company's option menu is open
  const [openMenuId, setOpenMenuId] = useState(null);

  if (!company || company.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Building2 className="w-10 h-10 mb-2 text-gray-400" />
        <p>No companies found. Add your first company!</p>
      </div>
    );
  }

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id); // toggle only for that company
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full ">
      {company.map((comp) => (
        <div
          key={comp.id}
          onClick={() =>
                navigate(`/profile/company-details`, { state: { comp } })
              }
          className="p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all bg-white flex flex-col justify-between h-56 relative"
        >
          {/* Header Section */}
          <div className="flex items-center space-x-3 mb-3 justify-between ">
            <div className="flex justify-start space-x-2">
              {comp.logoUrl ? (
                <img
                  src={comp.logoUrl}
                  alt={comp.companyName}
                  className="w-14 h-14 object-contain rounded-lg border"
                />
              ) : (
                <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-lg border">
                  <Building2 className="text-gray-500 w-7 h-7" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {comp.companyName}
                </h3>
                <div className="flex flex-wrap gap-1 mt-1">
  {Array.isArray(comp.companyTypes) && comp.companyTypes.length > 0 ? (
    comp.companyTypes.map((type, index) => {
      const colors = [
        "text-blue-600 bg-blue-50",
        "text-green-600 bg-green-50",
        "text-purple-600 bg-purple-50",
        "text-pink-600 bg-pink-50",
        "text-amber-600 bg-amber-50",
      ];
      const colorClass = colors[index % colors.length];
      return (
        <span
          key={index}
          className={`px-2 py-0.5 rounded-md text-xs font-medium ${colorClass}`}
        >
          {type}
        </span>
      );
    })
  ) : (
    <span className="text-gray-500 text-sm">Alternative Technology</span>
  )}
</div>
              </div>
            </div>

            {/* More Options Button */}
            <div className="relative inline-block text-2xl border z-20 ">
              <button
                className="hover:text-slate-800"
                onClick={() => toggleMenu(comp.id)}
              >
                <AiOutlineMore className="hover:text-blue-700 cursor-pointer" />
              </button>

              {/* Floating Box */}
              {openMenuId === comp.id && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10 animate-fadeIn flex flex-col items-start">
                   <div className="flex justify-end w-full text-sm hover:text-red-800" onClick={() => toggleMenu(comp.id)}>
                     <p>X</p>
                   </div>
                  <p
                    onClick={() => onEdit?.(comp)}
                    className="text-sm text-gray-700 hover:text-amber-600 cursor-pointer"
                  >
                    Edit
                  </p>
                  <p className="text-sm text-gray-700 hover:text-red-600 cursor-pointer mt-1">
                    Delete
                  </p>
                  
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {comp.companyDescription || "No description provided."}
          </p>

          {/* Footer Buttons */}
          <div className="flex justify-between md:justify-end space-x-2 mt-4">
            <button
              onClick={() =>
                navigate(`/profile/company-details`, { state: { comp } })
              }
              className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-800"
            >
              View
            </button>
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyCard;