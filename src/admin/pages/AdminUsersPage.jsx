import React, { useState } from "react";
import { motion } from "motion/react";
import { Users, Mail, Phone, Shield, UserCircle, X, Pencil, Trash2, Check } from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import { users as initialUsers } from "../data/dummyData";

const AdminUsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "Client", status: "active" });

  const openEdit = (u) => {
    setEditing(u.id);
    setForm({ name: u.name, email: u.email, phone: u.phone, role: u.role, status: u.status });
  };

  const save = () => {
    setUsers(users.map((u) => (u.id === editing ? { ...u, ...form } : u)));
    setEditing(null);
  };

  const [confirm, setConfirm] = useState({ open: false, id: null });

  const openConfirm = (id) => setConfirm({ open: true, id });
  const handleDelete = () => {
    setUsers(users.filter((u) => u.id !== confirm.id));
    setConfirm({ open: false, id: null });
  };

  const toggleStatus = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <span className="text-sm text-neutral-500">{users.length} total</span>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left p-4 text-neutral-500 font-medium">User</th>
                <th className="text-left p-4 text-neutral-500 font-medium hidden md:table-cell">Contact</th>
                <th className="text-left p-4 text-neutral-500 font-medium">Role</th>
                <th className="text-left p-4 text-neutral-500 font-medium">Status</th>
                <th className="text-left p-4 text-neutral-500 font-medium">Joined</th>
                <th className="text-right p-4 text-neutral-500 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <motion.tr
                  key={u.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-xl bg-neutral-800" />
                      <div>
                        <p className="font-medium">{u.name}</p>
                        <p className="text-xs text-neutral-500">@{u.handle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <Mail size={12} /> {u.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <Phone size={12} /> {u.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${u.role === "Premium Client" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                        "bg-neutral-800 text-neutral-400 border-neutral-700"
                      }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className={`text-xs font-medium px-2 py-1 rounded-full border transition-all ${u.status === "active"
                          ? "bg-lime-500/10 text-lime-400 border-lime-500/20"
                          : "bg-neutral-800 text-neutral-500 border-neutral-700"
                        }`}
                    >
                      {u.status}
                    </button>
                  </td>
                  <td className="p-4 text-xs text-neutral-500">{u.joined}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEdit(u)} className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => openConfirm(u.id)} className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">Edit User</h2>
              <button onClick={() => setEditing(null)} className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { key: "name", label: "Full Name", type: "text" },
                { key: "email", label: "Email", type: "email" },
                { key: "phone", label: "Phone", type: "tel" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-sm font-medium text-neutral-300 mb-1 block">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-neutral-300 mb-1 block">Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                  >
                    <option value="Client">Client</option>
                    <option value="Premium Client">Premium Client</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-300 mb-1 block">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={save} className="flex-1 py-2.5 rounded-xl bg-lime-500 text-black font-semibold text-sm hover:bg-lime-600 transition-all">
                  Save
                </button>
                <button onClick={() => setEditing(null)} className="flex-1 py-2.5 rounded-xl bg-neutral-800 text-white font-medium text-sm hover:bg-neutral-700 transition-all">
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      <ConfirmDialog
        open={confirm.open}
        title="Delete User"
        message="This user account and all associated data will be permanently removed. Are you sure?"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirm({ open: false, id: null })}
        variant="danger"
      />
    </div>
  );
};

export default AdminUsersPage;
