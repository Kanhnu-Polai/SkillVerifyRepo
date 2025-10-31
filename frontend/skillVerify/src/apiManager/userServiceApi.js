import axios from "axios";

const USER_BASE_URL = import.meta.env.VITE_SKILLVERIFY_USER_SERVICE_BASE_URL;

export async function updateSocialMediaLinks(updateData) {
  try {
    const res = await axios.put(`${USER_BASE_URL}/social-links/update`,updateData,
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error updating social media links:", error);
    throw error;
  }
}

export async function uploadPhoto(file, email) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    const res = await axios.post(`${USER_BASE_URL}/upload/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 20000,
    });

    return res.data;
  } catch (error) {
    console.error("❌ Error uploading photo:", error);
    throw error;
  }
}

export async function updateEducation(updateData,userId) {
  try {
    const res = await axios.put(`${USER_BASE_URL}/update/education/${userId}`,updateData,
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating  education:", error);
    throw error;
  }
}

export async function updateExperience(updateData,userId) {
  try {
    const res = await axios.put(`${USER_BASE_URL}/update/experience/${userId}`,updateData,
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating  education:", error);
    throw error;
  }
}

export async function uploadResume({ file, email, onUploadProgress }) {
  console.log("file:", file,email)

  try {
    if (!file || !email) {
      throw new Error("File and email are required for resume upload");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    console.log("📤 Sending upload request to:", `${USER_BASE_URL}/upload/resume`);
    console.log("📧 Email:", email);
    console.log("📂 File name:", file.name);

    const res = await axios.post(`${USER_BASE_URL}/upload/resume`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000,
      onUploadProgress: (progressEvent) => {
        if (onUploadProgress && progressEvent.total) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onUploadProgress(percent);
        }
      },
    });

    console.log("✅ Resume uploaded successfully:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error uploading resume:", error.response?.data || error.message);
    throw error;
  }
}

