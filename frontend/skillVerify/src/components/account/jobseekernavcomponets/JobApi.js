import axios from "axios";

export const fetchAppliedJobs = async (email) => {
  try {
    const response = await axios.get(
      `http://localhost:8088/api/applications/by-user/${email}`
    );
    // Return only the array of jobs
    return response.data.body;
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    throw error;
  }
};


