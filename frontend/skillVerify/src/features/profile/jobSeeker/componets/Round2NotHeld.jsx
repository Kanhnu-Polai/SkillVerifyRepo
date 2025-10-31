import React from 'react'
import { HiCheck, HiX } from "react-icons/hi";
function Round2NotHeld() {
  return (
   <>
   <> 
                            <div className="min-w-32 text-sm font-semibold py-0.5 px-1 rounded-md bg-gradient-to-r from-green-500 to-emerald-600 flex justify-center items-center space-x-1 hover:border-1 ">
                                 <span>Assessment</span>
                                 <span className="text-yellow-300  text-lg">
                                   <HiCheck></HiCheck>
                                 </span>
                            </div>
                               <div className="w-28 flex justify-center items-center  ">
                                 <div className="w-4/5 h-1  bg-gradient-to-r from-amber-300 to-amber-400 "></div>
                                 <div className="w-1/5 h-1 bg-gray-600"></div>
                               </div>
                               <div className="min-w-32 text-sm font-semibold py-0.5 px-1 rounded-md text-slate-300 bg-slate-500 flex justify-center items-center space-x-1 ">
                                 <span>Interview</span>
                                
                            </div>
                            <div className="w-28 flex justify-center items-center  ">
                                 <div className="w-4/5 h-1  bg-slate-600 "></div>
                                 <div className="w-1/5 h-1  bg-slate-600"></div>
                               </div>
                               <div className="min-w-32 text-sm font-semibold py-0.5 px-1 text-slate-300 rounded-md bg-slate-500 flex justify-center items-center space-x-1 ">
                                 <span>ShortListed</span>
                                 
                            </div>
                               
                          </></>
  )
}

export default Round2NotHeld