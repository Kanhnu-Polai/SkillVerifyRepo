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
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-2">
      {/* Modal Container */}
      <div className="bg-gray-50 w-full mx-3 max-w-md p-6 rounded-2xl shadow-xl relative transition-all h-96 overflow-y-auto ">

        {/* Close Button */}
        <div className="flex justify-end mb-3 ">
          <button 
            className="text-red-600 font-bold text-lg px-3 py-1 hover:bg-red-100 rounded-full transition-colors" 
            onClick={() => onClose(false)}
          >
            ×
          </button>
        </div>

        {/* Posts */}
        {dummyPosts.map(post => (
          <div 
            key={post.id} 
            className="bg-white text-gray-800 border border-gray-200 rounded-xl flex flex-row p-4 shadow-sm hover:shadow-md transition-shadow duration-300 mb-4"
          >
            {/* Post Image */}
            <div className="md:w-24 md:h-24 w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
              <img 
                src={post.photoUrl} 
                alt="Post" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Post Content */}
            <div className="ml-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[9px] md:text-[10px] text-gray-500">{post.date}</span>
                <h3 className="font-semibold text-[14px] md:text-[16px] mt-1">{post.title}</h3>
                <p className="text-[10px] hidden md:block md:text-[12px] mt-1 line-clamp-2 text-gray-600">{post.description}</p>
              </div>

              {/* Likes / Comments / View */}
              <div className="flex justify-between items-center mt-3">
                <span className="flex items-center gap-1 text-[10px] md:text-[12px] text-gray-600">
                  <FaHeart className="text-red-500" /> {post.likes}
                </span>
                <span className="flex items-center gap-1 text-[10px] md:text-[12px] text-gray-600">
                  <FaComment className="text-blue-500" /> {post.comments}
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