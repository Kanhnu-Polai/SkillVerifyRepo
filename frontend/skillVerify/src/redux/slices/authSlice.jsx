import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isAuthChecked: false, // ✅ Add this to track auth check status
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthChecked = true; // ✅ Mark as checked
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.isAuthChecked = true; // ✅ Still mark as checked even on logout
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true; // ✅ Needed if no user but check done
    },
  },
});

export const { login, logout, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;