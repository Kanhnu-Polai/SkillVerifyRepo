import axios from "axios";

const AUTH_BASE_URL = "http://localhost:8080/api/auth";
const USER_BASE_URL = "http://localhost:8083/api/users/update";


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