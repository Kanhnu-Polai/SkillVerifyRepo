import axios from "axios";

const USER_BASE_URL = "http://localhost:8083/api/users";

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


