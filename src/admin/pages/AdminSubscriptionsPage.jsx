import React, { useState } from "react";
import { motion } from "motion/react";
import { CreditCard, Mail, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import { subscriptions as initialSubs } from "../data/dummyData";

const AdminSubscriptionsPage = () => {
  const [subs, setSubs] = useState(initialSubs);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? subs : subs.filter((s) => s.status === filter);

  const toggleStatus = (id) => {
    setSubs(subs.map((s) => (s.id === id ? { ...s, status: s.status === "active" ? "unsubscribed" : "active" } : s)));
  };

  const [confirm, setConfirm] = useState({ open: false, id: null });

  const openConfirm = (id) => setConfirm({ open: true, id });
  const handleDelete = () => {
    setSubs(subs.filter((s) => s.id !== confirm.id));
    setConfirm({ open: false, id: null });
  };

  return (
    <div className="space-y-6 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <div className="flex items-center gap-2">
          {["all", "active", "unsubscribed"].map((f) => (
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

      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left p-4 text-neutral-500 font-medium">Subscriber</th>
                <th className="text-left p-4 text-neutral-500 font-medium hidden sm:table-cell">Email</th>
                <th className="text-left p-4 text-neutral-500 font-medium">Status</th>
                <th className="text-left p-4 text-neutral-500 font-medium hidden md:table-cell">Source</th>
                <th className="text-left p-4 text-neutral-500 font-medium">Date</th>
                <th className="text-right p-4 text-neutral-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <motion.tr
                  key={s.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors"
                >
                  <td className="p-4 font-medium">{s.name}</td>
                  <td className="p-4 text-neutral-400 hidden sm:table-cell">{s.email}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(s.id)}
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border transition-all ${s.status === "active"
                        ? "bg-lime-500/10 text-lime-400 border-lime-500/20"
                        : "bg-neutral-800 text-neutral-500 border-neutral-700"
                        }`}
                    >
                      {s.status === "active" ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      {s.status}
                    </button>
                  </td>
                  <td className="p-4 text-xs text-neutral-500 hidden md:table-cell">{s.source}</td>
                  <td className="p-4 text-xs text-neutral-500">{s.date}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => openConfirm(s.id)} className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmDialog
        open={confirm.open}
        title="Remove Subscription"
        message="This subscriber will be permanently removed from the list. This action cannot be undone."
        confirmLabel="Remove"
        onConfirm={handleDelete}
        onCancel={() => setConfirm({ open: false, id: null })}
        variant="danger"
      />
    </div>
  );
};

export default AdminSubscriptionsPage;
