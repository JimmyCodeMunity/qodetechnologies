import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
import { Wrench, Clock, Mail, RefreshCw } from "lucide-react";
import apiConfig from "../config/api";

const MaintenancePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "Site is under maintenance. We'll be back soon.";

  useEffect(() => {
    // Check every 10 seconds if maintenance is disabled
    const checkMaintenance = async () => {
      try {
        const res = await fetch(apiConfig.getEndpoint("/api/v1/settings"));
        const data = await res.json();
        if (data.success && !data.data.maintenanceMode) {
          // Maintenance disabled, redirect to home
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Maintenance check failed:", error);
      }
    };

    const interval = setInterval(checkMaintenance, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-lime-500/10 border border-lime-500/20 flex items-center justify-center"
          >
            <Wrench size={32} className="text-lime-500" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-3">Under Maintenance</h1>
          <p className="text-neutral-400 mb-6">{message}</p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center gap-3 text-sm text-neutral-500">
              <Clock size={16} />
              <span>We're working hard to improve your experience</span>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            className="w-full py-3 rounded-xl bg-lime-500 text-black font-semibold hover:bg-lime-600 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Refresh Page
          </button>

          <div className="mt-6 pt-6 border-t border-neutral-800">
            <p className="text-xs text-neutral-500 mb-3">Need immediate assistance?</p>
            <a
              href="mailto:info@qodetechnologies.com"
              className="inline-flex items-center gap-2 text-sm text-lime-500 hover:text-lime-400 transition-colors"
            >
              <Mail size={16} />
              Contact Support
            </a>
          </div>
        </motion.div>

        <p className="text-center text-neutral-600 text-xs mt-6">
          © {new Date().getFullYear()} Qode Technologies
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
