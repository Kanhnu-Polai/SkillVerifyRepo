import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const PrimaryCameraPreview = ({ userId = 1 }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null); // useRef for stable interval id
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const API_URL = "http://localhost:9096/api/v1/proctoring/upload"; // change to your backend

  // Start camera and return the stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
        console.log("🎥 Camera started successfully!");
      }
      return stream;
    } catch (error) {
      console.error("❌ Error accessing camera:", error);
      alert("Camera permission denied. Please allow camera access.");
      return null;
    }
  };

  // Stop camera safely
  const stopCamera = () => {
    const videoEl = videoRef.current;
    if (!videoEl) {
      console.warn("⚠️ stopCamera called but video element not available.");
      setIsStreaming(false);
      return;
    }
    const stream = videoEl.srcObject;
    if (stream && typeof stream.getTracks === "function") {
      stream.getTracks().forEach((track) => track.stop());
      console.log("🛑 Camera tracks stopped.");
    }
    videoEl.srcObject = null;
    setIsStreaming(false);
  };

  // Capture one frame and optionally send to backend
  const captureAndSendFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // prevent capturing if video has no dimensions yet
    if (!video.videoWidth || !video.videoHeight) {
      // try again next interval
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      async (blob) => {
        if (!blob) return;

        // Build form data
        const formData = new FormData();
        formData.append("file", blob, `${userId}_frame_${Date.now()}.jpg`);
        formData.append("userId", userId);

        try {
          // Uncomment to actually send frames to backend
          // await axios.post(API_URL, formData, {
          //   headers: { "Content-Type": "multipart/form-data" },
          // });
          console.log("📸 Frame captured (not sent):", `${userId}_frame_${Date.now()}.jpg`);
        } catch (err) {
          console.error("❌ Error sending frame:", err);
        }
      },
      "image/jpeg",
      0.7
    );
  };

  // Start continuous capture (every 2s)
  const startContinuousCapture = () => {
    if (intervalRef.current) {
      console.warn("⚠️ Already capturing.");
      return;
    }
    // capture immediately then every 2s
    captureAndSendFrame();
    intervalRef.current = setInterval(captureAndSendFrame, 2000);
    setIsMonitoring(true);
    console.log("⏱️ Continuous capture started (every 2s).");
  };

  // Stop continuous capture
  const stopContinuousCapture = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsMonitoring(false);
      console.log("🛑 Continuous capture stopped.");
    }
  };

  // Single button handler: toggles camera + monitoring
  const handleToggleAllow = async () => {
    if (!isStreaming) {
      // start camera and monitoring
      const stream = await startCamera();
      if (stream) {
        // small delay may help video dimensions be available
        setTimeout(() => {
          startContinuousCapture();
        }, 300);
      }
    } else {
      // stop monitoring and camera
      stopContinuousCapture();
      stopCamera();
    }
  };

  // Ensure cleanup on unmount
  useEffect(() => {
    return () => {
      stopContinuousCapture();
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 bg-white rounded-xl shadow-md text-center w-full max-w-md mx-auto">
     
      <div className="border rounded-lg overflow-hidden bg-gray-100 mb-3">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-64 object-cover"
        />
      </div>

      {/* hidden canvas for capturing frames */}
      <canvas ref={canvasRef} hidden />

      <div className="flex justify-center gap-3 mt-3">
        <button
          onClick={handleToggleAllow}
          className={`px-4 py-2 rounded text-white transition ${
            !isStreaming
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {!isStreaming ? "Allow Camera" : "Monitoring..."}
        </button>
      </div>

      
    </div>
  );
};

export default PrimaryCameraPreview;