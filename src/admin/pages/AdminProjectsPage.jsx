import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  FolderKanban,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Globe,
  Code2,
  Smartphone,
  Bot,
  Palette,
  Cloud,
  Layers,
  Building2,
  Truck,
  ShoppingBag,
  Brain,
  Fingerprint,
  Zap,
  X,
  Loader2,
} from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import { toast } from "sonner";

const iconOptions = [
  { name: "Globe", component: Globe },
  { name: "Code2", component: Code2 },
  { name: "Smartphone", component: Smartphone },
  { name: "Bot", component: Bot },
  { name: "Palette", component: Palette },
  { name: "Cloud", component: Cloud },
  { name: "Layers", component: Layers },
  { name: "Building2", component: Building2 },
  { name: "Truck", component: Truck },
  { name: "ShoppingBag", component: ShoppingBag },
  { name: "Brain", component: Brain },
  { name: "Fingerprint", component: Fingerprint },
  { name: "Zap", component: Zap },
];

const accentColors = {
  lime: { text: "text-lime-400", bg: "bg-lime-500/10", border: "border-lime-500/20" },
  orange: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
  blue: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  pink: { text: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
  cyan: { text: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  yellow: { text: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
};

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", type: "", icon: "Globe", accentColor: "lime", link: "", tags: "", featured: false, status: "In Progress", order: 0 });

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/projects`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setProjects(data.data);
    } catch {
      toast.error("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditing("new");
    setForm({ name: "", description: "", type: "Web Development", icon: "Globe", accentColor: "lime", link: "", tags: "", featured: false, status: "In Progress", order: 0 });
  };

  const openEdit = (p) => {
    setEditing(p._id);
    setForm({ ...p, tags: p.tags.join(", ") });
  };

  const save = async () => {
    setSaving(true);
    try {
      const data = { ...form, tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean) };
      const res = editing === "new"
        ? await fetch(`${API_BASE}/api/v1/projects`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        })
        : await fetch(`${API_BASE}/api/v1/projects/${editing}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });
      const result = await res.json();
      if (result.success) {
        toast.success(editing === "new" ? "Project created" : "Project updated");
        fetchProjects();
        setEditing(null);
      } else {
        toast.error(result.message || "Failed to save.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setSaving(false);
    }
  };

  const [confirm, setConfirm] = useState({ open: false, id: null });

  const openConfirm = (id) => setConfirm({ open: true, id });
  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/v1/projects/${confirm.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Project deleted");
        fetchProjects();
      } else {
        toast.error(data.message || "Failed to delete.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setConfirm({ open: false, id: null });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-neutral-500">
        <Loader2 size={28} className="animate-spin mr-2" /> Loading projects...
      </div>
    );
  }

  return (
    <div className="space-y-6 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-lime-500 text-black hover:bg-lime-600 transition-all"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((p, i) => {
          const colors = accentColors[p.accentColor] || accentColors.lime;
          const Icon = iconOptions.find(opt => opt.name === p.icon)?.component || Globe;
          return (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center ${colors.text}`}>
                  <Icon size={20} />
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => openConfirm(p._id)} className="p-1.5 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold mb-1">{p.name}</h3>
              <p className="text-xs text-neutral-500 mb-2">{p.type}</p>
              <p className="text-xs text-neutral-600 line-clamp-2 mb-3">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags && p.tags.map((t) => (
                  <span key={t} className={`text-[10px] px-2 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                    {t}
                  </span>
                ))}
              </div>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-lime-500 transition-colors"
                >
                  <ExternalLink size={12} /> Visit
                </a>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">{editing === "new" ? "Add Project" : "Edit Project"}</h2>
              <button onClick={() => setEditing(null)} className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { key: "name", label: "Name", type: "text" },
                { key: "type", label: "Type", type: "select", options: ["Web Development", "Mobile Development", "AI & Automation", "UI/UX Design", "DevOps", "Other"] },
                { key: "description", label: "Description", type: "textarea" },
                { key: "link", label: "Link (URL)", type: "url" },
                { key: "tags", label: "Tags (comma separated)", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-sm font-medium text-neutral-300 mb-1 block">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-lime-500/50 min-h-[80px]"
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-lime-500/50"
                    />
                  )}
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-neutral-300 mb-1 block">Accent Color</label>
                  <select
                    value={form.accentColor}
                    onChange={(e) => setForm({ ...form, accentColor: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                  >
                    {Object.keys(accentColors).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-neutral-300 mb-1 block">Icon</label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-lime-500/50"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.name} value={opt.name}>{opt.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={save} disabled={saving} className="flex-1 py-2.5 rounded-xl bg-lime-500 text-black font-semibold text-sm hover:bg-lime-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed">
                  {saving ? <><Loader2 size={14} className="inline animate-spin mr-1" /> Saving...</> : "Save"}
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
        title="Delete Project"
        message="This project will be permanently removed from the portfolio. Are you sure?"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirm({ open: false, id: null })}
        variant="danger"
      />
    </div>
  );
};

export default AdminProjectsPage;
