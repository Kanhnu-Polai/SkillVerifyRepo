import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="p-6 text-center">
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="flex justify-center mb-4"
      >
        <div className="bg-red-100 p-3 rounded-full">
          <AlertTriangle className="text-red-500 w-8 h-8" />
        </div>
      </motion.div>

      {/* Title & Message */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      {message && <p className="text-gray-600 mb-5">{message}</p>}

      {/* Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-sm"
        >
          Yes, Delete
        </button>
        <button
          onClick={onCancel}
          className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all shadow-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}