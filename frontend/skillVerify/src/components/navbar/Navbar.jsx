import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import SearchBar from "../../utils/search/SearchBar";
import AccountMenu from "../profile/AccountMenu";
import Admin from "../profile/Admin";
import JobPosterMenu from "../profile/JobPosterMenu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FaShieldAlt, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import T1 from "../test/T1";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const role = useSelector((state) => state.auth.user?.role);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  
  const navLinkClass = ({ isActive }) =>
    `${
      isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
    } font-medium`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-30">
      <div className="w-full ">
        <div className="flex justify-between mx-2 text-[15px] md:mx-4  items-center h-18 py-2">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-blue-950 w-7 h-7 md:w-12 md:h-12" />
            <div>
              <NavLink to="/" className="flex items-center gap-1">
                <span className="text-lg md:text-2xl antialiased font-extrabold tracking-wider text-blue-600 hover:text-purple-600">
                  SkillVerify
                </span>
                <sup className="text-[6px] md:text-[10px] text-orange-500 font-semibold animate-pulse">
                  Beta
                </sup>
              </NavLink>
              <p className="text-[8px] md:text-xs text-gray-500 tracking-wider">
                Verified Skills. Trusted Hiring.
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-6">
            <SearchBar />
             <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/jobs" className={navLinkClass}>
              Jobs
            </NavLink>
            <NavLink to="/spotlight" className={navLinkClass}>
  Spotlight
  <span className="text-[8px] text-pink-600 font-semibold align-super ml-1">
    Community
  </span>
</NavLink>
            {isAuthenticated && (
              <NotificationsIcon className="text-gray-700 hover:text-blue-600 cursor-pointer" />
            )}
            {isAuthenticated && role === "[JOB_POSTER]" && (
              <NavLink
                to="/create_job"
                className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-200"
              >
                <AddCircleOutlineIcon fontSize="small" />
                Post
              </NavLink>
            )}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {/* {role === "ADMIN" && <Admin handleLogout={handleLogout} />}*/}
                {role === "[JOB_POSTER]" && <JobPosterMenu handleLogout={handleLogout} />}
                {role === "[JOB_SEEKER]" && (
                  <AccountMenu handleLogout={handleLogout} />
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-green-600 min-w-20 text-white py-2 px-4 rounded-md hover:bg-green-700 text-sm"
                >
                  SignUp
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="md:hidden flex items-center gap-3">
            {/* Search Icon */}
            {
              isAuthenticated && role ==="[JOB_SEEKER]" &&
            <NavLink
              to="/jobs"
              className={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Jobs
            </NavLink>}

            {
              isAuthenticated && role ==="[JOB_POSTER]" &&
            <NavLink
              to="/create_job"
              
              className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-md text-xs font-semibold hover:bg-blue-700"
               
              onClick={() => setMobileMenuOpen(false)}
            >
             <AddCircleOutlineIcon fontSize="small" />
                Post
            </NavLink>}
            <button
              onClick={() => {
                setMobileSearchOpen(!mobileSearchOpen);
                setMobileMenuOpen(false);
              }}
              className="text-gray-700 focus:outline-none"
            >
              <FaSearch size={18} />
            </button>

            {/* Hamburger / Profile */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setMobileSearchOpen(false);
              }}
              className="text-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {mobileSearchOpen && (
          <div className="md:hidden mt-2 p-2 bg-white rounded-md shadow-md">
            <SearchBar />
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && !mobileSearchOpen && (
          <div className="md:hidden mt-2  text-sm flex flex-col gap-2 bg-white p-4 rounded-md shadow-md">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >Home</NavLink>
            <NavLink
              to="/jobs"
              className={navLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Jobs
            </NavLink>
            <NavLink to="/spotlight" className={navLinkClass}>
  Spotlight
  <span className="text-[8px] text-pink-500 font-semibold align-super ml-1">
    Community
  </span>
</NavLink>

            

            
            {isAuthenticated  && (
              // <AccountMenu handleLogout={handleLogout} mobile />
              <div className="flex justify-between text-sm items-center">
                <NavLink
                  to="/profile/bio"
                  className={navLinkClass}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-800"
                >
                  <FaSignOutAlt className="w-5 h-5" />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            )}

            {!isAuthenticated && (
              <>
                <NavLink
                  to="/login"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-center text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
