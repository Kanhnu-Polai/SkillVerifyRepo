// src/components/jobs/JobCard.jsx
import React from "react";
import { MapPin, Clock, Building2 } from "lucide-react";

const JobCard = ({
  title,
  company,
  location,
  type,
  posted,
  logo,
  skills,
}) => (
  <article
    className="relative flex flex-col gap-4 bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition"
  >
    {/* company logo */}
    <div className="absolute -top-6 left-6">
      <img
        src={logo}
        alt={`${company} logo`}
        className="w-12 h-12 rounded-lg ring-2 ring-white shadow-md object-contain bg-white"
      />
    </div>

    <header className="mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 flex items-center gap-1">
        <Building2 size={16} /> {company}
      </p>
    </header>

    <ul className="flex flex-wrap gap-2 text-xs font-medium">
      {skills.map((skill) => (
        <li
          key={skill}
          className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
        >
          {skill}
        </li>
      ))}
    </ul>

    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
      <span className="flex items-center gap-1">
        <MapPin size={16} /> {location}
      </span>
      <span className="flex items-center gap-1">
        <Clock size={16} /> {type}
      </span>
      <span className="flex items-center gap-1">
        <Clock size={16} /> {posted}
      </span>
    </div>

    <button className="mt-4 self-start px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
      View &nbsp;↗
    </button>
  </article>
);

export default JobCard;