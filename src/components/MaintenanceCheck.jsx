import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import apiConfig from "../config/api";

// Check if user is logged in (has token)
const isLoggedIn = () => {
  return !!localStorage.getItem("token") || document.cookie.includes("token=");
};

const MaintenanceCheck = ({ children }) => {
  const [isMaintenance, setIsMaintenance] = useState(null);
  const [maintenanceMessage, setMaintenanceMessage] = useState("");

  useEffect(() => {
    // Skip maintenance check entirely if user is logged in (admin)
    if (isLoggedIn()) {
      setIsMaintenance(false);
      return;
    }

    const checkMaintenance = async () => {
      try {
        const res = await fetch(apiConfig.getEndpoint("/api/v1/settings"));
        const data = await res.json();
        console.log("Maintenance check response:", data);
        if (data.success) {
          setIsMaintenance(data.data.maintenanceMode);
          setMaintenanceMessage(data.data.maintenanceMessage || "");
        } else {
          setIsMaintenance(false);
        }
      } catch (error) {
        console.error("Maintenance check failed:", error);
        setIsMaintenance(false);
      }
    };

    checkMaintenance();
    const interval = setInterval(checkMaintenance, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isMaintenance === null) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-lime-500" />
      </div>
    );
  }

  if (isMaintenance) {
    return <Navigate to="/maintenance" state={{ message: maintenanceMessage }} replace />;
  }

  return <>{children}</>;
};

export default MaintenanceCheck;
