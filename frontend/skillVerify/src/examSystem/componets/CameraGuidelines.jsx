import React from "react";
import { Camera, AlertTriangle, CheckCircle } from "lucide-react";
import PrimaryCameraPreview from "./monitorComponets/PrimaryCameraPreview";
import MobileQRCode from "./monitorComponets/MobileQRCode";

const CameraGuidelines = ({
  setAllowPrimaryCamera,
  allowPrimaryCamera,
  allowMobileCamera,
  setAllowMobileCamera,
}) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 max-w-2xl mx-auto mb-6">
      <div className="flex items-center mb-3">
        <Camera className="text-blue-600 w-6 h-6 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Camera Set up</h2>
      </div>

      <p className="text-gray-600 mb-4">
        Your webcam will be used during the exam to continuously monitor your
        activity using a{" "}
        <span className="font-semibold text-blue-700">primary (laptop)</span>{" "}
        camera and a{" "}
        <span className="font-semibold text-purple-700">
          secondary (mobile)
        </span>{" "}
        camera. Please make sure both cameras are positioned correctly and that
        you follow all the guidelines below for a smooth proctored experience.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Camera Setup */}
        {allowPrimaryCamera ? (
          <PrimaryCameraPreview />
        ) : (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-blue-700 flex items-center mb-2">
                <Camera className="w-5 h-5 mr-2" /> Primary Camera Setup
              </h3>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>Ensure your face is clearly visible at all times.</li>
                <li>Sit in a well-lit environment facing the camera.</li>
                <li>Keep the camera stable — don’t move or cover it.</li>
                <li>Use your laptop’s front camera or an external webcam.</li>
              </ul>
            </div>

            <div>
              <button
                onClick={() => setAllowPrimaryCamera(true)}
                className="rounded-md px-2 py-1 cursor-pointer hover:text-white hover:bg-amber-700 bg-amber-400 font-medium text-sm"
              >
                Allow Camera
              </button>
            </div>
          </div>
        )}

        {/* Exam Rules */}
        {
          allowMobileCamera?<MobileQRCode/>:<div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div>
            <h3 className="font-semibold text-purple-700 flex items-center mb-2">
              <Camera className="w-5 h-5 mr-2" />
              Mobile Camera Setup
            </h3>
            <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>
                Place your{" "}
                <span className="font-semibold text-purple-700">
                  mobile device{" "}
                </span>
                at a distance so that your entire{" "}
                <strong>exam desk, laptop screen, and sitting area</strong> are
                clearly visible.
              </li>
              <li>
                The mobile camera should give a <strong>360° view</strong> of
                your surroundings — including your workspace and background.
              </li>
              <li>
                Use a mobile stand or stable surface; avoid holding the phone in
                hand.
              </li>

              <li>
                Do not move or adjust the mobile camera once the exam begins.
              </li>
            </ul>
            <div className="mt-3">
              <button onClick={()=>setAllowMobileCamera(true)} className="rounded-md px-2 py-1 cursor-pointer hover:text-white hover:bg-amber-700 bg-amber-400 font-medium text-sm">
                Scan Mobile
              </button>
            </div>
          </div>
        </div>
        }
        
      </div>

      {/* Final tips */}
      <div className="mt-5 bg-green-50 p-4 rounded-lg border border-green-100">
        <h3 className="font-semibold text-green-700 flex items-center mb-2">
          <CheckCircle className="w-5 h-5 mr-2" /> Before You Start
        </h3>
        <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
          <li>Ensure your internet connection is stable.</li>
          <li>Close all other tabs and apps before the exam.</li>
          <li>
            Click <strong>“Allow Camera”</strong> below to begin face
            monitoring.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CameraGuidelines;
