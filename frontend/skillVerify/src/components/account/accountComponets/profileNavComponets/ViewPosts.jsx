import React, { useEffect, useState } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';
import { FiMinusCircle } from "react-icons/fi";
import { getAllPostsOfUser } from '../../../../apiManager/postApi';
import FormattedDate from './FormattedDate';

const ViewPosts = ({ onClose }) => {
  const userId = localStorage.getItem("userId");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPostsOfUser(userId);
        setPosts(res);
        console.log(res);
      } catch (error) {
        console.error("Error while fetching user posts for userId:", userId, error);
      }
    };
    fetchPosts();
  }, [userId]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2">
      {/* Modal Container */}
      <div className="bg-gray-50 w-full mx-3 max-w-md p-6 rounded-2xl shadow-xl relative transition-all h-96 overflow-y-auto">

        {/* Close Button */}
        <div className="flex justify-end mb-3 ">
          <button
            className="text-slate-600 font-bold text-lg hover:text-red-500 cursor-pointer rounded-full transition-colors "
            onClick={() => onClose(false)}
          >
            <FiMinusCircle />
          </button>
        </div>

        {/* Posts */}
        {posts.map(post => (
          <div
            key={post.postId}
            className="bg-white text-gray-800 border border-gray-200 rounded-xl flex flex-row p-4 shadow-sm hover:shadow-md transition-shadow duration-300 mb-4"
          >
            {/* Post Image */}
            <div className="md:w-24 md:h-24 w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-gray-100">
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-[10px] md:text-xs font-medium">
                  N/A
                </span>
              )}
            </div>

            {/* Post Content */}
            <div className="ml-4 flex-1 flex flex-col justify-between">
              <div>
                <FormattedDate dateString={post.createdAt} />
                <h3 className="font-semibold text-[14px] md:text-[16px] mt-1">{post.title}</h3>
              </div>

              {/* Likes / Comments / View */}
              <div className="flex justify-between items-center mt-3">
                <span className="flex items-center gap-1 text-[10px] md:text-[12px] text-gray-600">
                  <FaHeart className="text-red-500" /> {post.likeCount ?? 0}
                </span>
                <span className="flex items-center gap-1 text-[10px] md:text-[12px] text-gray-600">
                  <FaComment className="text-blue-500" /> {post.commentCount ?? 0}
                </span>
                <button className="flex items-center gap-1 px-3 py-1 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors text-[10px] md:text-[12px]">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ViewPosts;