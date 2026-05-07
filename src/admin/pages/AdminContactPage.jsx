import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, MessageSquare, Trash2, Reply, CheckCircle2, Clock, Archive } from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import { contacts as initialContacts } from "../data/dummyData";

const statusConfig = {
  new: { label: "New", color: "text-lime-400", bg: "bg-lime-500/10", border: "border-lime-500/20", icon: <Clock size={12} /> },
  replied: { label: "Replied", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", icon: <CheckCircle2 size={12} /> },
  archived: { label: "Archived", color: "text-neutral-400", bg: "bg-neutral-800", border: "border-neutral-700", icon: <Archive size={12} /> },
};

const AdminContactPage = () => {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");

  const filtered = filter === "all" ? contacts : contacts.filter((c) => c.status === filter);

  const updateStatus = (id, status) => {
    setContacts(contacts.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const [confirm, setConfirm] = useState({ open: false, id: null, type: "delete" });

  const openConfirmDelete = (id) => setConfirm({ open: true, id, type: "delete" });
  const openConfirmArchive = (id) => setConfirm({ open: true, id, type: "archive" });

  const handleDelete = () => {
    setContacts(contacts.filter((c) => c.id !== confirm.id));
    if (selected?.id === confirm.id) setSelected(null);
    setConfirm({ open: false, id: null, type: "delete" });
  };

  const handleArchive = () => {
    updateStatus(confirm.id, "archived");
    setConfirm({ open: false, id: null, type: "delete" });
  };

  const sendReply = () => {
    if (!reply.trim() || !selected) return;
    updateStatus(selected.id, "replied");
    setReply("");
    setSelected(null);
  };

  return (
    <div className="space-y-6">
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
              return (
                <button
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className={`w-full text-left p-3 rounded-xl transition-all border ${selected?.id === c.id
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
                  <p className="text-[10px] text-neutral-600 mt-1">{c.date}</p>
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
                  <p className="text-xs text-neutral-600 mt-0.5">{selected.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  {selected.status !== "archived" && (
                    <button
                      onClick={() => openConfirmArchive(selected.id)}
                      className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
                      title="Archive"
                    >
                      <Archive size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => openConfirmDelete(selected.id)}
                    className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/50 text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">
                {selected.message}
              </div>

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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-500 text-black font-semibold text-sm hover:bg-lime-600 transition-all"
                    >
                      <Reply size={14} /> Send Reply
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
