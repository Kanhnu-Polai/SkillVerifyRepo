import axios from "axios";

const PROFILE_BASE_URL = import.meta.env.VITE_SKILLVERIFY_PROFILE_INFO_BASE_URL;

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