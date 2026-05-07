import React from "react";
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
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { projects, users, serviceRequests, contacts, subscriptions, messages, activityLog } from "../data/dummyData";

const fadeIn = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const statCards = [
  { label: "Projects", value: projects.length, icon: <FolderKanban size={18} />, color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20", path: "/admin/projects" },
  { label: "Users", value: users.length, icon: <Users size={18} />, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20", path: "/admin/users" },
  { label: "Requests", value: serviceRequests.length, icon: <Briefcase size={18} />, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20", path: "/admin/requests" },
  { label: "Contacts", value: contacts.length, icon: <Mail size={18} />, color: "text-lime-400", bg: "bg-lime-500/10 border-lime-500/20", path: "/admin/contact" },
  { label: "Subscriptions", value: subscriptions.filter((s) => s.status === "active").length, icon: <CreditCard size={18} />, color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20", path: "/admin/subscriptions" },
  { label: "Messages", value: messages.filter((m) => !m.replied).length, icon: <MessageSquare size={18} />, color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20", path: "/admin/communications" },
];

const AdminDashboardPage = () => {
  const pendingReqs = serviceRequests.filter((r) => r.status === "pending").length;
  const inProgressReqs = serviceRequests.filter((r) => r.status === "in-progress").length;
  const completedReqs = serviceRequests.filter((r) => r.status === "completed").length;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Admin <span className="text-lime-500">Dashboard</span>
        </h1>
        <p className="text-neutral-400">Overview of everything happening at Qode.</p>
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
          <h2 className="text-lg font-bold mb-5">Request Overview</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Pending", value: pendingReqs, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
              { label: "In Progress", value: inProgressReqs, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
              { label: "Completed", value: completedReqs, color: "text-lime-400", bg: "bg-lime-500/10 border-lime-500/20" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl border p-4 ${s.bg} text-center`}>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {serviceRequests.slice(0, 3).map((req) => (
              <div key={req.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/50">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{req.service}</p>
                  <p className="text-xs text-neutral-500">{req.client} &middot; {req.type}</p>
                </div>
                <span className={`text-[10px] font-medium px-2 py-1 rounded-full border ${
                  req.status === "completed" ? "bg-lime-500/10 text-lime-400 border-lime-500/20" :
                  req.status === "in-progress" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                  "bg-orange-500/10 text-orange-400 border-orange-500/20"
                }`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
          <Link to="/admin/requests" className="mt-4 inline-flex items-center text-xs text-lime-500 hover:underline">
            View all requests <ChevronRight size={14} />
          </Link>
        </div>

        {/* Activity Feed */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {activityLog.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                  {a.icon === "Mail" && <Mail size={14} className="text-lime-500" />}
                  {a.icon === "Zap" && <TrendingUp size={14} className="text-blue-500" />}
                  {a.icon === "UserPlus" && <Users size={14} className="text-purple-500" />}
                  {a.icon === "MessageSquare" && <MessageSquare size={14} className="text-orange-500" />}
                  {a.icon === "CheckCircle2" && <CheckCircle2 size={14} className="text-lime-500" />}
                  {a.icon === "FolderPlus" && <FolderKanban size={14} className="text-cyan-500" />}
                </div>
                <div>
                  <p className="text-sm text-neutral-300 leading-snug">{a.text}</p>
                  <p className="text-xs text-neutral-600 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Unread Messages Preview */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold">Unread Messages</h2>
          <Link to="/admin/communications" className="text-xs text-lime-500 hover:underline flex items-center gap-1">
            All messages <ChevronRight size={14} />
          </Link>
        </div>
        <div className="space-y-3">
          {messages.filter((m) => !m.replied).map((m) => (
            <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/50 hover:border-neutral-700 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-2 h-2 rounded-full shrink-0 ${m.channel === "whatsapp" ? "bg-lime-500" : "bg-blue-500"}`} />
                <div>
                  <p className="text-sm font-medium">{m.client || "Guest"}</p>
                  <p className="text-xs text-neutral-500 truncate max-w-[200px] sm:max-w-sm">{m.message}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] text-neutral-600">{m.date}</span>
                {!m.read && <span className="ml-2 w-2 h-2 inline-block rounded-full bg-lime-500" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
