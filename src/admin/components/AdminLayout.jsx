import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  FolderKanban,
  Mail,
  CreditCard,
  Settings,
  Bell,
  Search,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { adminUser } from "../data/dummyData";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/dashboard" },
  { id: "projects", label: "Projects", icon: <FolderKanban size={18} />, path: "/admin/projects" },
  { id: "users", label: "Users", icon: <Users size={18} />, path: "/admin/users" },
  { id: "requests", label: "Requests", icon: <Briefcase size={18} />, path: "/admin/requests" },
  { id: "communications", label: "Communications", icon: <MessageSquare size={18} />, path: "/admin/communications" },
  { id: "subscriptions", label: "Subscriptions", icon: <CreditCard size={18} />, path: "/admin/subscriptions" },
  { id: "contact", label: "Contact Forms", icon: <Mail size={18} />, path: "/admin/contact" },
  { id: "profile", label: "Profile", icon: <Settings size={18} />, path: "/admin/profile" },
];

const AdminNavbar = () => {
  const [search, setSearch] = useState("");
  const location = useLocation();
  const isLogin = location.pathname === "/admin/login";
  if (isLogin) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 shrink-0">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-lime-500 flex items-center justify-center">
              <span className="text-black font-black text-sm">Q</span>
            </div>
          </Link>
          <div className="h-5 w-px bg-neutral-800" />
          <Link to="/admin/dashboard" className="text-sm font-semibold text-white hover:text-lime-500 transition-colors">
            Admin
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, users, requests..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl py-2 pl-9 pr-4 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-lime-500/50 focus:ring-1 focus:ring-lime-500/20 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button className="relative w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all">
            <Bell size={16} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-lime-500" />
          </button>
          <Link
            to="/admin/profile"
            className="w-9 h-9 rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 block"
          >
            <img src={adminUser.avatar} alt="Admin" className="w-full h-full" />
          </Link>
        </div>
      </div>
    </header>
  );
};

const AdminSidebar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLogin = location.pathname === "/admin/login";
  if (isLogin) return null;

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full bg-lime-500 text-black flex items-center justify-center shadow-lg"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 shrink-0 bg-neutral-950 border-r border-neutral-800 z-40 transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="p-4 h-full flex flex-col overflow-y-auto">
          {/* Admin mini profile */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-800">
            <img src={adminUser.avatar} alt={adminUser.name} className="w-10 h-10 rounded-xl bg-neutral-800" />
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{adminUser.name}</p>
              <p className="text-xs text-lime-500 truncate">{adminUser.role}</p>
            </div>
          </div>

          <nav className="space-y-1 flex-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-lime-500/10 text-lime-500 border border-lime-500/20"
                    : "text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent"
                    }`}
                >
                  {item.icon}
                  {item.label}
                  {isActive && <ChevronRight size={14} className="ml-auto" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-4 border-t border-neutral-800">
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-400 hover:text-white hover:bg-neutral-900 transition-all"
            >
              <LogOut size={18} /> Back to Site
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === "/admin/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <AdminNavbar />
      <div className="max-w-[1440px] mx-auto flex">
        <AdminSidebar />
        <main className="flex-1 min-w-0 lg:ml-0 pt-20 pb-12 px-4 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
