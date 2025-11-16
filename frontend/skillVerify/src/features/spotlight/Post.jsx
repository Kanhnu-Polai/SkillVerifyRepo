import React, { useEffect, useState, useRef, useCallback } from "react";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";



const PAGE_SIZE = 6; 

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loadingFirstPage, setLoadingFirstPage] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [likedId, setLikedId] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [followStatus, setFollowStatus] = useState({}); // per-user follow state
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [openChatPostId, setOpenChatPostId] = useState(null);

  const userId = localStorage.getItem("userId") || "";
  const { userData } = useSelector((state) => state.userData);

  // keep a ref of fetched postIds to avoid duplicates across pages
  const fetchedPostIdsRef = useRef(new Set());
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // Helper: safe call if function exists on SpotlightApi
  const safeCall = async (fn, ...args) => {
    try {
      if (typeof fn === "function") return await fn(...args);
    } catch (err) {
      console.error("Safe call error:", err);
    }
    return null;
  };

  // Initial load & liked/saved ids
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      setLoadingFirstPage(true);
      try {
        
        const [likedIdsRes, savedIdsRes] = await Promise.all([
          safeCall(getAllPostIdsLikedByUser, userId),
          safeCall(
            
            typeof getAllPostIdsSavedByUser !== "undefined" ? getAllPostIdsSavedByUser : null,
            userId
          ),
        ]);

        setLikedId(Array.isArray(likedIdsRes) ? likedIdsRes : []);
        setSavedIds(Array.isArray(savedIdsRes) ? savedIdsRes : []);
      } catch (err) {
        console.error("Init liked/saved fetch failed:", err);
      } finally {
        setLoadingFirstPage(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [userId]);

  
  const fetchPage = useCallback(
    async (pageToFetch = 0) => {
      if (loadingMore) return;
      setLoadingMore(true);

      try {
       
        const paginatedFn =
          typeof getTrendingPostPaginated !== "undefined"
            ? getTrendingPostPaginated
            : null;

        let newPosts = [];

        if (paginatedFn) {
         
          const res = await safeCall(paginatedFn, { page: pageToFetch, size: PAGE_SIZE });
          newPosts = Array.isArray(res) ? res : [];
        } else {
         
          const all = await safeCall(getTrendingPost);
          if (Array.isArray(all)) {
            const start = pageToFetch * PAGE_SIZE;
            newPosts = all.slice(start, start + PAGE_SIZE);
          }
        }

        
        const filtered = (newPosts || []).filter((p) => {
          if (!p || !p.postId) return false;
          if (fetchedPostIdsRef.current.has(p.postId)) return false;
          fetchedPostIdsRef.current.add(p.postId);
          return true;
        });

       
        const likedSet = new Set(likedId);
        const savedSet = new Set(savedIds);
        const merged = filtered.map((p) => ({
          ...p,
          isLiked: !!likedSet.has(p.postId) || !!p.isLiked,
          isSaved: !!savedSet.has(p.postId) || !!p.isSaved,
        }));

        // append
        setPosts((prev) => [...prev, ...merged]);

        // if fetched less than page size, no more pages
        if (!merged.length || merged.length < PAGE_SIZE) setHasMore(false);
      } catch (err) {
        console.error("Error fetching page:", err);
      } finally {
        setLoadingMore(false);
      }
    },
    [likedId, savedIds, loadingMore]
  );

  // initial fetch
  useEffect(() => {
    // reset on user change
    fetchedPostIdsRef.current.clear();
    setPosts([]);
    setPage(0);
    setHasMore(true);

    // fetch first page
    fetchPage(0).then(() => {
      setPage(1);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!hasMore) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          fetchPage(page).then(() => setPage((p) => p + 1));
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);
    return () => observerRef.current && observerRef.current.disconnect();
  }, [fetchPage, hasMore, loadingMore, page]);

  // user clicked to view profile (unchanged)
  const handleUserClick = async (id) => {
    const profileViewData = {
      viewerUserId: userId,
      viewerName: userData?.fullName,
      viewerPhotoUrl: userData?.photoUrl,
    };

    try {
      const userInfo = await safeCall(getUserProfile, id);
      await safeCall(updateProfileView, id, profileViewData);
      setSelectedProfile(userInfo);
      setShowProfileModal(true);
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  // comment added increments local count (unchanged)
  const handleCommentAdded = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.postId === postId
          ? { ...post, commentCount: (post.commentCount || 0) + 1 }
          : post
      )
    );
  };

  // like/unlike — keep optimistic update and use your existing updateLike call
  const handleLike = async (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.postId === postId
          ? {
              ...p,
              isLiked: !p.isLiked,
              likeCount: (p.likeCount || 0) + (p.isLiked ? -1 : 1),
            }
          : p
      )
    );

    // call the API you already use (unchanged)
    try {
      await safeCall(updateLike, userId, postId, true);
      // on success optionally update likedId set
      setLikedId((prev) =>
        prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
      );
    } catch (err) {
      console.error("Like API failed:", err);
    }
  };

  // follow/unfollow — per-post author follow state, optimistic + optional API calls
  const toggleFollow = async (authorUserId) => {
    setFollowStatus((prev) => {
      const current = !!prev[authorUserId];
      return { ...prev, [authorUserId]: !current };
    });

    // try to call follow/unfollow if API present
    try {
      if (typeof followUser !== "undefined" && typeof unfollowUser !== "undefined") {
        const currentlyFollowing = !!followStatus[authorUserId];
        if (currentlyFollowing) {
          await safeCall(unfollowUser, userId, authorUserId);
        } else {
          await safeCall(followUser, userId, authorUserId);
        }
      }
    } catch (err) {
      console.error("Follow/unfollow API failed:", err);
    }
  };

  // save/unsave post (bookmark)
  const toggleSave = async (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.postId === postId ? { ...p, isSaved: !p.isSaved } : p
      )
    );

    // local savedIds update
    setSavedIds((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );

    try {
      if (typeof savePost !== "undefined" && typeof unsavePost !== "undefined") {
        const currentlySaved = savedIds.includes(postId);
        if (currentlySaved) {
          await safeCall(unsavePost, userId, postId);
        } else {
          await safeCall(savePost, userId, postId);
        }
      }
    } catch (err) {
      console.error("Save/unsave API failed:", err);
    }
  };

  // toggle chat box for a post
  const handleChatOpen = (postId) => {
    setOpenChatPostId((prev) => (prev === postId ? null : postId));
  };

  // Small UI skeleton item
  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden my-4 border animate-pulse">
      <div className="px-4 sm:px-6 py-4 border-b flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
        <div className="flex-1">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2" />
          <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-1/4" />
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3" />
        <div className="h-40 bg-gray-200 dark:bg-gray-800 rounded mb-3" />
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto md:px-2">
      {/* Skeletons on initial load */}
      {loadingFirstPage && (
        <>
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}

      {posts.map((post) => (
        <div
          key={post.postId}
          className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden my-4 border transition-transform duration-200 hover:scale-[1.004]"
        >
          {/* Header */}
          <div className="px-4 sm:px-6 py-4 border-b dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleUserClick(post.userId)}
              >
                <img
                  src={post.userPhotoUrl}
                  alt={post.userName}
                  className="w-10 h-10 rounded-full p-0.5 object-cover border dark:border-gray-600"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {post.userName || "User"}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {post.createdAt ? new Date(post.createdAt).toDateString() : ""}
                    {post.category ? ` · ${post.category}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFollow(post.userId)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 transform hover:scale-105 ${
                    followStatus[post.userId]
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500"
                      : "text-amber-500 border-amber-400 hover:bg-amber-400 hover:text-white"
                  }`}
                >
                  {followStatus[post.userId] ? "Following" : "Follow"}
                </button>
              </div>
            </div>

            {/* Title & tags */}
            <h2 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">
              {post.title}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {post.hashTags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="md:text-xs text-[10px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-1 rounded transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-col md:flex-row p-4 sm:p-6 gap-4">
            {post.imageUrl && (
              <div className="md:w-1/3 flex justify-center">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-fit rounded-md object-cover shadow-md transition-transform duration-200 hover:scale-105"
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

          {/* Footer actions */}
          <div className="px-4 sm:px-6 py-3 border-t dark:border-gray-700 text-[14px] md:text-[16px] flex justify-between items-center">
            <div className="flex gap-4">
              {/* Like */}
              <button
                className={`flex items-center gap-1 transition transform active:scale-95 ${
                  post.isLiked ? "text-red-500" : "text-gray-600 dark:text-gray-300 hover:text-red-500"
                }`}
                onClick={() => handleLike(post.postId)}
              >
                {post.isLiked ? (
                  <FavoriteIcon className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <FavoriteBorderIcon className="w-5 h-5 md:w-6 md:h-6" />
                )}
                <span className="select-none">{post.likeCount || 0}</span>
              </button>

              {/* Comment */}
              <button
                className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition transform active:scale-95"
                onClick={() => handleChatOpen(post.postId)}
              >
                <CommentIcon className="w-5 h-5 md:w-6 md:h-6" />
                <span className="select-none">{post.commentCount || 0}</span>
              </button>
            </div>

            <div className="flex gap-4 items-center">
              {/* Save / Bookmark */}
              <button
                className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-green-500 transition transform active:scale-95"
                onClick={() => toggleSave(post.postId)}
              >
                {post.isSaved ? (
                  <BookmarkIcon className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <BookmarkBorderIcon className="w-5 h-5 md:w-6 md:h-6" />
                )}
                <span className="select-none">Save</span>
              </button>

              {/* Share */}
              <button className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-purple-500 transition transform active:scale-95">
                <ShareIcon className="w-5 h-5 md:w-6 md:h-6" />
                Share
              </button>
            </div>
          </div>

          {/* Chat box */}
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

      {/* Load more sentinel */}
      <div ref={loadMoreRef} className="h-8 flex items-center justify-center">
        {loadingMore && (
          <div className="text-sm text-gray-500 animate-pulse">Loading more...</div>
        )}
        {!hasMore && !loadingMore && posts.length > 0 && (
          <div className="text-sm text-gray-400">You're all caught up ! </div>
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
  );
};

export default Post;