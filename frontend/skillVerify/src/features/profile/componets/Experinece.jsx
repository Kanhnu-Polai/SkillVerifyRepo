import React, { useState } from 'react';
import { FaBriefcase, FaEdit } from 'react-icons/fa';
import AddButton from './AddButton';
import AddExperience from './AddExperience';

const Experience = ({ experience }) => {
  const [viewModal, setViewModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleAddClick = () => {
    setSelectedExperience(null); // Clear for new add
    setViewModal(true);
  };

  const handleEditClick = (exp) => {
    setSelectedExperience(exp); // set the experience to edit
    setViewModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-[15px] md:text-lg font-semibold font-sans text-white">Experience</h2>
          <AddButton tolTipText="Add experience" setView={handleAddClick} />
        </div>
        <div className="w-full h-0.5 rounded-2xl bg-blue-200"></div>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-blue-200 pl-6 space-y-6 mt-4">
        {experience && experience.length > 0 ? (
          experience.map((exp, i) => (
            <div key={i} className="relative">
              {/* Experience Card */}
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md  transition-shadow">
                <div className="flex items-center  justify-between">
                  <div className='w-full'>
                    <p className="text-gray-700 flex text-[12px] md:text-base items-center gap-2 font-medium">
                      <FaBriefcase /> {exp.role} - {exp.company}
                    </p>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate} | {exp.duration}
                    </p>
                    <p className="text-gray-600 text-[10px] md:text-sm mt-1">{exp.description}</p>
                    <div className=' w-full flex justify-end items-center'>
                        <button
                    className="text-sm md:text-lg text-slate-500 hover:text-slate-700 cursor-pointer"
                    onClick={() => handleEditClick(exp)}
                  >
                    <FaEdit />
                  </button>
                    </div>
                  </div>

                  
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-blue-200 text-[10px] md:text-xs font-medium flex items-center gap-2">
            Please add experience
          </p>
        )}
      </div>

      {/* Add / Edit Modal */}
      {viewModal && (
        <AddExperience
          onClose={setViewModal}
          experience={selectedExperience}
          type={!!selectedExperience} // true if editing
        />
      )}
    </div>
  );
};

export default Experience;