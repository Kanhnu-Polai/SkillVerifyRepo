import axios from "axios";

const POST_SERVICE_BASE_URL = "http://localhost:9090/api/v1/posts"

export async function getAllPostsOfUser(userId) {

    try {
        const res = await axios.get(`${POST_SERVICE_BASE_URL}/user-posts?userId=${userId}`);
        return res.data;
    } catch (error) {
        console.error("Errorr while getting user details : ",error);
        throw error;
    }
    
}