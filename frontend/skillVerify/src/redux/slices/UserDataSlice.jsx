import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  loading: false,
  error: null,
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    fetchUserDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserDataSuccess: (state, action) => {
      state.userData = action.payload;
      state.loading = false;
    },
    fetchUserDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
    },
    updateUserData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
  },
});

export const {
  fetchUserDataStart,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  clearUserData,
  updateUserData,
} = userDataSlice.actions;

export default userDataSlice.reducer;