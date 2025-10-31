import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const JobSeekerNav = () => {

  const {userData} = useSelector((state)=>state.userData)

  return (
    <>
     <nav className="sticky top-0 z-10 bg-white shadow-sm w-full">
      <div className="flex text-[13px] md:text-base overflow-x-auto scrollbar-hide px-4 py-2 space-x-2 w-screen">


         <NavLink
          to="/profile/bio"
          className={({ isActive }) =>
            isActive
              ? ' bg-blue-100 text-blue-700 px-3 py-1  rounded-md font-semibold  '
              : 'text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100 '
          }
        >
         Profile
        </NavLink>
       

        <NavLink
          to="/profile/applied-job"
          className={({ isActive }) =>
            isActive
              ? ' bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-semibold'
              : 'text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100'
          }
        >
          Applied
        </NavLink>

         <NavLink
          to="/profile/shorlisted"
          className={({ isActive }) =>
            isActive
              ? ' bg-blue-100 text-blue-700 px-3 py-1  rounded-md font-semibold  '
              : 'text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100 '
          }
        >
        ShortListed
        </NavLink>

        <NavLink
          to="/profile/saved-jobs"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-semibold'
              : 'text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100'
          }
        >
          Saved
        </NavLink>

        <NavLink
          to="/profile/resume-manager"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-semibold'
              : 'text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100'
          }
        >
          CV
        </NavLink>

        {/* <NavLink
          to="/profile/settings"
          className={({ isActive }) =>
            isActive
              ? 'bg-blue-100 text-blue-700 px-3 py-1 rounded-md font-semibold'
              : 'text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100'
          }
        >
          Settings
        </NavLink> */}
      </div>

     </nav>
    </>
  );
};

export default JobSeekerNav;