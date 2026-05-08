import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  FolderKanban,
  Users,
  Briefcase,
  Mail,
  CreditCard,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  Target,
  UserPlus,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import apiConfig from "../../config/api";

const fadeIn = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const activityIcons = {
  lead: <Target size={14} className="text-lime-500" />,
  service_request: <Briefcase size={14} className="text-orange-500" />,
  contact: <Mail size={14} className="text-blue-500" />,
  user: <UserPlus size={14} className="text-purple-500" />,
};

const AdminDashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState("");
  const [togglingMaintenance, setTogglingMaintenance] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    fetchSettings();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, activitiesRes] = await Promise.all([
        fetch(apiConfig.getEndpoint("/api/v1/dashboard/stats"), { credentials: "include" }),
        fetch(apiConfig.getEndpoint("/api/v1/dashboard/activities?limit=8"), { credentials: "include" }),
      ]);
      const statsData = await statsRes.json();
      const activitiesData = await activitiesRes.json();
      if (statsData.success) setStats(statsData.data);
      if (activitiesData.success) setActivities(activitiesData.data);
    } catch {
      toast.error("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(apiConfig.getEndpoint("/api/v1/settings"), { credentials: "include" });
      const data = await res.json();
      if (data.success) {
        setMaintenanceMode(data.data.maintenanceMode);
        setMaintenanceMessage(data.data.maintenanceMessage || "");
      }
    } catch {
      console.error("Failed to fetch settings");
    }
  };

  const toggleMaintenance = async () => {
    setTogglingMaintenance(true);
    try {
      const res = await fetch(apiConfig.getEndpoint("/api/v1/settings/maintenance"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ maintenanceMode: !maintenanceMode }),
      });
      const data = await res.json();
      if (data.success) {
        setMaintenanceMode(data.data.maintenanceMode);
        toast.success(`Maintenance mode ${data.data.maintenanceMode ? "enabled" : "disabled"}`);
      } else {
        toast.error(data.message || "Failed to toggle maintenance mode");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setTogglingMaintenance(false);
    }
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-neutral-500">
        <Loader2 size={28} className="animate-spin mr-2" /> Loading dashboard...
      </div>
    );
  }

  const statCards = [
    { label: "Projects", value: stats?.overview?.projects || 0, icon: <FolderKanban size={18} />, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", path: "/admin/projects" },
    { label: "Users", value: stats?.overview?.users || 0, icon: <Users size={18} />, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", path: "/admin/users" },
    { label: "Leads", value: stats?.overview?.leads || 0, icon: <Target size={18} />, color: "text-lime-400", bg: "bg-lime-500/10 border-lime-500/20", path: "/admin/leads" },
    { label: "Requests", value: stats?.overview?.serviceRequests || 0, icon: <Briefcase size={18} />, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", path: "/admin/requests" },
    { label: "Contacts", value: stats?.overview?.contacts || 0, icon: <Mail size={18} />, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", path: "/admin/contact" },
    { label: "New Leads (This Month)", value: stats?.overview?.newLeadsThisMonth || 0, icon: <TrendingUp size={18} />, color: "text-green-400", bg: "bg-green-500/10 border-green-500/20", path: "/admin/leads" },
  ];

  const requestStatus = stats?.requestStatus || {};

  return (
    <div className="space-y-6">
      {/* Welcome + Maintenance Toggle */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Admin <span className="text-lime-500">Dashboard</span>
            </h1>
            <p className="text-neutral-400">Overview of everything happening at Qode.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${maintenanceMode ? "text-orange-400" : "text-lime-400"}`}>
              {maintenanceMode ? "Maintenance Mode ON" : "Maintenance Mode OFF"}
            </span>
            <button
              onClick={toggleMaintenance}
              disabled={togglingMaintenance}
              className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all ${maintenanceMode
                  ? "bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                  : "bg-lime-500/10 border border-lime-500/30 text-lime-400 hover:bg-lime-500/20"
                }`}
            >
              {togglingMaintenance ? <Loader2 size={14} className="animate-spin" /> : maintenanceMode ? <ShieldAlert size={14} /> : <ShieldCheck size={14} />}
              {maintenanceMode ? "Disable" : "Enable"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            to={stat.path}
            className={`rounded-2xl border p-5 hover:border-neutral-600 transition-colors ${stat.bg}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <ChevronRight size={14} className="text-neutral-600" />
            </div>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-neutral-500 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Request Status + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Request Breakdown */}
        <div className="lg:col-span-2 bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-5">Request Status</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Pending", value: requestStatus.pending || 0, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
              { label: "In Progress", value: requestStatus["in-progress"] || 0, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
              { label: "Completed", value: requestStatus.completed || 0, color: "text-lime-400", bg: "bg-lime-500/10 border-lime-500/20" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl border p-4 ${s.bg} text-center`}>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
          <Link to="/admin/requests" className="inline-flex items-center text-xs text-lime-500 hover:underline">
            View all requests <ChevronRight size={14} />
          </Link>
        </div>

        {/* Activity Feed */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {activities.length === 0 ? (
              <p className="text-sm text-neutral-500 text-center py-4">No recent activity</p>
            ) : (
              activities.slice(0, 6).map((a) => (
                <div key={`${a.type}-${a.id}`} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                    {activityIcons[a.type] || <FileText size={14} className="text-neutral-400" />}
                  </div>
                  <div>
                    <p className="text-sm text-neutral-300 leading-snug">{a.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5">{a.subtitle}</p>
                    <p className="text-[10px] text-neutral-600 mt-0.5">{formatTimeAgo(a.date)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Lead Status Overview */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold">Lead Pipeline</h2>
          <Link to="/admin/leads" className="text-xs text-lime-500 hover:underline flex items-center gap-1">
            All leads <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
          {[
            { label: "New", key: "new", color: "text-lime-400", bg: "bg-lime-500/10" },
            { label: "Contacted", key: "contacted", color: "text-blue-400", bg: "bg-blue-500/10" },
            { label: "Qualified", key: "qualified", color: "text-purple-400", bg: "bg-purple-500/10" },
            { label: "Proposal", key: "proposal", color: "text-orange-400", bg: "bg-orange-500/10" },
            { label: "Negotiation", key: "negotiation", color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { label: "Converted", key: "converted", color: "text-green-400", bg: "bg-green-500/10" },
            { label: "Lost", key: "lost", color: "text-red-400", bg: "bg-red-500/10" },
          ].map((s) => (
            <div key={s.key} className={`rounded-xl border p-3 ${s.bg} text-center`}>
              <p className={`text-lg font-bold ${s.color}`}>{stats?.leadStatus?.[s.key] || 0}</p>
              <p className="text-[9px] text-neutral-500 mt-1 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
