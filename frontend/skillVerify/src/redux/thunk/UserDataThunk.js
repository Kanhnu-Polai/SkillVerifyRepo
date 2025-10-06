// src/redux/thunk/userDataThunk.js
import axios from 'axios';
import {
  fetchUserDataStart,
  fetchUserDataSuccess,
  fetchUserDataFailure,
} from '../slices/userDataSlice'; // ✅ use ../ not ./

export const fetchUserData = (email) => async (dispatch) => {
  dispatch(fetchUserDataStart());
  console.log(email)
  try {
    const response = await axios.get(
      `http://localhost:8083/api/users/email/${email}`
    );
    console.log(response.data)

    localStorage.setItem("userEmail", response.data.email);
    localStorage.setItem("userId",response.data.id)
    localStorage.setItem("userName",response.data.fullName)
    localStorage.setItem("photoUrl",response.data.photoUrl)
    localStorage.setItem('role',response.data.role)
    console.log(localStorage.getItem("userInfo"))
    dispatch(fetchUserDataSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserDataFailure(error.response?.data?.message || error.message));
  }
};