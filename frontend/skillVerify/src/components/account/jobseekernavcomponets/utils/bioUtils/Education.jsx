import React, { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import AddButton from "./AddButton";
import AddEducation from "./AddEducation";
import { FaEdit } from "react-icons/fa";
import EditEducation from "./EditEducation";


const Education = ({ education }) => {

    const[view,setView] = useState(false)
    const[viewEdit,setViewEdit] = useState(false)
    const [selectedEducation, setSelectedEducation] = useState(null);

    const handleEditClick = (edu)=>{
        setSelectedEducation(edu)
        setViewEdit(true)
    }

    

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center">
            <h2 className="text-[15px] md:text-lg font-semibold text-white tracking-wide">
          Education
        </h2>
        <AddButton tolTipText="Add education" setView={setView}/>
        </div>
        <div className="w-full h-[2px] bg-gradient-to-r from-blue-200 to-blue-400 rounded-full mt-1"></div>
      </div>

      {/* Timeline */}
      <div className="relative border-l-[2px] border-blue-300/70 pl-6 space-y-6 mt-4">
        {education && education.length > 0 ? (
          education.map((edu, index) => (
            <div
              key={index}
              className="relative bg-slate-50 p-4 flex justify-between rounded-xl shadow-md hover:shadow-lg transition-all duration-300 "
            >
              
              <div className=" ">
                <h3 className="text-gray-700  text-[12px] md:text-base font-medium flex items-center gap-2">
                  <FaGraduationCap  />
                  {edu.degree}
                </h3>
                <p className="text-gray-500 text-[11px] md:text-sm mt-1">{edu.institution}</p>
                <p className="text-gray-500 text-[11px] md:text-sm mt-1">
                  
                  {edu.fieldOfStudy} <span className="mx-2   md:text-base">|</span>
                  {edu.startYear} – {edu.endYear}
                </p>
                
                
              </div>
              <div>
                <button className="text-sm md:text-lg text-slate-500 hover:text-slate-700 cursor-pointer" onClick={()=>handleEditClick(edu)}><FaEdit/></button>
              </div>
             
            </div>
          ))
        ) : (
          <p className="text-blue-200 text-[12px] md:text-sm flex items-center gap-2">
            <FaGraduationCap className="text-blue-300" /> No education data
            available
          </p>
        )}
      </div>

      {view && <AddEducation onClose = {setView}/>}
       {viewEdit && <AddEducation onClose={setViewEdit} type = {true} education={selectedEducation} /> }
       
     
    </div>
  );
};

export default Education;