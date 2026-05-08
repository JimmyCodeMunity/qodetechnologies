import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Users, Mail, Phone, Calendar, DollarSign, Clock,
  X, Pencil, Trash2, Loader2, Search, Filter,
  UserCircle, Briefcase, Target, BarChart3,
  AlertCircle, CheckCircle2, Send, Archive
} from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import { toast } from "sonner";
import apiConfig, { authFetch } from "../../config/api";

const statusConfig = {
  new: { label: "New", color: "text-lime-400", bg: "bg-lime-500/10", border: "border-lime-500/20", icon: <AlertCircle size={12} /> },
  contacted: { label: "Contacted", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: <Send size={12} /> },
  qualified: { label: "Qualified", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", icon: <Target size={12} /> },
  proposal: { label: "Proposal", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", icon: <Briefcase size={12} /> },
  negotiation: { label: "Negotiation", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", icon: <DollarSign size={12} /> },
  converted: { label: "Converted", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", icon: <CheckCircle2 size={12} /> },
  lost: { label: "Lost", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: <Archive size={12} /> },
};

const priorityConfig = {
  Low: { color: "text-green-400", bg: "bg-green-500/10" },
  Medium: { color: "text-yellow-400", bg: "bg-yellow-500/10" },
  High: { color: "text-orange-400", bg: "bg-orange-500/10" },
  Urgent: { color: "text-red-400", bg: "bg-red-500/10" },
};

const AdminLeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selected, setSelected] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [notesForm, setNotesForm] = useState({ status: "", notes: "" });

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, [filterStatus]);

  const fetchLeads = async () => {
    try {
      const params = new URLSearchParams();
      if (filterStatus !== "all") params.append("status", filterStatus);
      if (search) params.append("search", search);
      const res = await authFetch(apiConfig.getEndpoint(`/api/v1/leads?${params}`), { credentials: "include" });
      const data = await res.json();
      if (data.success) setLeads(data.data);
    } catch {
      toast.error("Failed to load leads.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await authFetch(apiConfig.getEndpoint("/api/v1/leads/stats"), { credentials: "include" });
      const data = await res.json();
      if (data.success) setStats(data.data);
    } catch {
      console.error("Failed to fetch lead stats");
    }
  };

  const updateLead = async (id, updates) => {
    try {
      const res = await authFetch(apiConfig.getEndpoint(`/api/v1/leads/${id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.map((l) => (l._id === id ? { ...l, ...data.data } : l)));
        toast.success("Lead updated.");
        fetchStats();
      } else {
        toast.error(data.message || "Failed to update lead.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  const deleteLead = async () => {
    try {
      const res = await authFetch(apiConfig.getEndpoint(`/api/v1/leads/${confirm.id}`), {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setLeads(leads.filter((l) => l._id !== confirm.id));
        if (selected?._id === confirm.id) setSelected(null);
        toast.success("Lead deleted.");
        fetchStats();
      } else {
        toast.error(data.message || "Failed to delete lead.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setConfirm({ open: false, id: null });
    }
  };

  const openDetail = (lead) => {
    setSelected(lead);
    setNotesForm({ status: lead.status, notes: lead.notes || "" });
  };

  const filtered = leads.filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.firstName?.toLowerCase().includes(q) ||
      l.lastName?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.company?.toLowerCase().includes(q) ||
      l.projectTitle?.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-neutral-500">
        <Loader2 size={28} className="animate-spin mr-2" /> Loading leads...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Leads</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-500/50 w-64"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-400 text-sm">Total</span>
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
              <span className="text-neutral-400 text-sm">Converted</span>
              <CheckCircle2 size={16} className="text-green-400" />
            </div>
            <div className="text-2xl font-bold text-green-400">{stats.overview.converted}</div>
          </div>
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-neutral-400 text-sm">Lost</span>
              <Archive size={16} className="text-red-400" />
            </div>
            <div className="text-2xl font-bold text-red-400">{stats.overview.lost}</div>
          </div>
        </div>
      )}

      {/* Status Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={16} className="text-neutral-400" />
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${filterStatus === "all" ? "bg-lime-500/10 text-lime-400 border-lime-500/20" : "bg-neutral-900 text-neutral-400 border-neutral-800"}`}
        >
          All
        </button>
        {Object.keys(statusConfig).map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${filterStatus === s ? `${statusConfig[s].bg} ${statusConfig[s].color} ${statusConfig[s].border}` : "bg-neutral-900 text-neutral-400 border-neutral-800"}`}
          >
            {statusConfig[s].label}
          </button>
        ))}
      </div>

      {/* Leads List */}
      <div className="space-y-3">
        {filtered.map((lead, i) => {
          const s = statusConfig[lead.status] || statusConfig.new;
          const p = priorityConfig[lead.priority] || priorityConfig.Medium;
          return (
            <motion.div
              key={lead._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-neutral-950 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-all cursor-pointer"
              onClick={() => openDetail(lead)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center">
                    <UserCircle size={20} className="text-neutral-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{lead.firstName} {lead.lastName}</h3>
                    <p className="text-sm text-neutral-400">{lead.company || "—"} · {lead.serviceType}</p>
                    <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                      <span className="flex items-center gap-1"><Mail size={12} /> {lead.email}</span>
                      {lead.phone && <span className="flex items-center gap-1"><Phone size={12} /> {lead.phone}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${p.bg} ${p.color} ${p.bg.replace("bg-", "border-")}`}>
                    {lead.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${s.bg} ${s.color} ${s.border}`}>
                    {s.icon} {s.label}
                  </span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setConfirm({ open: true, id: lead._id }); }}
                    className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-neutral-500 line-clamp-2 mb-2">{lead.projectTitle || lead.projectDescription || "—"}</p>
              <div className="flex items-center gap-4 text-xs text-neutral-500">
                <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(lead.createdAt).toLocaleDateString()}</span>
                {lead.budget && lead.budget !== "To be discussed" && <span className="flex items-center gap-1"><DollarSign size={12} /> {lead.budget}</span>}
                {lead.timeline && lead.timeline !== "To be discussed" && <span className="flex items-center gap-1"><Clock size={12} /> {lead.timeline}</span>}
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-neutral-500">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>No leads found.</p>
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
            className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 bg-neutral-950 border-b border-neutral-800 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{selected.firstName} {selected.lastName}</h2>
                <p className="text-sm text-neutral-400">{selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-neutral-900 rounded-lg p-4"><p className="text-sm text-neutral-400 mb-1">Company</p><p className="text-white">{selected.company || "—"}</p></div>
                <div className="bg-neutral-900 rounded-lg p-4"><p className="text-sm text-neutral-400 mb-1">Phone</p><p className="text-white">{selected.phone || "—"}</p></div>
                <div className="bg-neutral-900 rounded-lg p-4"><p className="text-sm text-neutral-400 mb-1">Service</p><p className="text-white">{selected.serviceType}</p></div>
                <div className="bg-neutral-900 rounded-lg p-4"><p className="text-sm text-neutral-400 mb-1">Source</p><p className="text-white capitalize">{selected.source || "website"}</p></div>
              </div>

              {/* Project Info */}
              {selected.projectTitle && (
                <div className="bg-neutral-900 rounded-lg p-4">
                  <p className="text-sm text-neutral-400 mb-1">Project</p>
                  <p className="text-white font-medium mb-2">{selected.projectTitle}</p>
                  {selected.projectDescription && <p className="text-sm text-neutral-300">{selected.projectDescription}</p>}
                </div>
              )}

              {/* Status Management */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Status & Notes</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {Object.keys(statusConfig).map((st) => (
                    <button
                      key={st}
                      onClick={() => updateLead(selected._id, { status: st })}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all flex items-center gap-2 ${selected.status === st
                          ? `${statusConfig[st].bg} ${statusConfig[st].color} ${statusConfig[st].border}`
                          : "border-neutral-700 text-neutral-400 hover:border-neutral-600"
                        }`}
                    >
                      {statusConfig[st].icon} {statusConfig[st].label}
                    </button>
                  ))}
                </div>
                <textarea
                  value={notesForm.notes}
                  onChange={(e) => setNotesForm({ ...notesForm, notes: e.target.value })}
                  placeholder="Add notes about this lead..."
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-lime-500/50 min-h-[100px] mb-3"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => updateLead(selected._id, { notes: notesForm.notes })}
                    className="px-4 py-2 rounded-lg bg-lime-500 text-black font-medium text-sm hover:bg-lime-600 transition-all"
                  >
                    Save Notes
                  </button>
                  <a
                    href={`mailto:${selected.email}?subject=Re: ${selected.projectTitle || "Your Service Request"} - Qode Technologies`}
                    className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 font-medium text-sm hover:bg-blue-500/20 transition-all flex items-center gap-2"
                  >
                    <Mail size={14} /> Email Lead
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      <ConfirmDialog
        isOpen={confirm.open}
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={deleteLead}
        onCancel={() => setConfirm({ open: false, id: null })}
      />
    </div>
  );
};

export default AdminLeadsPage;
