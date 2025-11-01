// src/components/account/JobPosterNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const linkBase =
  'whitespace-nowrap px-4 py-2 rounded-md transition-colors duration-150';
const active   = 'bg-blue-100 text-blue-700 font-semibold';
const inactive =
  'text-gray-700 hover:bg-gray-100 hover:text-gray-900';

const JobPosterNav = () => {
  const { userData } = useSelector((state) => state.userData);
  console.log('JobPosterNav userData ⇒', userData);

  return (
    <>
      {/* ───────────────────────── Sticky sub-nav  ───────────────────────── */}
      <nav className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="flex text-[13px] md:text-base overflow-x-auto scrollbar-hide px-4 py-2 space-x-2 w-screen">
          <NavLink
            to="/profile/bio"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Profile
          </NavLink>
          <NavLink
            to="/profile/my-listed-jobs"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Listed Jobs
          </NavLink>

          <NavLink
            to="/profile/job-applications"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Applications
          </NavLink>

          <NavLink
            to="/profile/short-listed"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Short-Listed
          </NavLink>

          <NavLink
            to="/profile/received-resumes"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Received Resumes
          </NavLink>
           <NavLink
            to="/profile/company"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Companies
          </NavLink>

          <NavLink
            to="/profile/poster-settings"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Settings
          </NavLink>
         
        </div>
      </nav>

      {/* subtle divider when content starts scrolling under sticky nav */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </>
  );
};

export default JobPosterNav;