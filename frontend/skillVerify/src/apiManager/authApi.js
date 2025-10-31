import axios from "axios";

const AUTH_BASE_URL = import.meta.env.VITE_SKILLVERIFY_AUTH_SERVICE_URL;
const USER_BASE_URL = import.meta.env.VITE_SKILLVERIFY_USER_SERVICE_BASE_URL+"/update";


export async function confirmPassword(confirmData) {
    console.log("reveiced :" ,confirmData)
  

  try {
    const res = await axios.post(`${AUTH_BASE_URL}/validate-password`,confirmData);
    console.log(res.data)
    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}


export async function updateContactInfo(updateData) {
    try {
        const res = await axios.put(`${USER_BASE_URL}/phone-or-email`,updateData);
        console.log(res.data)
        return res.data;
        
    } catch (error) {
        console.log("Error while updating info ... ",error)
        throw error;
        
    }
    
}