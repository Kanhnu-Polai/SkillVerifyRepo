import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { MdDeveloperMode } from "react-icons/md";
import { FaCode, FaLaptopCode } from "react-icons/fa";
import { SiInternetcomputer } from "react-icons/si";
import { FaDev } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="w-full bg-[#0A192F] text-gray-300 py-12 px-6 md:px-20 mt-6 rounded-t-2xl shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">

        {/* About SkillVerify */}
        <div>
          <h3 className="text-lg text-white font-bold mb-4">About SkillVerify</h3>
          <p className="text-gray-400 leading-relaxed">
            SkillVerify is a skill-first job platform that connects verified candidates with top companies 
            using real-time exams, smart filtering, and automated interviews.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg text-white font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {["Jobs", "Trending", "Login", "Sign Up", "News"].map((link, i) => (
              <li key={i}>
                <a href="#" className="hover:text-cyan-400 hover:pl-1 transition-all cursor-pointer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg text-white font-bold mb-4">Resources</h3>
          <ul className="space-y-2">
            {["Tech News", "Resume Tips", "Interview Guide", "Help Center"].map((res, i) => (
              <li key={i}>
                <a href="#" className="hover:text-cyan-400 hover:pl-1 transition-all cursor-pointer">
                  {res}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg text-white font-bold mb-4">Contact & Follow</h3>
          <p className="text-cyan-400 font-medium mb-2 cursor-pointer hover:underline">
            support@skillverify.com
          </p>
          <p className="text-gray-400 mb-4">Bhubaneswar, India</p>
          <div className="flex space-x-4 text-xl">
            <a href="#" aria-label="Facebook" title="Facebook" className="hover:text-blue-400 transition">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="X (Twitter)" title="Twitter / X" className="hover:text-sky-400 transition">
              <FaXTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" title="LinkedIn" className="hover:text-blue-600 transition">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="GitHub" title="GitHub" className="hover:text-white transition">
              <FaGithub />
            </a>
            <a href="mailto:support@skillverify.com" aria-label="Email" title="Email" className="hover:text-red-400 transition">
              <FaEnvelope />
            </a>
          </div>
          <div className="flex justify-end space-x-1 relative group">
  <a
    href="https://kanhnu-polai.netlify.app/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <FaDev className="text-4xl text-yellow-400 cursor-pointer" />
  </a>

  {/* Tooltip */}
  <div className="absolute bottom-full mb-2 right-0 hidden group-hover:block bg-gray-800 text-pink-500 font-mono font-medium text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap">
    Developer Info
  </div>
</div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-600 my-6 "></div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} <span className="text-cyan-400 font-semibold">SkillVerify</span>. All rights reserved.
      </div>
      
    </footer>
  );
};

export default Footer;