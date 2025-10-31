import axios from "axios";

const POST_BASE_URL = "http://localhost:9090/api/v1/posts";
const LIKE_BASE_URL = "http://localhost:8091/api/v1/likes";
const USER_BASE_URL = "http://localhost:8083/api/users";
const COMMENT_BASE_URL = "http://localhost:8092/api/v1/comments"

export async function createPost(postData, imageFile) {
  const formData = new FormData();
  formData.append(
    "post",
    new Blob([JSON.stringify(postData)], { type: "application/json" })
  );

  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    const res = await axios.post(`${POST_BASE_URL}/create-post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}


export async function getTrendingPost() {
    try {
        const res = await axios.get(`${POST_BASE_URL}/trending`)
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.log("Error during fecting trending posts");
        throw error
        
    }


}

export async function updateLike(userId, postId, isLiked) {
  try {
    const res = await axios.post(`${LIKE_BASE_URL}/update-like`, {
      userId: userId,
      postId: postId,
      isLiked: isLiked
    });
    console.log("✅ Like updated:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error updating like:", error.response?.data || error.message);
    throw error;
  }
}


export async function getUserProfile(userId) {

  try {
    const res = await axios.get(`${USER_BASE_URL}/${userId}`)
    console.log("User Data from :",res.data)
    return res.data
    
  } catch (error) {
     console.error("❌ Error during fecting user data:", error.response?.data || error.message);
    throw error;
    
  }


  
}

export async function addComment(userId, text, postId,userName,photoUrl) {
  try {
    const res = await axios.post(`${COMMENT_BASE_URL}/add`, null, { // no body
      params: {
        userId: userId,
        text: text,
        postId: postId,
        userName:userName,
        photoUrl:photoUrl
      },
    });

    console.log("Added comment");
    return res.data;
  } catch (error) {
    console.error("❌ Error during adding Comment data:", error.response?.data || error.message);
    throw error;
  }
}

export async function addReply(commentId,text,userId,userName,photoUrl) {
  try {
    const res = await axios.post(`${COMMENT_BASE_URL}/reply`,null,{
      params:{
        commentId:commentId,
        userId:userId,
        text:text,
        userName:userName,
        photoUrl:photoUrl
      }

    })

    console.log(res.data)
    return res.data
    
  } catch (error) {
    console.error("❌ Error during adding replying", error.response?.data || error.message)
    throw error
    
  }
  
}

export async function getAllCommentsById(postId) {
  console.log("Postiiii", postId);

  try {
    const res = await axios.get(`${COMMENT_BASE_URL}/by-post`, {
      params: {
        postId: postId
      }
    });

    console.log("✅ Successfully fetched all comments:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ Error in fetching comments:", error.response?.data || error.message);
    throw error;
  }
}

export async function getAllPostIdsLikedByUser(userId){

  try {
    const res = await axios.get(`${LIKE_BASE_URL}/get-post-id`,{
      params:{
        userId:userId
      }
    })

    console.log(res.data)
    return res.data;
    
  } catch (error) {

    console.log("❌ Error in fetching post ids...", error.response?.data || error.message)
    throw error
    
  }

}
  

