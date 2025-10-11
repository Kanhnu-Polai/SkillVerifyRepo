import axios from "axios";

const PROFILE_BASE_URL = "http://localhost:9093/api/v1/profile-info";

export async function updateProfileView(profileId,viewerData) {
  try {
    const res = await axios.post(`${PROFILE_BASE_URL}/add-profile-view?userId=${profileId}`,viewerData,
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error("Error updating  Profileviews:", error);
    throw error;
  }
}