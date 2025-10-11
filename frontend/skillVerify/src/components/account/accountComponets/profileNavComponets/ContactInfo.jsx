import React, { useState } from "react";
import {
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import UpdateUserModal from "../../UpdateUserModal";
import UpdateContactInfo from "./UpdateContactInfo";

const ContactInfo = ({ userData }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  return (
    <div className="space-y-3 mt-4 text-white md:text-sm text-[10px] font-medium bg-gradient-to-r from-cyan-700 to-cyan-800 py-4 px-5 rounded-2xl ">
      <div className="flex justify-between items-center mt-1">
        <h1 className="text-[15px] md:text-lg font-semibold font-sans">Contact Information</h1>
        <button
          className="text-white font-semibold hover:text-blue-100 cursor-pointer"
          onClick={() => setIsUpdateModalOpen(true)}
        >
          Update
        </button>
      </div>

      <p className=" text-gray-100 font-mono">
        <FaPhone className="inline mr-2" />
        {userData?.phone || "(+91) XXXXX XXXXX"}
      </p>

      <p className=" text-gray-100 font-mono">
        <MdEmail className="inline mr-2 text-gray-100" />
        {userData?.email || "your@email.com"}
      </p>

      <p className=" text-gray-100 font-mono">
        <FaMapMarkerAlt className="inline mr-2 text-gray-100" />
        {userData?.address?.street || "Your Street"},{" "}
        {userData?.address?.city || "City"} -{" "}
        {userData?.address?.pin || "PIN"}
      </p>

      {isUpdateModalOpen && <UpdateContactInfo onClose= {setIsUpdateModalOpen} userData ={userData} />}
    </div>
  );
};

export default ContactInfo;
