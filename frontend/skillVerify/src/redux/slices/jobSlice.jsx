import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  loading: false,
  error: null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    fetchJobsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchJobsSuccess: (state, action) => {
      state.jobs = action.payload;
      state.loading = false;
    },
    fetchJobsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // 🧹 clear jobs on logout or reset
    clearJobs: (state) => {
      state.jobs = [];
      state.loading = false;
      state.error = null;
    },

    
    
  },
});

export const {
  fetchJobsStart,
  fetchJobsSuccess,
  fetchJobsFailure,
  clearJobs,
  updateJob,
} = jobSlice.actions;

export default jobSlice.reducer;