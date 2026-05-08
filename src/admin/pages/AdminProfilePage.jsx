import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Shield, Mail, Phone, Save, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

const AdminProfilePage = () => {
  const { admin, updateProfile, loading } = useAuth();
  const [form, setForm] = useState({ name: "", handle: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (admin) {
      setForm({
        name: admin.name || "",
        handle: admin.handle || "",
        email: admin.email || "",
        phone: admin.phone || "",
        password: "",
      });
    }
  }, [admin]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    if (!admin?.id) return;

    const payload = {
      fullname: form.name,
      username: form.handle,
      email: form.email,
      phone: form.phone,
    };
    if (form.password.trim()) {
      payload.password = form.password;
    }

    const result = await updateProfile(admin.id, payload);
    if (result.success) {
      toast.success("Profile updated successfully!");
    } else {
      setError(result.message || "Update failed");
      toast.error(result.message || "Failed to update profile.");
    }
  };

  if (!admin) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-neutral-500">
        <Loader2 size={24} className="animate-spin mr-2" /> Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl min-h-screen">
      <h1 className="text-2xl font-bold">Admin Profile</h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8"
      >
        <div className="flex items-center gap-5 mb-8 pb-6 border-b border-neutral-800">
          <img
            src={admin.avatar}
            alt={admin.name}
            className="w-20 h-20 rounded-2xl bg-neutral-800 border border-neutral-700"
          />
          <div>
            <h2 className="text-xl font-bold">{admin.name}</h2>
            <p className="text-neutral-500 text-sm">@{admin.handle}</p>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-lime-500/10 text-lime-400 border border-lime-500/20 mt-2">
              <Shield size={12} /> {admin.role}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-neutral-300 mb-1 block">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-300 mb-1 block">Username</label>
              <input
                type="text"
                value={form.handle}
                onChange={(e) => setForm({ ...form, handle: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-neutral-300 mb-1 block">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-neutral-300 mb-1 block">Phone</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 pl-9 pr-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-300 mb-1 block">New Password</label>
            <input
              type="password"
              placeholder="Leave blank to keep current"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-lime-500/50"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-lime-500 text-black font-semibold text-sm hover:bg-lime-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminProfilePage;
