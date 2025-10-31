import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeModal({ children, onClose }) {
  return (
    <AnimatePresence>
      <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md">
        {/* Overlay */}
        <div
          className="absolute inset-0 cursor-pointer  "
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative z-10 bg-gradient-to-br from-white via-gray-50 to-blue-50
                     border border-gray-200 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)]
                     w-[90%] sm:w-[70%] md:w-[55%] lg:w-[45%] max-h-[90vh]
                     flex flex-col overflow-hidden "
        >
          {/* Header */}
          

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-5 bg-white">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}