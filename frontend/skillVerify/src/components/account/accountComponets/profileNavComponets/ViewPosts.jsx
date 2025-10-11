import React from 'react';
import { FaHeart, FaComment, FaEye } from 'react-icons/fa';

const dummyPosts = [
  {
    id: 1,
    date: 'Oct 10, 2025',
    title: 'Exploring the Mountains',
    description: 'Had an amazing adventure climbing the Alps last weekend.',
    photoUrl: 'https://res.cloudinary.com/dup5b38zp/image/upload/v1756806732/photos/jlefobn4iozzled0fmqj.png',
    likes: 124,
    comments: 32
  },
  {
    id: 2,
    date: 'Oct 9, 2025',
    title: 'City Lights at Night',
    description: 'Capturing the vibrant city life with long exposure photography.',
    photoUrl: 'https://res.cloudinary.com/dup5b38zp/image/upload/v1756806732/photos/jlefobn4iozzled0fmqj.png',
    likes: 98,
    comments: 21
  }
];

const ViewPosts = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50 p-2">
      {/* Modal Container */}
      <div className="bg-white w-full mx-3 max-w-md p-6 rounded-2xl shadow-lg relative transition-all">

        {/* Close Button */}
        <div className="flex justify-end mb-2">
          <button 
            className="text-red-600 font-bold text-lg px-2 py-1 hover:bg-red-100 rounded" 
            onClick={() => onClose(false)}
          >
            X
          </button>
        </div>

        {/* Posts */}
        {dummyPosts.map(post => (
          <div 
            key={post.id} 
            className="bg-white rounded-xl flex flex-row p-4 shadow-md hover:shadow-lg transition-shadow duration-300 mb-3"
          >
            {/* Post Image */}
            <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
              <img 
                src={post.photoUrl} 
                alt="Post" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Content */}
            <div className="ml-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[8px] md:text-[10px] text-gray-500">{post.date}</span>
                <h3 className="font-bold text-[13px] md:text-[15px] text-slate-900 mt-1">{post.title}</h3>
                <p className="text-[10px] md:text-[12px] mt-1 text-gray-700 line-clamp-2">{post.description}</p>
              </div>

              {/* Likes / Comments / View */}
              <div className="flex justify-between items-center mt-3">
                <span className="flex items-center gap-1 text-[10px] md:text-[12px]">
                  <FaHeart className="text-red-500" /> {post.likes}
                </span>
                <span className="flex items-center gap-1 text-[10px] md:text-[12px]">
                  <FaComment className="text-blue-500" /> {post.comments}
                </span>
                <button className="flex items-center gap-1 px-3 py-1 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors text-[10px] md:text-[12px]">
                  <FaEye /> View
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