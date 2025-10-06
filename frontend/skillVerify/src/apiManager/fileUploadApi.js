// src/apiManager/fileUploadApi.js
import axios from "axios";

const fileUpload = axios.create({
  baseURL: "http://localhost:8083/api/users/upload", // removed /upload
  timeout: 20000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

fileUpload.interceptors.response.use(
  res => res,
  err => {
    const message =
      err?.response?.data?.message || err.message || "Network or Server Error";
    return Promise.reject(new Error(message));
  }
);

export async function uploadPhoto(file, email) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("email", email);

  const res = await fileUpload.post("/photo", formData); // matches backend
  return res.data;
}

export { fileUpload };