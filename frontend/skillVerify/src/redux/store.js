import { configureStore } from '@reduxjs/toolkit';


import modalReducer     from './slices/modalSlice';
import authReducer      from './slices/authSlice';
import userDataReducer  from './slices/userDataSlice'; // spelling OK
import jobReducer       from './slices/jobSlice';

export const store = configureStore({
  reducer: {
    modal:    modalReducer,
    auth:     authReducer,
    userData: userDataReducer,
    jobs:     jobReducer,
  },

});

export default store;