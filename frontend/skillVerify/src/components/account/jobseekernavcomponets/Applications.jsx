// components/account/profileNavComponent/Applications.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ApplicationCard from './ApplicationCard';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
   const {userData} = useSelector((state)=>state.userData)
   const userEmail = userData.email

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8088/api/applications/by-user/${userEmail}`
        );
        setApplications(response.data.body || []);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className=' md:w-[1000px] w-fit '>
      

      {loading ? (
        <div className="flex items-center gap-2 text-blue-600">
          <Loader2 className="animate-spin" />
          <span>Loading applications...</span>
        </div>
      ) : applications.length === 0 ? (
        <p className="text-gray-500">You haven’t applied to any jobs yet.</p>
      ) : (
        <div className="grid  gap-5">
          {applications.map((job, index) => {
            const interview = {
              round1: job.round1Required
                ? {
                    title: 'Online Exam',
                    date: '18 July 2025',
                    time: '10:00 AM - 11:00 AM',
                    location: 'Remote (Google Meet)',
                  }
                : null,
              round2: job.round2Required
                ? {
                    title: 'Technical Interview',
                  }
                : null,
            };

            return (
              <ApplicationCard
              
  applicationId={`APP${String(index + 1).padStart(3, '0')}`}
  companyLogo={job.companyPhotoLink}
  company={job.companyName || 'N/A'}
  position={job.jobTitle || 'N/A'}
  experience={`${job.experience || 0}+ yrs`}
  salary={'₹12 LPA'}
  appliedOn={job.lastDateToApply}
  status={job.status || 'Applied'}
  examTopics={job.examTopics || ['Java', 'DSA', 'Spring Boot']}
  interview={{
    round1: {
      title: 'Online Exam',
      date: '22 July 2025',
      time: '2 Hours',
      location: 'Remote',
    },
    round2: job.round2Required ? { title: 'HR Interview' } : null,
  }}
/>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Applications;