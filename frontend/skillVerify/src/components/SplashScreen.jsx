// src/components/SplashScreen.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide splash screen after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
     ; // Notify parent that loading is done
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 text-white z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="text-5xl font-bold tracking-widest mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
      >
        SkillVerify
      </motion.h1>

      <motion.div
        className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"
        transition={{ repeat: Infinity, duration: 1 }}
      />

      <p className="mt-4 text-lg opacity-80">Building Opportunities...</p>
    </motion.div>
  );
}