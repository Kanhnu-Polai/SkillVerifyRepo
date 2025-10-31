import React from 'react'

import { HiOutlineCheck, HiOutlineX } from "react-icons/hi"; // Outline version
import { HiCheck, HiX } from "react-icons/hi"; // Solid version
import ShortListed from './ShortListed';
import Round2Failed from './Round2Failed';
import Round2NotHeld from './Round2NotHeld';


const JobStatusProgress = () => {
    const stages = [
        { id: 1, name: "Applied", completed: true },
        { id: 2, name: "Round 1", completed: true ,rejected:false,result:true},
        { id: 3, name: "Round 2", completed: true, rejected: false ,result:true},
        { id: 4, name: "ShortListed", completed: false, rejected: false ,result:false},
        { id: 5, name: "Rejected", completed: false, rejected: true ,result:false},

    ]

    const appliedStage = stages.find(stage => stage.name === "Applied");
    const round1Stage = stages.find(stage => stage.name === "Round 1");
    const round2Stage = stages.find(stage => stage.name === "Round 2");
    const shortListedStage = stages.find(stage => stage.name === "ShortListed");
    const rejectedStage = stages.find(stage => stage.name === "Rejected");

  return (
    <div className="ml-3 md:flex md:justify-center    bg-gradient-to-r from-teal-900 to-zinc-800 md:h-16 items-center p-4 rounded-md border   ">
              
                <div className= " min-w-32 text-white text-[5px] md:text-sm font-semibold py-0.5 px-1 rounded-md bg-gradient-to-r from-green-500 to-emerald-600 flex justify-center items-center space-x-1 hover:border-1   ">
                  <span>Applied</span>
                  
                  
    
                 
                  <span className="text-yellow-300  text-lg ">
                    <HiCheck></HiCheck>
                   
                  </span>
                 
                </div>
               
                <div className="w-32 flex justify-center items-center ">
                  <div className="w-4/5 h-1  bg-gradient-to-r from-amber-50 to-amber-200 "></div>
                  {
                    round1Stage.completed?<div className=" md:w-1/5 md:h-1  w-1 h-4  bg-gradient-to-r from-amber-200 to-amber-300"></div>:<div className="md:w-1/5 md:h-1   bg-slate-600"></div>

                  }
                 
                </div>


                
                  {
                  round1Stage.completed?(
                    round1Stage.result==true?(
                      round2Stage.completed?(
                        round2Stage.result==true?(
                     
                         <ShortListed></ShortListed>
                            
                         ):(<Round2Failed></Round2Failed> )
                      ):(<Round2NotHeld></Round2NotHeld>)
                    ):(<> 
                         <div className="min-w-32 text-[5px] md:text-sm font-semibold py-0.5 px-1 rounded-md  bg-gradient-to-r from-pink-600 to-red-500 flex justify-center items-center space-x-1 ">
                              <span>Assessment</span>
                              <span className="text-yellow-300  text-lg">
                                <HiX></HiX>
                              </span>
                         </div>
                            <div className="w-28 flex justify-center items-center  ">
                              <div className="w-4/5 h-1   bg-gray-600"></div>
                              <div className="w-1/5 h-1 bg-gray-600"></div>
                            </div>
                            <div className="min-w-32 md:text-sm  text-[5px] font-semibold py-0.5 px-1 rounded-md  text-slate-300  bg-slate-500 flex justify-center items-center space-x-1  ">
                              <span>Interview</span>
                             
                         </div>
                         <div className="w-28 flex justify-center items-center  ">
                              <div className="w-4/5 h-1  bg-slate-600 "></div>
                              <div className="w-1/5 h-1  bg-slate-600"></div>
                            </div>
                            <div className="min-w-32 md:text-sm text-[5px] font-semibold py-0.5 px-1 text-slate-300 rounded-md bg-slate-500 flex justify-center items-center space-x-1 ">
                              <span>ShortListed</span>
                              
                         </div>
                            
                       </>)
                  ):(<> 
                         <div className="min-w-32 text-[5px] md:text-sm font-semibold py-0.5 px-1 rounded-md  bg-slate-500 flex justify-center items-center space-x-1 ">
                              <span>Assessment</span>
                              
                         </div>
                            <div className="w-28 flex justify-center items-center  ">
                              <div className="w-4/5 h-1   bg-gray-600"></div>
                              <div className="w-1/5 h-1 bg-gray-600"></div>
                            </div>
                            <div className="min-w-32 text-[5px] md:text-sm font-semibold py-0.5 px-1 rounded-md  text-slate-300  bg-slate-500 flex justify-center items-center space-x-1 ">
                              <span>Interview</span>
                             
                         </div>
                         <div className="w-28 flex justify-center items-center  ">
                              <div className="w-4/5 h-1  bg-slate-600 "></div>
                              <div className="w-1/5 h-1  bg-slate-600"></div>
                            </div>
                            <div className="min-w-32 text-[5px] md:text-sm font-semibold py-0.5 px-1 text-slate-300 rounded-md bg-slate-500 flex justify-center items-center space-x-1 ">
                              <span>ShortListed</span>
                              
                         </div>
                            
                       </>)
                }
               

               
                
                
                













                
 </div>
  )
}

export default JobStatusProgress