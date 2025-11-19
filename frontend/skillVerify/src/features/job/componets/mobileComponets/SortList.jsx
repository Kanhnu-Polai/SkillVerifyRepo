import React from 'react'

const SortList = () => {
  return (
    <div
      className="absolute bottom-14 mb-2 
                 w-40 bg-white shadow-xl rounded-xl 
                 border border-gray-200 
                 p-2 text-sm z-[999]
                 animate-slideUp"
    >
      <p className="font-medium px-2 py-1 text-gray-700">Sort By</p>
      <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100">
        Newest First
      </button>
      <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100">
        Trending
      </button>
      <button className="w-full text-left px-2 py-1 rounded hover:bg-gray-100">
        Highly Applied
      </button>
    </div>
  )
}

export default SortList