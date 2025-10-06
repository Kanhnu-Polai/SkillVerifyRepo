import React, { useEffect, useState } from "react";
import { LuMessageCircleMore } from "react-icons/lu";
import { FaThumbsUp, FaThumbsDown, FaReply } from "react-icons/fa";
import PersonIcon from "@mui/icons-material/Person";
import { addComment, getAllCommentsById, getUserProfile } from "./SpotlightApi";
import Reply from "./componets/Reply";
import Loader from "./componets/Loader";
import UserProfileModal from "./UserProfileModal";

// ✅ Utility: Get only root comments (filter out replies)
const getRootComments = (comments) => {
  const replyIds = new Set();
  comments.forEach((c) => {
    c.replies?.forEach((r) => replyIds.add(r.id));
  });
  return comments.filter((c) => !replyIds.has(c.id));
};

// ✅ Recursive comment item (supports nested replies)
const CommentItem = ({ comment, setMessage }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [likes, setLikes] = useState(comment.likesCount);
  const [dislikes, setDislikes] = useState(comment.dislikesCount);
  const [showInput, setShowInput] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleUserClick = async (id) => {
    try {
      const userInfo = await getUserProfile(id);
      setSelectedProfile(userInfo);
      setShowProfileModal(true);
    } catch (err) {
      console.error("❌ Error fetching user profile:", err);
    }
  };

  const safeHandleUserClick = (id, userName) => {
    if (!id || !userName) {
      console.log("⚠️ No user data available for this comment");
      return;
    }
    handleUserClick(id);
  };

  return (
    <div className="flex flex-col w-full mt-2">
      <div className="flex flex-col items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-600 rounded-lg shadow-sm">
        {/* --- User Info --- */}
        <div
          className={`min-w-fit px-0.5 flex gap-2 items-center justify-start ${
            comment.userId ? "cursor-pointer" : "cursor-not-allowed opacity-70"
          }`}
          onClick={() => safeHandleUserClick(comment.userId, comment.userName)}
        >
          {/* Avatar */}
          {comment.photoUrl ? (
            <div className="w-8 h-8 rounded-full border overflow-hidden flex items-center justify-center">
              <img
                src={comment.photoUrl || "/default-avatar.png"}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full border border-gray-300 flex justify-center items-center flex-shrink-0">
              <PersonIcon className="w-4 h-4 text-amber-400" />
            </div>
          )}

          {/* Name */}
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {comment.userName || "Anonymous User"}
          </div>
        </div>

        {/* --- Comment Content --- */}
        <div className="flex-1">
          <div className="text-gray-700 dark:text-gray-300 mt-1 md:text-base text-sm">
            {comment.content}
          </div>

          {/* Actions: Like, Dislike, Reply */}
          <div className="flex flex-wrap items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <button
              onClick={() => setLikes(likes + 1)}
              className="flex items-center space-x-1 hover:text-blue-600 transition"
            >
              <FaThumbsUp /> <span>{likes}</span>
            </button>
            <button
              onClick={() => setDislikes(dislikes + 1)}
              className="flex items-center space-x-1 hover:text-red-600 transition"
            >
              <FaThumbsDown /> <span>{dislikes}</span>
            </button>
            <button
              onClick={() => setShowInput(!showInput)}
              className="flex items-center space-x-1 hover:text-green-600 transition"
            >
              <FaReply /> <span>Reply</span>
            </button>

            {comment.replies?.length > 0 && (
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="flex items-center space-x-1 text-blue-500 hover:underline transition"
              >
                <LuMessageCircleMore />
                <span>
                  {showReplies
                    ? "Hide"
                    : `View ${comment.replies.length} replies`}
                </span>
              </button>
            )}
          </div>

          {/* Profile Modal */}
          {showProfileModal && selectedProfile && (
            <UserProfileModal
              user={selectedProfile}
              onClose={() => setShowProfileModal(false)}
            />
          )}
        </div>

        {/* Reply Input */}
        <div className="mt-2">{showInput && <Reply commentId={comment.id} />}</div>
      </div>

      {/* --- Nested Replies --- */}
      {showReplies && comment.replies?.length > 0 && (
        <div className="ml-8 mt-2 border-l border-gray-300 dark:border-gray-600 pl-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              setMessage={setMessage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ✅ Main ChatBox Component
const ChatBox = ({ postId, onCommentAdded }) => {
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const photoUrl = localStorage.getItem("photoUrl");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await getAllCommentsById(postId);
      setComments(res);
    } catch (error) {
      console.error("❌ Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSend = async () => {
    if (message.trim() === "") return;

    try {
      await addComment(userId, message, postId, userName, photoUrl);
      console.log("✅ Comment added");
      await fetchComments();
      if (onCommentAdded) onCommentAdded();
    } catch (error) {
      console.log("❌ Error:", error);
    }

    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col w-full max-w-md p-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      {/* Comments List */}
      <div className="flex-1 max-h-96 overflow-y-auto">
        {loading ? (
          <Loader />
        ) : comments.length === 0 ? (
          <div className="text-gray-500 text-center py-4">No comments yet</div>
        ) : (
          getRootComments(comments).map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              setMessage={setMessage}
            />
          ))
        )}
      </div>

      {/* Input Section */}
      <div className="flex mt-4 space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share your opinion..."
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default ChatBox;