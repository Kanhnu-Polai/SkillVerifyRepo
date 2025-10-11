import React, { useEffect, useState } from "react";
import Readmore from "./Readmore";
import {
  getTrendingPost,
  updateLike,
  getUserProfile,
  getAllPostIdsLikedByUser,
} from "./SpotlightApi";

import { updateProfileView } from "../../apiManager/profileInfoApi";
import UserProfileModal from "./UserProfileModal";
import ChatBox from "./ChatBox";

import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userId") || "";
  const { userData } = useSelector((state) => state.userData);
  console.log("skhsdhjkshjk",userData)

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [openChatPostId, setOpenChatPostId] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likedId, setLikedId] = useState([]);

  // ✅ Fetch posts and liked post IDs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both posts and liked post IDs in parallel
        const [postsRes, likedIdsRes] = await Promise.all([
          getTrendingPost(),
          getAllPostIdsLikedByUser(userId),
        ]);

        // Convert likedIdsRes to a Set for quick lookup
        const likedSet = new Set(likedIdsRes);

        // Merge "isLiked" info into each post
        const mergedPosts = postsRes.map((post) => ({
          ...post,
          isLiked: likedSet.has(post.postId),
        }));

        setPosts(mergedPosts);
        setLikedId(likedIdsRes);
      } catch (error) {
        console.error("Error fetching posts or liked post IDs:", error);
      }
    };

    fetchData();
  }, [userId]);

  // ✅ Handle user profile modal
  const handleUserClick = async (id) => {

    const profileViewData = {
  viewerUserId: userId,
  viewerName: userData.fullName,
  viewerPhotoUrl: userData.photoUrl
}
    try {
      const userInfo = await getUserProfile(id);
      const profileViewInfo = await updateProfileView(id,profileViewData)
      setSelectedProfile(userInfo);
      setShowProfileModal(true);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  // ✅ Increment comment count after adding comment
  const handleCommentAdded = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId
          ? { ...post, commentCount: post.commentCount + 1 }
          : post
      )
    );
  };

  // ✅ Like/unlike post
  const handleLike = async (postId) => {
    try {
      setPosts((prev) =>
        prev.map((p) =>
          p.postId === postId
            ? {
                ...p,
                isLiked: !p.isLiked,
                likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1,
              }
            : p
        )
      );

      await updateLike(userId, postId, true);
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  // ✅ Toggle chat box visibility for a post
  const handleChatOpen = (postId) => {
    setOpenChatPostId(openChatPostId === postId ? null : postId);
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4">
      {posts.map((post) => (
        <div
          key={post.postId}
          className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden my-4 border-4 dark:border-gray-700 transition-colors"
        >
          {/* --- Header --- */}
          <div className="px-4 sm:px-6 py-4 border-b dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              {/* User Info */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleUserClick(post.userId)}
              >
                <img
                  src={post.userPhotoUrl}
                  alt={post.userName}
                  className="w-10 h-10 rounded-full border dark:border-gray-600"
                />
                <div>
                  <p className="text-sm font-light text-gray-900 dark:text-gray-100">
                    {post.userName}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {new Date(post.createdAt).toDateString()} · {post.category}
                  </p>
                </div>
              </div>

              {/* Follow Button */}
              <div className="flex flex-col justify-center items-center gap-1">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`relative px-3 py-1.5 text-xs md:text-sm font-semibold min-w-30 rounded-full border transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
                    isFollowing
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500"
                      : "text-amber-500 border-amber-400 hover:bg-gradient-to-r from-amber-400 to-yellow-500 hover:text-white"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">
              {post.title}
            </h2>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {post.hashTags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* --- Body --- */}
          <div className="flex flex-col md:flex-row p-4 sm:p-6 gap-4">
            {post.imageUrl && (
              <div className="md:w-1/3 flex justify-center">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-fit rounded-md object-cover shadow-md"
                />
              </div>
            )}
            <div className="md:w-2/3">
              <Readmore
                text={post.description}
                limit={200}
                className="text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          {/* --- Footer --- */}
          <div className="px-4 sm:px-6 py-3 border-t dark:border-gray-700 text-[14px] md:text-[16px] flex justify-between items-center">
            {/* Left: Like / Comment */}
            <div className="flex gap-4">
              {/* Like */}
              <button
                className={`flex items-center gap-1 transition ${
                  post.isLiked
                    ? "text-red-500"
                    : "text-gray-600 dark:text-gray-300 hover:text-red-500"
                }`}
                onClick={() => handleLike(post.postId)}
              >
                <FavoriteBorderIcon className="w-4 h-4 md:w-8 md:h-8" />
                {post.likeCount}
              </button>

              {/* Comment */}
              <button
                className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
                onClick={() => handleChatOpen(post.postId)}
              >
                <CommentIcon className="w-4 h-4 md:w-8 md:h-8" />
                {post.commentCount}
              </button>
            </div>

            {/* Right: Save / Share */}
            <div className="flex gap-4">
              <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-green-500 transition">
                <BookmarkIcon className="w-4 h-4 md:w-8 md:h-8" /> Save
              </button>
              <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-purple-500 transition">
                <ShareIcon className="w-4 h-4 md:w-8 md:h-8" /> Share
              </button>
            </div>
          </div>

          {/* Chat Box */}
          <div className="w-full">
            {openChatPostId === post.postId && (
              <div className="mt-2 rounded-md flex p-2">
                <ChatBox
                  postId={post.postId}
                  onCommentAdded={() => handleCommentAdded(post.postId)}
                />
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Profile Modal */}
      {showProfileModal && selectedProfile && (
        <UserProfileModal
          user={selectedProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
};

export default Post;
