import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const T2 = () => {
  const { userData } = useSelector((state) => state.userData);

  const links = [
    { to: "/profile/bio", label: "Profile" },
    { to: "/profile/applied-job", label: "Applied" },
    { to: "/profile/shorlisted", label: "ShortListed" },
    { to: "/profile/saved-jobs", label: "Saved" },
    { to: "/profile/resume-manager", label: "CV" },
  ];

  return (
    <nav className="flex flex-col gap-1 p-4">
      <div className="text-center mb-3 font-semibold text-blue-700">
        👋 {userData?.fullName || "User"}
      </div>

      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            isActive
              ? "bg-blue-100 text-blue-700 font-semibold px-3 py-2 rounded-md"
              : "text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100"
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default T2;
