import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Mail, Phone, Shield, UserCircle, X, Pencil, Trash2, Loader2, Search } from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import { toast } from "sonner";
import apiConfig from "../../config/api";

const roleConfig = {
  client: { label: "Client", color: "text-neutral-400", bg: "bg-neutral-800", border: "border-neutral-700" },
  premium: { label: "Premium", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
};

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", role: "client", status: "active" });
  const [confirm, setConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(apiConfig.getEndpoint("/api/v1/admin/users/all"), { credentials: "include" });
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        toast.error(data.message || "Failed to load users.");
      }
    } catch {
      toast.error("Network error loading users.");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (u) => {
    setEditing(u._id);
    setForm({ firstName: u.firstName, lastName: u.lastName, email: u.email, phone: u.phone || "", role: u.role, status: u.status });
  };

  const save = async () => {
    try {
      const res = await fetch(apiConfig.getEndpoint(`/api/v1/admin/users/${editing}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map((u) => (u._id === editing ? { ...u, ...form } : u)));
        toast.success("User updated.");
        setEditing(null);
      } else {
        toast.error(data.message || "Failed to update user.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  const openConfirm = (id) => setConfirm({ open: true, id });

  const handleDelete = async () => {
    try {
      const res = await fetch(apiConfig.getEndpoint(`/api/v1/admin/users/${confirm.id}`), {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((u) => u._id !== confirm.id));
        toast.success("User deleted.");
      } else {
        toast.error(data.message || "Failed to delete user.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setConfirm({ open: false, id: null });
    }
  };

  const toggleStatus = async (u) => {
    const newStatus = u.status === "active" ? "inactive" : "active";
    try {
      const res = await fetch(apiConfig.getEndpoint(`/api/v1/admin/users/${u._id}`), {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.map((usr) => (usr._id === u._id ? { ...usr, status: newStatus } : usr)));
        toast.success(`User marked ${newStatus}.`);
      }
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const filtered = users.filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      u.firstName?.toLowerCase().includes(q) ||
      u.lastName?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.phone?.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-neutral-500">
        <Loader2 size={28} className="animate-spin mr-2" /> Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-6 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-lime-500/50 w-64"
            />
          </div>
          <span className="text-sm text-neutral-500">{users.length} total</span>
        </div>
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
              {filtered.map((u, i) => {
                const r = roleConfig[u.role] || roleConfig.client;
                return (
                  <motion.tr
                    key={u._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {u.avatar ? (
                          <img src={u.avatar} alt={`${u.firstName} ${u.lastName}`} className="w-9 h-9 rounded-xl bg-neutral-800" />
                        ) : (
                          <div className="w-9 h-9 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-400">
                            <UserCircle size={18} />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{u.firstName} {u.lastName}</p>
                          <p className="text-xs text-neutral-500">ID: {u._id?.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                          <Mail size={12} /> {u.email}
                        </div>
                        {u.phone && (
                          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                            <Phone size={12} /> {u.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border ${r.bg} ${r.color} ${r.border}`}>
                        {r.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleStatus(u)}
                        className={`text-xs font-medium px-2 py-1 rounded-full border transition-all ${u.status === "active"
                          ? "bg-lime-500/10 text-lime-400 border-lime-500/20"
                          : "bg-neutral-800 text-neutral-500 border-neutral-700"
                          }`}
                      >
                        {u.status}
                      </button>
                    </td>
                    <td className="p-4 text-xs text-neutral-500">
                      {u.joined ? new Date(u.joined).toLocaleDateString() : "—"}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(u)} className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => openConfirm(u._id)} className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-red-400">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-neutral-500">
                    No users found.
                  </td>
                </tr>
              )}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-neutral-300 mb-1 block">First Name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-300 mb-1 block">Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-300 mb-1 block">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-300 mb-1 block">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-neutral-300 mb-1 block">Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                  >
                    <option value="client">Client</option>
                    <option value="premium">Premium</option>
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
        isOpen={confirm.open}
        title="Delete User"
        message="This user account will be permanently removed. Are you sure?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setConfirm({ open: false, id: null })}
      />
    </div>
  );
};

export default AdminUsersPage;
