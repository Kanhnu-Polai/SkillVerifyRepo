import React from 'react'
import { HiCheck, HiX } from "react-icons/hi"; // Solid version
const ShortListed = () => {
  return (
    <>
    <div className="text-[5px] md:text-sm font-semibold py-0.5 px-1 rounded-md bg-gradient-to-r from-green-500 to-emerald-600 flex justify-center items-center space-x-1 hover:border-1 ">
                                  <span>Assessment</span>
                                  <span className="text-yellow-300  text-lg">
                                    <HiCheck></HiCheck>
                                  </span>
                             </div>
                                <div className="w-28 flex justify-center items-center  ">
                                  <div className="w-4/5 h-1  bg-gradient-to-r from-amber-300 to-amber-400 "></div>
                                  <div className="w-1/5 h-1 bg-gradient-to-r from-amber-400 to-amber-500"></div>
                                </div>
                                <div className="min-w-32 text-[5px] md:text-sm font-semibold py-0.5 px-1 rounded-md bg-gradient-to-r from-green-500 to-emerald-600 flex justify-center items-center space-x-1 hover:border-1 ">
                                  <span>Interview</span>
                                  <span className="text-yellow-300  text-lg">
                                    <HiCheck></HiCheck>
                                  </span>
                             </div>
                             <div className="w-28 flex justify-center items-center  ">
                                  <div className="w-4/5 h-1  bg-gradient-to-r from-amber-500 to-amber-600 "></div>
                                  <div className="w-1/5 h-1 bg-gradient-to-r from-amber-600 to-amber-700"></div>
                                </div>
                                <div className="min-w-32 text-[5px] md:text-sm font-semibold py-0.5 px-1 rounded-md bg-gradient-to-r from-green-500 to-emerald-600 flex justify-center items-center space-x-1 hover:border-1  ">
                                  <span>ShortListed</span>
                                  <span className="text-yellow-300  text-lg">
                                    <HiCheck></HiCheck>
                                  </span>
                             </div>
    </>
  )
}

export default ShortListed