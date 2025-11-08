import axios from "axios";

const EXAM_BASE_URL = import.meta.env.VITE_SKILLVERIFY_EXAM_SERVICE_BASE_URL;

export const initiateExam = async (examInfo, file) => {
  try {
    const formData = new FormData();

    // Append JSON data as a Blob
    formData.append(
      "data",
      new Blob([JSON.stringify(examInfo)], { type: "application/json" })
    );

    // Append file if provided
    if (file) {
      formData.append("files", file);
    }

    // Send multipart/form-data request
    const response = await axios.post(`${EXAM_BASE_URL}/initiate`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error during exam initiation:", error);
    throw error;
  }
};