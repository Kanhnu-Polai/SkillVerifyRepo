import React from "react";
import QRCode from "react-qr-code";

const MobileQRCode = () => {
  // 🔁 For now, use a constant sessionId
  const sessionId = "9751853d-178e-4486-960f-e366a46baba6";

  // 🌐 This link will open in mobile browser
  const mobileExamUrl = `https://exam.skillverify.com/mobile/${sessionId}`;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">
         Setup Your Mobile Camera
      </h2>


      <div className="flex justify-center mb-4">
        <QRCode value={mobileExamUrl} size={180} />
      </div>

      

      <a
        href={mobileExamUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-sm bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
      >
        Open Mobile View
      </a>
    </div>
  );
};

export default MobileQRCode;