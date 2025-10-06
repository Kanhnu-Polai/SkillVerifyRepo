import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isForgotPasswordModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openForgotPasswordModal: (state) => {
      state.isForgotPasswordModalOpen = true;
    },
    closeForgotPasswordModal: (state) => {
      state.isForgotPasswordModalOpen = false;
    },
  },
});

export const { openForgotPasswordModal, closeForgotPasswordModal } = modalSlice.actions;
export default modalSlice.reducer;