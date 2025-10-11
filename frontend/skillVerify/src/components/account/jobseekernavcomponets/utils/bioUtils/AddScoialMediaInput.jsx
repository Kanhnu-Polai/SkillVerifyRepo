import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSocialMediaLinks } from "../../../../../apiManager/userServiceApi";
import { fetchUserData } from "../../../../../redux/thunk/UserDataThunk";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin, FaGithub, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

const AddSocialMediaInput = ({ onClose }) => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userData);

  const [linkedin, setLinkedin] = useState("" || userData.linkedinUrl);
  const [twitter, setTwitter] = useState("" || userData.twitterUrl);
  const [facebook, setFacebook] = useState("" || userData.facebookUrl);
  const [instagram, setInstagram] = useState("" || userData.instagramUrl);
  const [youtube, setYoutube] = useState("" || userData.youtubeUrl);
  const [gitHub, setGitHub] = useState("" || userData.githubUrl);
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  const userEmail = localStorage.getItem("userEmail");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start loading

    const socialLinks = {
      email: userEmail,
      linkedinUrl: linkedin,
      twitterUrl: twitter,
      facebookUrl: facebook,
      youtubeUrl: youtube,
      githubUrl: gitHub,
    };

    console.log("Submitted social media links:", socialLinks);

    try {
      const res = await updateSocialMediaLinks(socialLinks);
      console.log("Updated links:", res);
      await dispatch(fetchUserData(userEmail));
      onClose(false);
    } catch (error) {
      console.error("Failed to update social links:", error);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative">
        {/* Overlay loader */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-xl z-10">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Social Media Links</h2>
          <button
            onClick={() => onClose(false)}
            className="text-gray-500 hover:text-gray-800 font-bold text-lg"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center gap-3">
            <FaLinkedin className="text-blue-600 text-xl" />
            <input
              type="url"
              placeholder="LinkedIn URL"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaGithub className="text-gray-800 text-xl" />
            <input
              type="url"
              placeholder="Github URL"
              value={gitHub}
              onChange={(e) => setGitHub(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaSquareXTwitter className="text-black text-xl" />
            <input
              type="url"
              placeholder="Twitter URL"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaFacebookF className="text-blue-600 text-xl" />
            <input
              type="url"
              placeholder="Facebook URL"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaInstagram className="text-pink-500 text-xl" />
            <input
              type="url"
              placeholder="Instagram URL"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <FaYoutube className="text-red-600 text-xl" />
            <input
              type="url"
              placeholder="YouTube URL"
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg transition duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Saving..." : "Save Links"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSocialMediaInput;
