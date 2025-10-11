import React, { useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import AddButton from "./AddButton";
import AddScoialMediaInput from "./AddScoialMediaInput";

const AddSocialMediaProfile = ({ userData }) => {
  const [view, setView] = useState(false);




  const socialLinks = [
    { name: "LinkedIn", url: userData.linkedinUrl, Icon: FaLinkedin, color: "text-[#0A66C2]" },
    { name: "GitHub", url: userData.githubUrl, Icon: FaGithub, color: "text-gray-900" },
    { name: "Instagram", url: userData.instagramUrl, Icon: FaInstagram, color: "text-[#E1306C]" },
    { name: "Facebook", url: userData.facebookUrl, Icon: FaFacebookF, color: "text-[#1877F2]" },
    { name: "Twitter", url: userData.twitterUrl, Icon: FaSquareXTwitter, color: "text-black" },
    { name: "YouTube", url: userData.youtubeUrl, Icon: FaYoutube, color: "text-[#FF0000]" },
  ];

  const availableLinks = socialLinks.filter((link) => link.url);

  return (
    <div className="space-y-4 mt-4 text-white bg-gradient-to-r from-cyan-700 to-cyan-800 p-5 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-[15px] md:text-lg font-semibold">Social Media Profiles</h1>
        <AddButton setView={setView} tolTipText = "Add more profiles" />
      </div>

      {/* Icons Section */}
      <div className="flex flex-wrap gap-5 mt-4 justify-start">
        {availableLinks.length > 0 ? (
          availableLinks.map(({ Icon, color, url, name }, idx) => (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className={`relative flex justify-center items-center w-7 h-7 md:w-9 md:h-9 cursor-pointer rounded-full bg-white/70 hover:bg-amber-50 text-gray-800 shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 group`}
              title={name}
            >
              <Icon className={`text-xl md:text-2xl ${color}`} />
              {/* Tooltip */}
              <span className="absolute bottom-[-28px] text-xs text-white bg-black/70 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
                {name}
              </span>
            </a>
          ))
        ) : (
          <p className="text-white/90 text-sm">No social media links added yet.</p>
        )}
      </div>

      {view && <AddScoialMediaInput onClose={() => setView(false)} />}
    </div>
  );
};

export default AddSocialMediaProfile;
