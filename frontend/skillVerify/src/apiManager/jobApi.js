import axios from "axios";
const JOB_BASE_URL = import.meta.env.VITE_SKILLVERIFY_JOB_SERVICE_BASE_URL;
export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${JOB_BASE_URL}/getAllJobs`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    throw error;
  }
};