import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/navbar/Navbar';
import Homepage from './pages/Homepage';
import LoginModal from './features/auth/login/LoginModal';
import Signup from './features/auth/signup/SignUp';
import ProfilePage from './components/protected/ProfilePage';
import PrivateRoute from './components/protected/PrivateRoute';
import ForgotPasswordModal from './features/auth/componets/ForgotPassword';

import { login, setAuthChecked } from './redux/slices/authSlice';
import { fetchUserData }        from './redux/thunk/UserDataThunk';
import JobsPage from "./pages/JobsPage";
import CreateJobPage from './features/job/pages/CreateJobPage';

import { fetchJobsByPosterEmail } from './redux/thunk/jobThunk';
import Spotlight from './pages/Spotlight';
import SplashScreen from './components/SplashScreen';
import GovtJobs from './pages/GovtJobs';
import GovtJobDetails from './features/govt/GovtJobDetails';
import JobInfoPage from './pages/JobInfoPage';
import ExamPage from './examSystem/pages/ExamPage';

const App = () => {
  const dispatch = useDispatch();

  const { isAuthChecked, user } = useSelector((state) => state.auth);
  const { loading: userDataLoading } = useSelector((state) => state.userData);
  const location = useLocation();
  const isForgotPasswordOpen = useSelector(
    (state) => state.modal.isForgotPasswordModalOpen
  );

  /* ---------------------------------------------------------
     1️⃣ Restore token & user from localStorage
  ---------------------------------------------------------- */
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      dispatch(login({ token, user: JSON.parse(storedUser) }));
    } else {
      dispatch(setAuthChecked());
    }
  }, [dispatch]);

  /* ---------------------------------------------------------
     2️⃣ Fetch user profile & jobs after auth ready
  ---------------------------------------------------------- */
  useEffect(() => {
    if (isAuthChecked && user?.email) {
      dispatch(fetchUserData(user.email));
      dispatch(fetchJobsByPosterEmail(user.email));
    }
  }, [dispatch, isAuthChecked, user?.email]);

  /* ---------------------------------------------------------
     3️⃣ Show SplashScreen ONLY while loading
  ---------------------------------------------------------- */
  if (!isAuthChecked || userDataLoading) {
    return <SplashScreen />;
  }

  /* ---------------------------------------------------------
     4️⃣ Actual App UI
  ---------------------------------------------------------- */
  return (
    <>
      <Toaster position="top-center" />

      {/* Navbar should NOT hide during /exam */}
      {location.pathname !== "/exam" && <Navbar />}

      {isForgotPasswordOpen && <ForgotPasswordModal />}

      <Routes>
        <Route path="/"        element={<Homepage />} />
        <Route path="/jobs"     element={<JobsPage />} />
        <Route path="/govt-jobs" element={<GovtJobs/>} />
        <Route path="/login"    element={<LoginModal />} />
        <Route path="/spotlight" element={<Spotlight />} />
        <Route path="/signup"   element={<Signup />} />
        <Route path="/govt-job-details" element={<GovtJobDetails />} />
        <Route path="/job-info" element={<JobInfoPage />} />

        {/* exam route visible only if role exists */}
        {localStorage.getItem("role") && (
          <Route path="/exam" element={<ExamPage />} />
        )}

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile/*" element={<ProfilePage />} />
          <Route path="/create_job" element={<CreateJobPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;