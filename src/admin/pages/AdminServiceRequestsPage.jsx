import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  FileText,
  Plus,
  Eye,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle2,
  Archive,
  Trash2,
  Filter,
  Search,
  Loader2,
  User,
  Building,
  Code2,
  Smartphone,
  Bot,
  Palette,
  Cloud,
  Building2,
  Zap,
  TrendingUp,
  BarChart3
} from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import { toast } from "sonner";
import apiConfig, { authFetch } from "../../config/api";

const statusConfig = {
  new: { label: "New", color: "text-lime-400", bg: "bg-lime-500/10", border: "border-lime-500/20", icon: <AlertCircle size={12} /> },
  reviewing: { label: "Reviewing", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: <Eye size={12} /> },
  contacted: { label: "Contacted", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", icon: <Mail size={12} /> },
  quoted: { label: "Quoted", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", icon: <DollarSign size={12} /> },
  in_progress: { label: "In Progress", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", icon: <Clock size={12} /> },
  completed: { label: "Completed", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", icon: <CheckCircle2 size={12} /> },
  cancelled: { label: "Cancelled", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: <Archive size={12} /> }
};

const priorityConfig = {
  low: { color: "text-green-400", bg: "bg-green-500/10" },
  medium: { color: "text-yellow-400", bg: "bg-yellow-500/10" },
  high: { color: "text-orange-400", bg: "bg-orange-500/10" },
  urgent: { color: "text-red-400", bg: "bg-red-500/10" }
};

const serviceIcons = {
  "Web Development": Code2,
  "Mobile Development": Smartphone,
  "AI & Automation": Bot,
  "UI/UX Design": Palette,
  "DevOps": Cloud,
  "Other": Zap
};

const AdminServiceRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState({
    status: "all",
    serviceType: "all",
    priority: "all"
  });
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, id: null, type: "delete" });

  const openConfirmDelete = (id) => {
    setConfirm({ open: true, id, type: "delete" });
  };

  useEffect(() => {
    fetchRequests();
    fetchStats();
  }, [filter]);

  const fetchRequests = async () => {
    try {
      const params = new URLSearchParams();
      if (filter.status !== "all") params.append("status", filter.status);
      if (filter.serviceType !== "all") params.append("serviceType", filter.serviceType);
      if (filter.priority !== "all") params.append("priority", filter.priority);

      const res = await authFetch(apiConfig.getEndpoint(`/api/v1/service-requests?${params}`), {
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setRequests(data.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      if (err.message?.includes("401") || err.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to load service requests. Check console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await authFetch(apiConfig.getEndpoint('/api/v1/service-requests/stats'), {
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch {
      console.error("Failed to fetch stats");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await authFetch(apiConfig.getEndpoint(`/api/v1/service-requests/${id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setRequests(requests.map((r) => (r._id === id ? { ...r, status } : r)));
        toast.success("Status updated successfully.");
        fetchStats(); // Refresh stats
      } else {
        toast.error(data.message || "Failed to update status.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await authFetch(apiConfig.getEndpoint(`/api/v1/service-requests/${confirm.id}`), {
        method: "DELETE",
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setRequests(requests.filter((r) => r._id !== confirm.id));
        if (selected?._id === confirm.id) setSelected(null);
        toast.success("Service request deleted successfully.");
        fetchStats(); // Refresh stats
      } else {
        toast.error(data.message || "Failed to delete.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setConfirm({ open: false, id: null, type: "delete" });
    }
  };

  const filteredRequests = requests.filter((request) => {
    const matchesSearch = search === "" ||
      request.projectTitle.toLowerCase().includes(search.toLowerCase()) ||
      request.fullName.toLowerCase().includes(search.toLowerCase()) ||
      request.email.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-neutral-500">
        <Loader2 size={28} className="animate-spin mr-2" /> Loading service requests...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Service Requests</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search requests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-500/50 w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-400 text-sm">Total Requests</span>
              <BarChart3 size={16} className="text-neutral-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.overview.total}</div>
          </div>
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-400 text-sm">New</span>
              <AlertCircle size={16} className="text-lime-400" />
            </div>
            <div className="text-2xl font-bold text-lime-400">{stats.overview.new}</div>
          </div>
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-400 text-sm">In Progress</span>
              <Clock size={16} className="text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-cyan-400">{stats.overview.inProgress}</div>
          </div>
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-400 text-sm">Completed</span>
              <CheckCircle2 size={16} className="text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-400">{stats.overview.completed}</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-neutral-400" />
          <span className="text-sm text-neutral-400">Filters:</span>
        </div>
        <select
          value={filter.status}
          onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value }))}
          className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-lime-500/50"
        >
          <option value="all">All Status</option>
          {Object.keys(statusConfig).map(status => (
            <option key={status} value={status}>{statusConfig[status].label}</option>
          ))}
        </select>
        <select
          value={filter.serviceType}
          onChange={(e) => setFilter(prev => ({ ...prev, serviceType: e.target.value }))}
          className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-lime-500/50"
        >
          <option value="all">All Services</option>
          {Object.keys(serviceIcons).map(service => (
            <option key={service} value={service}>{service}</option>
          ))}
        </select>
        <select
          value={filter.priority}
          onChange={(e) => setFilter(prev => ({ ...prev, priority: e.target.value }))}
          className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-lime-500/50"
        >
          <option value="all">All Priorities</option>
          {Object.keys(priorityConfig).map(priority => (
            <option key={priority} value={priority}>{priority.charAt(0).toUpperCase() + priority.slice(1)}</option>
          ))}
        </select>
      </div>

      {/* Requests List */}
      <div className="grid gap-4">
        {filteredRequests.map((request, i) => {
          const StatusIcon = statusConfig[request.status]?.icon || <AlertCircle size={12} />;
          const ServiceIcon = serviceIcons[request.serviceType] || Code2;
          const priorityColors = priorityConfig[request.priority] || priorityConfig.medium;

          return (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-all cursor-pointer"
              onClick={() => setSelected(request)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center">
                    <ServiceIcon size={20} className="text-neutral-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{request.projectTitle}</h3>
                    <p className="text-sm text-neutral-400 mb-2">{request.serviceType}</p>
                    <div className="flex items-center gap-4 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <User size={12} />
                        {request.fullName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail size={12} />
                        {request.email}
                      </span>
                      {request.phone && (
                        <span className="flex items-center gap-1">
                          <Phone size={12} />
                          {request.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors.bg} ${priorityColors.color} ${priorityColors.bg.replace('bg-', 'border-')}`}>
                    {request.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${statusConfig[request.status]?.bg} ${statusConfig[request.status]?.color} ${statusConfig[request.status]?.border}`}>
                    {StatusIcon}
                    {statusConfig[request.status]?.label}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openConfirmDelete(request._id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                {request.projectDescription}
              </p>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 mb-3">
                <a
                  href={`mailto:${request.email}?subject=Re: ${request.projectTitle} - Qode Technologies`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-lime-500/10 border border-lime-500/20 text-lime-400 hover:bg-lime-500/20 transition-colors text-xs font-medium"
                >
                  <Mail size={12} />
                  Email
                </a>
                {request.phone && (
                  <a
                    href={`tel:${request.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors text-xs font-medium"
                  >
                    <Phone size={12} />
                    Call
                  </a>
                )}
                {request.status === "new" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateStatus(request._id, "contacted");
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 hover:bg-purple-500/20 transition-colors text-xs font-medium"
                  >
                    <Mail size={12} />
                    Mark Contacted
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(request.submittedAt).toLocaleDateString()}
                  </span>
                  {request.budget && request.budget !== "To be discussed" && (
                    <span className="flex items-center gap-1">
                      <DollarSign size={12} />
                      {request.budget}
                    </span>
                  )}
                  {request.timeline && request.timeline !== "To be discussed" && (
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {request.timeline}
                    </span>
                  )}
                </div>
                {request.company && (
                  <span className="flex items-center gap-1 text-xs text-neutral-500">
                    <Building size={12} />
                    {request.company}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}

        {filteredRequests.length === 0 && (
          <div className="text-center py-12 text-neutral-500">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p>No service requests found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-neutral-950 border-b border-neutral-800 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">{selected.projectTitle}</h2>
                <button
                  onClick={() => setSelected(null)}
                  className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                >
                  <AlertCircle size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Client Information */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <User size={18} className="mr-2 text-lime-500" />
                  Client Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-neutral-900 rounded-lg p-4">
                    <p className="text-sm text-neutral-400 mb-1">Name</p>
                    <p className="text-white font-medium">{selected.fullName}</p>
                  </div>
                  <div className="bg-neutral-900 rounded-lg p-4">
                    <p className="text-sm text-neutral-400 mb-1">Email</p>
                    <p className="text-white font-medium">{selected.email}</p>
                  </div>
                  {selected.phone && (
                    <div className="bg-neutral-900 rounded-lg p-4">
                      <p className="text-sm text-neutral-400 mb-1">Phone</p>
                      <p className="text-white font-medium">{selected.phone}</p>
                    </div>
                  )}
                  {selected.company && (
                    <div className="bg-neutral-900 rounded-lg p-4">
                      <p className="text-sm text-neutral-400 mb-1">Company</p>
                      <p className="text-white font-medium">{selected.company}</p>
                    </div>
                  )}
                </div>

                {/* Quick Contact Actions */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.projectTitle} - Qode Technologies&body=Hi ${selected.firstName || selected.fullName?.split(' ')[0]},%0D%0A%0D%0AThank you for reaching out to us regarding your ${selected.serviceType} project.%0D%0A%0D%0A`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-lime-500/10 border border-lime-500/30 text-lime-400 hover:bg-lime-500/20 transition-colors text-sm font-medium"
                  >
                    <Mail size={16} />
                    Email Client
                  </a>
                  {selected.phone && (
                    <a
                      href={`tel:${selected.phone}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors text-sm font-medium"
                    >
                      <Phone size={16} />
                      Call Client
                    </a>
                  )}
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 text-neutral-400 text-sm">
                    <Clock size={16} />
                    Submitted: {new Date(selected.submittedAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FileText size={18} className="mr-2 text-lime-500" />
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div className="bg-neutral-900 rounded-lg p-4">
                    <p className="text-sm text-neutral-400 mb-2">Service Type</p>
                    <p className="text-white font-medium">{selected.serviceType}</p>
                  </div>
                  <div className="bg-neutral-900 rounded-lg p-4">
                    <p className="text-sm text-neutral-400 mb-2">Project Description</p>
                    <p className="text-white whitespace-pre-wrap">{selected.projectDescription}</p>
                  </div>
                  {selected.technicalRequirements && (
                    <div className="bg-neutral-900 rounded-lg p-4">
                      <p className="text-sm text-neutral-400 mb-2">Technical Requirements</p>
                      <p className="text-white whitespace-pre-wrap">{selected.technicalRequirements}</p>
                    </div>
                  )}
                  {selected.preferredTechnologies && (
                    <div className="bg-neutral-900 rounded-lg p-4">
                      <p className="text-sm text-neutral-400 mb-2">Preferred Technologies</p>
                      <p className="text-white">{selected.preferredTechnologies}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Actions */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Status Management</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(statusConfig).map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selected._id, status)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all flex items-center gap-2 ${selected.status === status
                        ? `${statusConfig[status].bg} ${statusConfig[status].color} ${statusConfig[status].border}`
                        : "border-neutral-700 text-neutral-400 hover:border-neutral-600"
                        }`}
                    >
                      {statusConfig[status].icon}
                      {statusConfig[status].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirm.open}
        title="Delete Service Request"
        message="Are you sure you want to delete this service request? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setConfirm({ open: false, id: null, type: "delete" })}
      />
    </div>
  );
};

export default AdminServiceRequestsPage;
