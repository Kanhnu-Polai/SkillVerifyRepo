import axios from "axios";

export const uploadPhoto = async (file,email) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("email",email)

  try {
    const response = await axios.post(
      "http://localhost:8083/api/users/upload/photo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; // assuming server returns uploaded image data or URL
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
