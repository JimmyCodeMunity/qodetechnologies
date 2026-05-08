import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, MessageSquare, Trash2, Reply, CheckCircle2, Clock, Archive, Loader2 } from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import { toast } from "sonner";

const statusConfig = {
  new: { label: "New", color: "text-lime-400", bg: "bg-lime-500/10", border: "border-lime-500/20", icon: <Clock size={12} /> },
  replied: { label: "Replied", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: <CheckCircle2 size={12} /> },
  archived: { label: "Archived", color: "text-neutral-400", bg: "bg-neutral-800", border: "border-neutral-700", icon: <Archive size={12} /> },
};

const AdminContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [replying, setReplying] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/contacts`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setContacts(data.data);
      }
    } catch {
      toast.error("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === "all" ? contacts : contacts.filter((c) => c.status === filter);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts(contacts.map((c) => (c._id === id ? { ...c, status } : c)));
        toast.success("Status updated.");
      } else {
        toast.error(data.message || "Failed to update status.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  const [confirm, setConfirm] = useState({ open: false, id: null, type: "delete" });

  const openConfirmDelete = (id) => setConfirm({ open: true, id, type: "delete" });
  const openConfirmArchive = (id) => setConfirm({ open: true, id, type: "archive" });

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/contacts/${confirm.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setContacts(contacts.filter((c) => c._id !== confirm.id));
        if (selected?._id === confirm.id) setSelected(null);
        toast.success("Contact deleted.");
      } else {
        toast.error(data.message || "Failed to delete.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setConfirm({ open: false, id: null, type: "delete" });
    }
  };

  const handleArchive = () => {
    updateStatus(confirm.id, "archived");
    setConfirm({ open: false, id: null, type: "delete" });
  };

  const sendReply = async () => {
    if (!reply.trim() || !selected) return;
    setReplying(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/contacts/${selected._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ reply, status: "replied" }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts(contacts.map((c) => (c._id === selected._id ? { ...c, status: "replied", reply } : c)));
        toast.success("Reply sent via email.");
        setReply("");
        setSelected(null);
      } else {
        toast.error(data.message || "Failed to send reply.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setReplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-neutral-500">
        <Loader2 size={28} className="animate-spin mr-2" /> Loading contacts...
      </div>
    );
  }

  return (
    <div className="space-y-6 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Contact Submissions</h1>
        <div className="flex items-center gap-2">
          {["all", "new", "replied", "archived"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${filter === f
                ? "bg-lime-500/10 text-lime-500 border-lime-500/20"
                : "bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700"
                }`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="lg:col-span-1 bg-neutral-950 border border-neutral-800 rounded-2xl p-4 h-fit max-h-[600px] overflow-y-auto">
          <h2 className="text-sm font-bold mb-3 text-neutral-500 uppercase tracking-wider">Submissions</h2>
          <div className="space-y-2">
            {filtered.map((c) => {
              const s = statusConfig[c.status];
              const date = new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
              return (
                <button
                  key={c._id}
                  onClick={() => setSelected(c)}
                  className={`w-full text-left p-3 rounded-xl transition-all border ${selected?._id === c._id
                    ? "bg-lime-500/10 border-lime-500/20"
                    : "bg-neutral-900/50 border-neutral-800/50 hover:border-neutral-700"
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{c.name}</span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded border ${s.bg} ${s.color} ${s.border}`}>
                      {s.icon} {s.label}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 truncate">{c.subject}</p>
                  <p className="text-[10px] text-neutral-600 mt-1">{date}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2 bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
          {selected ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold">{selected.subject}</h2>
                  <p className="text-sm text-neutral-400 mt-1">
                    From: <span className="text-white">{selected.name}</span> &lt;{selected.email}&gt;
                  </p>
                  {selected.phone && (
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Phone: {selected.phone}
                    </p>
                  )}
                  <p className="text-xs text-neutral-600 mt-0.5">
                    {new Date(selected.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                  {selected.subscribe && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-lime-500/10 text-lime-400 border border-lime-500/20 mt-1">
                      Subscribed to newsletter
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {selected.status !== "archived" && (
                    <button
                      onClick={() => openConfirmArchive(selected._id)}
                      className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                      title="Archive"
                    >
                      <Archive size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => openConfirmDelete(selected._id)}
                    className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/50 text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </div>

              {selected.reply && (
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <p className="text-xs font-medium text-blue-400 mb-2">Your Reply:</p>
                  <p className="text-sm text-neutral-300 whitespace-pre-wrap">{selected.reply}</p>
                </div>
              )}

              {selected.status !== "replied" && (
                <div className="space-y-3">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-lime-500/50 min-h-[100px]"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={sendReply}
                      disabled={replying}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-500 text-black font-semibold text-sm hover:bg-lime-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {replying ? <><Loader2 size={14} className="animate-spin mr-1" /> Sending...</> : <><Reply size={14} /> Send Reply</>}
                    </button>
                    <a
                      href={`mailto:${selected.email}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-800 text-white text-sm hover:bg-neutral-700 transition-all"
                    >
                      <Mail size={14} /> Open Email
                    </a>
                  </div>
                </div>
              )}

              {selected.status === "replied" && (
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
                  <CheckCircle2 size={16} /> Replied
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-neutral-500 min-h-[300px]">
              <MessageSquare size={40} className="mb-3 text-neutral-700" />
              <p>Select a submission to view details and reply</p>
            </div>
          )}
        </div>
      </div>
      <ConfirmDialog
        open={confirm.open}
        title={confirm.type === "archive" ? "Archive Submission" : "Delete Submission"}
        message={
          confirm.type === "archive"
            ? "This contact submission will be archived. You can still view it later."
            : "This submission will be permanently deleted and cannot be recovered."
        }
        confirmLabel={confirm.type === "archive" ? "Archive" : "Delete"}
        onConfirm={confirm.type === "archive" ? handleArchive : handleDelete}
        onCancel={() => setConfirm({ open: false, id: null, type: "delete" })}
        variant={confirm.type === "archive" ? "warning" : "danger"}
      />
    </div>
  );
};

export default AdminContactPage;
