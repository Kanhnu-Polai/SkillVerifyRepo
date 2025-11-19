import React, { useEffect, useState, useRef, useCallback } from "react";
import Readmore from "./Readmore";

import {
  getTrendingPost,
  updateLike,
  getUserProfile,
  getAllPostIdsLikedByUser,
  getByCategory
} from "./SpotlightApi";

import UserProfileModal from "./UserProfileModal";
import ChatBox from "./ChatBox";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import { useSelector } from "react-redux";

const PAGE_SIZE = 100;

const Post = ({ category = null }) => {
  const [posts, setPosts] = useState([]);
  const [loadingFirstPage, setLoadingFirstPage] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const [likedId, setLikedId] = useState([]);
  const [savedIds, setSavedIds] = useState([]); // still empty — no API

  const [followStatus, setFollowStatus] = useState({});
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [openChatPostId, setOpenChatPostId] = useState(null);

  const userId = localStorage.getItem("userId") || "";
  const { userData } = useSelector((state) => state.userData);

  const fetchedPostIdsRef = useRef(new Set());
  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const safeCall = async (fn, ...args) => {
    try {
      if (typeof fn === "function") return await fn(...args);
    } catch {}
    return null;
  };

  // ------------------------------------------------------------------
  // 1) Fetch Liked Post IDs For Current User
  // ------------------------------------------------------------------
  useEffect(() => {
    const init = async () => {
      setLoadingFirstPage(true);
      try {
        const [liked] = await Promise.all([
          safeCall(getAllPostIdsLikedByUser, userId)
        ]);

        setLikedId(Array.isArray(liked) ? liked : []);
      } finally {
        setLoadingFirstPage(false);
      }
    };

    init();
  }, [userId]);


  // ------------------------------------------------------------------
  // ⭐ IMPORTANT FIX ⭐
  // Reapply liked status after likedId loads
  // ------------------------------------------------------------------
  useEffect(() => {
    if (posts.length === 0) return;

    const likedSet = new Set(likedId);

    setPosts((prev) =>
      prev.map((p) => ({
        ...p,
        isLiked: likedSet.has(p.postId)
      }))
    );
  }, [likedId]);


  // ------------------------------------------------------------------
  // Fetch Posts (Trending or Category)
  // ------------------------------------------------------------------
  const fetchPage = useCallback(
    async (pageToFetch = 0) => {
      if (loadingMore) return;

      setLoadingMore(true);
      let newPosts = [];

      try {
        if (category) {
          const res = await safeCall(getByCategory, category);
          newPosts = Array.isArray(res) ? res : [];
          setHasMore(false);
        } else {
          const all = await safeCall(getTrendingPost);
          if (Array.isArray(all)) {
            const start = pageToFetch * PAGE_SIZE;
            newPosts = all.slice(start, start + PAGE_SIZE);
          }
        }

        const filtered = newPosts.filter((p) => {
          if (!p?.postId) return false;
          if (fetchedPostIdsRef.current.has(p.postId)) return false;
          fetchedPostIdsRef.current.add(p.postId);
          return true;
        });

        // apply liked state
        const likedSet = new Set(likedId);

        const merged = filtered.map((p) => ({
          ...p,
          isLiked: likedSet.has(p.postId),
          isSaved: false // no saved API yet
        }));

        setPosts((prev) => [...prev, ...merged]);

        if (!merged.length || merged.length < PAGE_SIZE) setHasMore(false);
      } finally {
        setLoadingMore(false);
      }
    },
    [category, likedId, loadingMore]
  );


  // Reset & load
  useEffect(() => {
    fetchedPostIdsRef.current.clear();
    setPosts([]);
    setPage(0);
    setHasMore(true);

    fetchPage(0).then(() => {
      if (!category) setPage(1);
    });
  }, [category, userId]);


  // Infinite Scroll for Trending
  useEffect(() => {
    if (category) return;
    if (!hasMore) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          fetchPage(page);
          setPage((p) => p + 1);
        }
      },
      { rootMargin: "200px", threshold: 0.1 }
    );

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

    return () => observerRef.current?.disconnect();
  }, [page, hasMore, loadingMore, category]);


  // Follow toggle
  const toggleFollow = (userId) => {
    setFollowStatus((prev) => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  // Like toggle
  const handleLike = async (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.postId === postId
          ? {
              ...p,
              isLiked: !p.isLiked,
              likeCount: p.isLiked ? p.likeCount - 1 : p.likeCount + 1
            }
          : p
      )
    );

    try {
      await safeCall(updateLike, userId, postId, true);
    } catch {}
  };

  // Save toggle (local-only)
  const toggleSave = (postId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.postId === postId ? { ...p, isSaved: !p.isSaved } : p
      )
    );
  };


  const handleUserClick = async (id) => {
    try {
      const profile = await safeCall(getUserProfile, id);
      setSelectedProfile(profile);
      setShowProfileModal(true);
    } catch {}
  };

  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden my-4 border animate-pulse h-40"></div>
  );

  return (
    <div className="max-w-4xl mx-auto md:px-2">

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
          {/* HEADER */}
          <div className="px-4 sm:px-6 py-4 border-b dark:border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleUserClick(post.userId)}
              >
                <img
                  src={post.userPhotoUrl}
                  className="w-10 h-10 rounded-full p-0.5 object-cover border dark:border-gray-600"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {post.userName == "null" ? "Anonymous" : post.userName}
                  </p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">
                    {post.createdAt
                      ? new Date(post.createdAt).toDateString()
                      : ""}
                    {post.category?.map((c, i) => (
                      <span key={i}> · {c}</span>
                    ))}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleFollow(post.userId)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition ${
                  followStatus[post.userId]
                    ? "bg-green-600 text-white border-green-500"
                    : "text-amber-500 border-amber-400"
                }`}
              >
                {followStatus[post.userId] ? "Following" : "Follow"}
              </button>
            </div>

            <h2 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">
              {post.title}
            </h2>

            <div className="flex flex-wrap gap-2 mt-2">
              {post.hashTags?.map((tag, i) => (
                <span
                  key={i}
                  className="md:text-xs text-[10px] font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-1 rounded transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* BODY */}
          <div className="flex flex-col md:flex-row p-4 sm:p-6 gap-4">
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                className="md:w-1/3 rounded-md shadow-md object-cover"
              />
            )}

            <div className="md:w-2/3">
              <Readmore text={post.description} limit={200} />
            </div>
          </div>

          {/* FOOTER */}
          <div className="px-4 sm:px-6 py-3 border-t text-slate-300 flex justify-between">
            <button onClick={() => handleLike(post.postId)} className="flex items-center gap-1">
              {post.isLiked ? (
                <FavoriteIcon className="text-red-500" />
              ) : (
                <FavoriteBorderIcon />
              )}
              {post.likeCount}
            </button>

            <button
              onClick={() => setOpenChatPostId(post.postId)}
              className="flex items-center gap-1"
            >
              <CommentIcon /> {post.commentCount}
            </button>

            <button onClick={() => toggleSave(post.postId)} className="flex items-center gap-1">
              {post.isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              Save
            </button>

            <button className="flex items-center gap-1">
              <ShareIcon /> Share
            </button>
          </div>

          {openChatPostId === post.postId && (
            <ChatBox postId={post.postId} />
          )}
        </div>
      ))}

      {!category && (
        <div ref={loadMoreRef} className="h-8 text-center text-gray-500">
          {loadingMore ? "Loading..." : !hasMore ? "You're all caught up!" : ""}
        </div>
      )}

      {showProfileModal && (
        <UserProfileModal
          user={selectedProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
};

export default Post;