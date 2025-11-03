import axios from "axios";
const COMPANY_BASE_URL = import.meta.env.VITE_SKILLVERIFY_COMPANY_SERVICEBASE_URL;
export const addCompany = async (companyInfo) => {
  try {
    const response = await axios.post(`${COMPANY_BASE_URL}/create`,companyInfo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error during adding company:", error);
    throw error;
  }
};