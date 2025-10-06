import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const AnalysisGraph = () => {
  const shortLabels = [
    'DSML', 'SD', 'AI', 'CS', 'CC', 'BC', 'UIUX', 'DevOps', 'BA', 'PM'
  ];

  const fullLabels = [
    'Data Science and Machine Learning',
    'Software Development',
    'Artificial Intelligence',
    'Cyber Security',
    'Cloud Computing',
    'Blockchain',
    'UI/UX Design',
    'DevOps',
    'Business Analysis',
    'Product Management'
  ];

  const jobCounts = [7, 5, 6, 4, 3, 2, 4, 3, 2, 1];

  // 📦 Handle responsive width
  const [chartWidth, setChartWidth] = useState(900);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setChartWidth(900);
      } else if (width >= 768) {
        setChartWidth(700);
      } else {
        setChartWidth(width - 40); // small screens
      }
    };

    handleResize(); // initialize
    window.addEventListener('resize', handleResize); // listen

    return () => window.removeEventListener('resize', handleResize); // cleanup
  }, []);

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-20 py-6 bg-gradient-to-r from-gray-800 via-blue-700 to-gray-900">
      <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-white">
        Job Trends by Domain
      </h2>

      <div className="bg-white rounded-lg shadow-lg p-4 overflow-auto">
        <BarChart
          xAxis={[
            {
              id: 'job-types',
              data: shortLabels,
              scaleType: 'band',
              label: 'Job Fields',
            },
          ]}
          series={[
            {
              data: jobCounts,
              label: 'Openings',
              color: '#3b82f6',
              valueFormatter: (value, context) => {
                const fullLabel = fullLabels[context.dataIndex];
                return `${fullLabel}: ${value} openings`;
              },
            },
          ]}
          height={400}
          width={chartWidth}
        />
      </div>
    </div>
  );
};

export default AnalysisGraph;