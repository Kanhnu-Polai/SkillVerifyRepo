// components/cards/ApplicationCard.jsx
import React from 'react';
import clsx from 'clsx';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import TimelineIcon from '@mui/icons-material/Timeline';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const statusColors = {
  Applied: 'bg-yellow-500',
  Shortlisted: 'bg-green-500',
  Rejected: 'bg-red-500',
};

const ApplicationCard = ({ company, position, experience, salary, date, status }) => {
  return (
    <div className="flex border rounded-lg shadow-sm bg-white overflow-hidden mb-4">
      {/* Status Bar */}
      <div className={clsx("w-2", statusColors[status] || 'bg-gray-400')} />

      {/* Content */}
      <div className="p-4 w-full space-y-1">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ApartmentIcon className="text-blue-700" /> {company}
        </h2>
        <p className="text-sm text-gray-700 flex items-center gap-1">
          <WorkIcon className="text-gray-600" /> Position: <span className="font-medium">{position}</span>
        </p>
        <p className="text-sm text-gray-700 flex items-center gap-1">
          <TimelineIcon className="text-gray-600" /> Experience: {experience}
        </p>
        <p className="text-sm text-gray-700 flex items-center gap-1">
          <MonetizationOnIcon className="text-gray-600" /> Salary: {salary}
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
          <EventNoteIcon className="text-gray-500" /> Applied on: {date}
        </p>
      </div>

      {/* Rounds and Schedule */}
      <div className='min-w-64 p-4 text-sm text-gray-700 space-y-2'>
        {/* Round 1 */}
        <div>
          <p className="flex items-center gap-1 font-medium text-gray-800">
            <AssignmentTurnedInIcon className="text-green-500" /> Round 1: <span>Online Exam</span>
          </p>
          <div className="pl-6 mt-1 space-y-1 text-gray-600">
            <p className="flex items-center gap-1">
              <CalendarTodayIcon className="text-blue-500" /> Date: 15 June 2025
            </p>
            <p className="flex items-center gap-1">
              <ScheduleIcon className="text-purple-500" /> Time: 10:00 AM - 11:00 AM
            </p>
            <p className="flex items-center gap-1">
              <LocationOnIcon className="text-red-500" /> Location: Remote (Google Meet)
            </p>
          </div>
        </div>

        {/* Round 2 */}
        <div>
          <p className="flex items-center gap-1 font-medium text-gray-800">
            <AssignmentTurnedInIcon className="text-blue-600" /> Round 2: <span>Virtual Interview</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;