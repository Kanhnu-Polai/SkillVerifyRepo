import React, {
  useRef,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Camera, UploadCloud, RefreshCcw } from "lucide-react";
import { initiateExam } from "../apiManager/examService";

const CandidatePhotoCapture = forwardRef(({ examInfo, onExamInitiated }, ref) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch (error) {
      console.error("Camera access denied:", error);
      alert("Unable to access camera. Please allow camera permission.");
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) stream.getTracks().forEach((t) => t.stop());
    setCameraOn(false);
  };

  // Expose stopCamera to parent
  useImperativeHandle(ref, () => ({
    stopCamera,
  }));

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setPhoto(imageData);
    stopCamera();
  };

  const retakePhoto = () => {
    setPhoto(null);
    startCamera();
  };

  const uploadAndInitiateExam = async () => {
    if (!photo) return alert("Please capture a photo first.");
    if (!examInfo?.userId || !examInfo?.applicationId || !examInfo?.examDetailId)
      return alert("Missing required exam details!");

    setLoading(true);
    try {
      const blob = await fetch(photo).then((res) => res.blob());
      const file = new File([blob], `${examInfo.userId}_photo.png`, {
        type: "image/png",
      });

      // ✅ Call the initiateExam service (multipart)
      const response = await initiateExam(examInfo, file);

      alert("✅ Exam Initiated Successfully!");
      if (onExamInitiated) onExamInitiated(response);
    } catch (error) {
      console.error("❌ Error during exam initiation:", error);
      alert("Error initiating exam.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => stopCamera(); // stop camera on unmount
  }, []);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 w-full max-w-md mx-auto text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Candidate Photo Verification
      </h2>
     

      <div className="relative bg-gray-100 rounded-xl overflow-hidden border border-gray-300 h-64 flex justify-center items-center">
        {!photo ? (
          <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
        ) : (
          <img src={photo} alt="Captured" className="w-full h-full object-cover" />
        )}
      </div>

      <canvas ref={canvasRef} hidden></canvas>

      <div className="mt-5 flex flex-col space-y-3">
        {!cameraOn && !photo && (
          <button
            onClick={startCamera}
            className="flex justify-center items-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            <Camera className="w-5 h-5 mr-2" /> Start Camera
          </button>
        )}

        {cameraOn && (
          <button
            onClick={capturePhoto}
            className="flex justify-center items-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Capture Photo
          </button>
        )}

        {photo && (
          <>
            <button
              onClick={uploadAndInitiateExam}
              disabled={loading}
              className="flex justify-center items-center bg-amber-600 text-white py-2 px-4 rounded-md hover:bg-amber-700 transition disabled:opacity-50"
            >
              <UploadCloud className="w-5 h-5 mr-2" />
              {loading ? "Processing..." : "Upload & Initiate Exam"}
            </button>
            <button
              onClick={retakePhoto}
              className="flex justify-center items-center bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
            >
              <RefreshCcw className="w-5 h-5 mr-2" /> Retake Photo
            </button>
          </>
        )}
      </div>
    </div>
  );
});

export default CandidatePhotoCapture;