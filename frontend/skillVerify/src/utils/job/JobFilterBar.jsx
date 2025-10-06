export default function JobFilterBar() {
  return (
    <div className="w-full  bg-white shadow-sm p-1 flex gap-4 items-center  rounded-xl md:fixed md:top-22 z-10">
      {/* Location Filter */}
      <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>Location</option>
        <option>Remote</option>
        <option>Bangalore</option>
        <option>Hyderabad</option>
        <option>Delhi</option>
      </select>

      {/* Experience Filter */}
      <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>Experience</option>
        <option>0-1 years</option>
        <option>1-3 years</option>
        <option>3-5 years</option>
        <option>5+ years</option>
      </select>

      {/* Category Filter */}
      <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>Category</option>
        <option>Software Development</option>
        <option>Design</option>
        <option>Marketing</option>
        <option>Finance</option>
      </select>

      {/* Latest Filter */}
      <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>Sort by</option>
        <option>Latest</option>
        <option>Oldest</option>
        <option>Most Relevant</option>
      </select>

      {/* Job Type Filter */}
      <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option>Job Type</option>
        <option>Full-time</option>
        <option>Part-time</option>
        <option>Contract</option>
        <option>Internship</option>
      </select>

      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer">
        Apply Filters
      </button>
    </div>
  );
}