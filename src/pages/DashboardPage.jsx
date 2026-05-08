import React, { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  UserCircle,
  Settings,
  Bell,
  Search,
  Code2,
  Smartphone,
  Bot,
  Globe,
  Palette,
  Cloud,
  CheckCircle2,
  Clock,
  Loader2,
  ArrowUpRight,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Shield,
  Zap,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useUserAuth } from "../context/UserAuthContext";
import { toast } from "sonner";
const DashboardNavbar = ({ user, onLogout }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo + Dashboard label */}
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/" className="flex justify-center lg:justify-start">
            <img src="/images/logo.png" className="w-24" alt="Qode Logo" />
          </Link>
          <div className="h-5 w-px bg-neutral-800" />
          <Link to="/dashboard" className="text-sm font-semibold text-white hover:text-lime-500 transition-colors">
            Dashboard
          </Link>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services, docs..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-lime-500/50 focus:ring-1 focus:ring-lime-500/20 transition-all"
            />
          </div>
        </div>

        {/* Right: Actions + Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/services"
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all"
          >
            <ArrowUpRight size={14} /> New Request
          </Link>
          <button className="relative w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all">
            <Bell size={16} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-lime-500" />
          </button>
          <Link to="/dashboard" className="w-9 h-9 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 block">
            <img src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=user&backgroundColor=b6e3f4"} alt="Profile" className="w-full h-full" />
          </Link>
          <button
            onClick={() => { onLogout(); navigate("/"); }}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-red-400 hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-all"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "services", label: "My Services", icon: <Briefcase size={18} /> },
  { id: "account", label: "Account", icon: <UserCircle size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

const services = [
  {
    id: 1,
    name: "E-Commerce Platform",
    type: "Web Development",
    icon: <Globe size={16} />,
    status: "In Progress",
    statusColor: "text-blue-400",
    statusBg: "bg-blue-500/10 border-blue-500/20",
    statusIcon: <Loader2 size={14} className="animate-spin" />,
    date: "Mar 10, 2026",
    description: "Full-stack Next.js storefront with Stripe payments and admin dashboard.",
  },
  {
    id: 2,
    name: "Inventory Management App",
    type: "Mobile Development",
    icon: <Smartphone size={16} />,
    status: "Completed",
    statusColor: "text-lime-400",
    statusBg: "bg-lime-500/10 border-lime-500/20",
    statusIcon: <CheckCircle2 size={14} />,
    date: "Feb 28, 2026",
    description: "React Native app with real-time sync, barcode scanning, and push notifications.",
  },
  {
    id: 3,
    name: "Customer Support Bot",
    type: "AI & Automation",
    icon: <Bot size={16} />,
    status: "Pending",
    statusColor: "text-orange-400",
    statusBg: "bg-orange-500/10 border-orange-500/20",
    statusIcon: <Clock size={14} />,
    date: "Apr 02, 2026",
    description: "LLM-powered chatbot with RAG, integrated into existing WhatsApp & web channels.",
  },
  {
    id: 4,
    name: "Brand Identity System",
    type: "UI / UX Design",
    icon: <Palette size={16} />,
    status: "In Progress",
    statusColor: "text-blue-400",
    statusBg: "bg-blue-500/10 border-blue-500/20",
    statusIcon: <Loader2 size={14} className="animate-spin" />,
    date: "Mar 25, 2026",
    description: "Complete design system, logo kit, and component library in Figma.",
  },
  {
    id: 5,
    name: "Cloud Migration",
    type: "DevOps",
    icon: <Cloud size={16} />,
    status: "Completed",
    statusColor: "text-lime-400",
    statusBg: "bg-lime-500/10 border-lime-500/20",
    statusIcon: <CheckCircle2 size={14} />,
    date: "Jan 20, 2026",
    description: "Migrated legacy infrastructure to AWS with CI/CD pipelines and monitoring.",
  },
];

const activity = [
  { id: 1, text: "E-Commerce Platform milestone delivered", time: "2 hours ago", icon: <Zap size={14} className="text-lime-500" /> },
  { id: 2, text: "New support ticket created", time: "5 hours ago", icon: <Bell size={14} className="text-orange-500" /> },
  { id: 3, text: "Invoice #1042 paid successfully", time: "1 day ago", icon: <CheckCircle2 size={14} className="text-lime-500" /> },
  { id: 4, text: "Cloud Migration project archived", time: "3 days ago", icon: <Shield size={14} className="text-blue-500" /> },
];

const fadeIn = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const DashboardPage = () => {
  const { user, logout, loading } = useUserAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (loading || !user) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-lime-500" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully.");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab user={user} />;
      case "services":
        return <ServicesTab />;
      case "account":
        return <AccountTab user={user} />;
      case "settings":
        return <SettingsTab />;
      default:
        return <DashboardTab user={user} />;
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <DashboardNavbar user={user} onLogout={handleLogout} />

      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 sticky top-28">
              {/* User mini profile */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
                <img src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=user&backgroundColor=b6e3f4"} alt={user.firstName || "User"} className="w-10 h-10 rounded-full bg-neutral-800" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{`${user.firstName || ""} ${user.lastName || ""}`.trim() || "User"}</p>
                  <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === item.id
                      ? "bg-lime-500/10 text-lime-500 border border-lime-500/20"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent"
                      }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-4 border-t border-neutral-800">
                <Link
                  to="/services"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-400 hover:text-lime-500 transition-colors"
                >
                  <ArrowUpRight size={16} /> Request New Service
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <motion.div key={activeTab} variants={fadeIn} initial="hidden" animate="visible">
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};

/* ---------- Dashboard Tab ---------- */
const DashboardTab = ({ user }) => {
  const inProgress = services.filter((s) => s.status === "In Progress").length;
  const completed = services.filter((s) => s.status === "Completed").length;
  const pending = services.filter((s) => s.status === "Pending").length;
  const firstName = user?.firstName || user?.name?.split(" ")[0] || "User";

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome back, <span className="text-lime-500">{firstName}</span>
        </h1>
        <p className="text-neutral-400">Here is what is happening with your projects today.</p>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "In Progress", value: inProgress, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
          { label: "Completed", value: completed, color: "text-lime-400", bg: "bg-lime-500/10 border-lime-500/20" },
          { label: "Pending", value: pending, color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
        ].map((stat) => (
          <div key={stat.label} className={`rounded-2xl border p-4 ${stat.bg}`}>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-neutral-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Services list */}
        <div className="lg:col-span-2 bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">My Services</h2>
            <button onClick={() => { }} className="text-xs text-lime-500 hover:underline flex items-center gap-1">
              View All <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {services.slice(0, 3).map((s) => (
              <div key={s.id} className="flex items-start gap-4 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/50 hover:border-neutral-700 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-semibold truncate">{s.name}</p>
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full border ${s.statusBg} ${s.statusColor}`}>
                      {s.statusIcon} {s.status}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 truncate">{s.description}</p>
                  <p className="text-[10px] text-neutral-600 mt-1.5">{s.type} &middot; {s.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {activity.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center shrink-0">
                  {a.icon}
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
    </div>
  );
};

/* ---------- Services Tab ---------- */
const ServicesTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold mb-2">All Services</h2>
        <p className="text-neutral-400 text-sm mb-6">Track the status of every service you have requested from Qode.</p>

        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl bg-neutral-900/50 border border-neutral-800/50 hover:border-neutral-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold">{s.name}</p>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${s.statusBg} ${s.statusColor}`}>
                    {s.statusIcon} {s.status}
                  </span>
                </div>
                <p className="text-sm text-neutral-500">{s.description}</p>
                <p className="text-xs text-neutral-600 mt-1">{s.type} &middot; Requested {s.date}</p>
              </div>
              <div className="shrink-0">
                <button className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-1">
                  Details <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- Account Tab ---------- */
const AccountTab = ({ user }) => {
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User";
  const joinedDate = user.joined ? new Date(user.joined).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A";
  const { logout } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully.");
    navigate("/");
  };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <img src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=user&backgroundColor=b6e3f4"} alt={fullName} className="w-20 h-20 rounded-2xl bg-neutral-800 border border-neutral-700" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{fullName}</h2>
            <p className="text-neutral-500 text-sm mb-1">{user.email}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-lime-500/10 text-lime-400 border border-lime-500/20">
              <Shield size={12} /> {user.role === "premium" ? "Premium Client" : "Client"}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-neutral-800">
          {[
            { label: "Email", value: user.email || "N/A", icon: <Mail size={16} className="text-neutral-500" /> },
            { label: "Phone", value: user.phone || "N/A", icon: <Phone size={16} className="text-neutral-500" /> },
            { label: "Member Since", value: joinedDate, icon: <Calendar size={16} className="text-neutral-500" /> },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/50">
              <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-neutral-500">{item.label}</p>
                <p className="text-sm font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-neutral-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------- Settings Tab ---------- */
const SettingsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold mb-6">Preferences</h2>
        <div className="space-y-4">
          {[
            { label: "Email Notifications", desc: "Receive updates about your projects and invoices", active: true },
            { label: "SMS Alerts", desc: "Get text alerts for urgent project updates", active: false },
            { label: "Marketing Emails", desc: "Newsletters, tips, and product announcements", active: true },
            { label: "Two-Factor Authentication", desc: "Add an extra layer of security to your account", active: false },
          ].map((setting) => (
            <div key={setting.label} className="flex items-center justify-between p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/50">
              <div>
                <p className="text-sm font-medium">{setting.label}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{setting.desc}</p>
              </div>
              <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${setting.active ? "bg-lime-500" : "bg-neutral-700"}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${setting.active ? "left-5" : "left-0.5"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
