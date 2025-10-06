import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/navbar/Navbar';
import Homepage from './pages/Homepage';
import LoginModal from './components/auth/LoginModal';
import Signup     from './components/auth/SignUp';
import ProfilePage from './components/protected/ProfilePage';
import PrivateRoute from './components/protected/PrivateRoute';
import ForgotPasswordModal from './utils/login/ForgotPassword';

import { login, setAuthChecked } from './redux/slices/authSlice';
import { fetchUserData }        from './redux/thunk/UserDataThunk';
import JobsPage from "./pages/JobsPage";
import CreateJobPage from './pages/CreateJobPage';

import { fetchJobsByPosterEmail } from './redux/thunk/jobThunk';
import Spotlight from './pages/Spotlight';
import ProfileLayout from './components/test/ProfileLayout';



const App = () => {
  const dispatch = useDispatch();

  const { isAuthChecked, user } = useSelector((state) => state.auth);      // auth slice
  const { loading: userDataLoading } = useSelector((state) => state.userData);
  const location  = useLocation()
  const isForgotPasswordOpen = useSelector(
    (state) => state.modal.isForgotPasswordModalOpen
  );

  /* ------------------------------------------------------------------
     1️⃣   Restore token & basic user object from localStorage
  ------------------------------------------------------------------ */
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
  


    if (token && storedUser) {
      dispatch(login({ token, user: JSON.parse(storedUser) }));
    } else {
      dispatch(setAuthChecked());                  // Mark auth check done (unauth)
    }
  }, [dispatch]);

  /* ------------------------------------------------------------------
     2️⃣   After auth is ready *and* we have an email, hydrate userData
  ------------------------------------------------------------------ */
  useEffect(() => {
    if (isAuthChecked && user?.email) {
      dispatch(fetchUserData(user.email));
      dispatch(fetchJobsByPosterEmail(user.email))
    }
  }, [dispatch, isAuthChecked, user?.email]);

  /* ------------------------------------------------------------------
     3️⃣   Show splash screen until both auth & userData finished
  ------------------------------------------------------------------ */
  if (!isAuthChecked || userDataLoading) {
    return (
      <div className="text-center mt-20 text-lg">
        {userDataLoading ? 'Loading profile…' : 'Checking authentication…'}
      </div>
    );
  }

  /* ------------------------------------------------------------------
     4️⃣   Main app routes
  ------------------------------------------------------------------ */
  return (
    <>
      <Toaster position="top-center" />
      {location.pathname !== "/exam" && <Navbar />}

      {isForgotPasswordOpen && <ForgotPasswordModal />}

      <Routes>
        <Route path="/"        element={<Homepage />} />
        <Route path='/jobs' element = {<JobsPage></JobsPage>}/>
        <Route path="/login"   element={<LoginModal />} />
        <Route path='/spotlight' element={<Spotlight></Spotlight>}></Route>
        <Route path="/signup"  element={<Signup />} />
       

        
    

        {/* ✅ Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile/*" element={<ProfilePage />} />
          {/* <Route  path="/profile/*" element = {<ProfileLayout></ProfileLayout>} ></Route> */}
          <Route path='/create_job' element={<CreateJobPage></CreateJobPage>}></Route>
         

        </Route>
      </Routes>
    </>
  );
};

export default App;