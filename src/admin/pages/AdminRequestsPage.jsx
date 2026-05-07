import React, { useState } from "react";
import { motion } from "motion/react";
import { Briefcase, Clock, CheckCircle2, AlertCircle, ArrowRight, X, Pencil } from "lucide-react";
import { serviceRequests as initialRequests } from "../data/dummyData";

const statusConfig = {
  pending: { label: "Pending", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", icon: <Clock size={14} /> },
  "in-progress": { label: "In Progress", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: <ArrowRight size={14} /> },
  completed: { label: "Completed", color: "text-lime-400", bg: "bg-lime-500/10", border: "border-lime-500/20", icon: <CheckCircle2 size={14} /> },
};

const priorityConfig = {
  low: { color: "text-neutral-400", bg: "bg-neutral-800", border: "border-neutral-700" },
  medium: { color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  high: { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  urgent: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
};

const AdminRequestsPage = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ status: "", priority: "" });

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const openEdit = (r) => {
    setEditing(r.id);
    setForm({ status: r.status, priority: r.priority });
  };

  const save = () => {
    setRequests(requests.map((r) => (r.id === editing ? { ...r, ...form } : r)));
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Service Requests</h1>
        <div className="flex items-center gap-2">
          {["all", "pending", "in-progress", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                filter === f
                  ? "bg-lime-500/10 text-lime-500 border-lime-500/20"
                  : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700"
              }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((req, i) => {
          const s = statusConfig[req.status];
          const p = priorityConfig[req.priority];
          return (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 hover:border-neutral-700 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300">
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <p className="font-semibold">{req.service}</p>
                    <p className="text-xs text-neutral-500">{req.client} &middot; {req.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full border ${p.bg} ${p.color} ${p.border}`}>
                    {req.priority}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-1 rounded-full border ${s.bg} ${s.color} ${s.border}`}>
                    {s.icon} {s.label}
                  </span>
                </div>
              </div>
              <p className="text-sm text-neutral-400 mb-3">{req.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500">
                <span>Budget: <span className="text-neutral-300 font-medium">{req.budget}</span></span>
                <span>Date: {req.date}</span>
                <button
                  onClick={() => openEdit(req)}
                  className="ml-auto inline-flex items-center gap-1 text-lime-500 hover:underline"
                >
                  <Pencil size={12} /> Update
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 w-full max-w-sm"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">Update Request</h2>
              <button onClick={() => setEditing(null)} className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-neutral-300 mb-1 block">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-300 mb-1 block">Priority</label>
                <select
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={save} className="flex-1 py-2.5 rounded-xl bg-lime-500 text-black font-semibold text-sm hover:bg-lime-600 transition-all">
                  Update
                </button>
                <button onClick={() => setEditing(null)} className="flex-1 py-2.5 rounded-xl bg-neutral-800 text-white font-medium text-sm hover:bg-neutral-700 transition-all">
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminRequestsPage;
