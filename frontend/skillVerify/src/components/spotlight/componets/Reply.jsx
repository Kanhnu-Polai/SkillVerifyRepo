import React, { useState } from 'react';
import { addReply } from '../SpotlightApi';

const Reply = ({ commentId }) => {
  const [replyText, setReplyText] = useState("");
  const userId = localStorage.getItem("userId")
  const userName = localStorage.getItem("userName")
  const photoUrl = localStorage.getItem("photoUrl")

  console.log("sfhjshjfh",commentId)


  const handleReply = () => {
    if (replyText.trim() === "") return;
   
    const res = addReply(commentId,replyText,userId,userName,photoUrl)
    
    setReplyText("");
  };

  return (
    <div className="flex items-center w-full max-w-md bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm overflow-hidden">
      <input
        type="text"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        placeholder="Reply here..."
        className="flex-1 px-4 py-2 text-gray-900 dark:text-gray-100 bg-transparent focus:outline-none focus:ring-0"
      />
      <button
        onClick={handleReply}
        className="px-3 py-1   hover:bg-blue-700 text-white text-[14px] font-sans rounded-md transition font-light"
      >
        Reply
      </button>
    </div>
  );
};

export default Reply;