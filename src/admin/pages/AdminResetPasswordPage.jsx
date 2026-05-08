import React, { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, KeyRound, Check } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import apiConfig, { authFetch } from "../../config/api";

const AdminResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ token: searchParams.get("token") || "", password: "", confirm: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const strengths = [
    { label: "8+ characters", met: form.password.length >= 8 },
    { label: "Uppercase & lowercase", met: /[a-z]/.test(form.password) && /[A-Z]/.test(form.password) },
    { label: "Number or symbol", met: /[0-9!@#$%^&*]/.test(form.password) },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    if (!form.token) {
      toast.error("Reset token is missing from the URL.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await authFetch(apiConfig.getEndpoint('/api/v1/admin/reset-password'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token: form.token, password: form.password }),
      });
      const data = await res.json();
      if (data.success) {
        setDone(true);
        toast.success("Password reset successfully.");
      } else {
        toast.error(data.message || "Failed to reset password.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center px-4">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 md:p-10 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-lime-500/10 border border-lime-500/20 mb-4">
              <KeyRound size={28} className="text-lime-500" />
            </div>
            <h1 className="text-2xl font-bold">Set New Password</h1>
            <p className="text-neutral-400 text-sm mt-1">Admin password reset</p>
          </div>

          {!done ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Reset Token</label>
                <Input
                  type="text"
                  placeholder="Paste your reset token"
                  value={form.token}
                  onChange={(e) => setForm({ ...form, token: e.target.value })}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">New Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Confirm Password</label>
                <Input
                  type="password"
                  placeholder="Repeat password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-1.5">
                {strengths.map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${s.met ? "bg-lime-500 border-lime-500" : "border-neutral-600"}`}>
                      {s.met && <Check size={10} className="text-black" />}
                    </div>
                    <span className={s.met ? "text-neutral-300" : "text-neutral-500"}>{s.label}</span>
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full py-3 h-auto text-base font-semibold text-black rounded-full bg-lime-500 hover:bg-lime-600 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Resetting..." : "Reset Password"} <ArrowRight size={18} />
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-12 h-12 rounded-full bg-lime-500/10 border border-lime-500/20 flex items-center justify-center mx-auto mb-4">
                <Check size={20} className="text-lime-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Password updated</h3>
              <p className="text-neutral-400 text-sm mb-6">Your admin password has been reset successfully.</p>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-lime-500 text-black font-semibold text-sm hover:bg-lime-600 transition-all"
              >
                Sign In <ArrowRight size={16} />
              </Link>
            </motion.div>
          )}

          <div className="mt-6 text-center">
            <Link to="/admin/login" className="text-sm text-neutral-500 hover:text-lime-500 transition-colors">
              Back to Admin Login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminResetPasswordPage;
