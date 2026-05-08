import React, { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, Eye, EyeOff, Shield } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login, error: authError, clearError } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [localError, setLocalError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    clearError();
    setSubmitting(true);
    const result = await login(form.email, form.password);
    setSubmitting(false);
    if (result.success) {
      toast.success("Welcome back, admin!");
      navigate("/admin/dashboard");
    } else {
      setLocalError(result.message || "Invalid credentials");
      toast.error(result.message || "Login failed.");
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
              <Shield size={28} className="text-lime-500" />
            </div>
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-neutral-400 text-sm mt-1">Sign in to manage Qode</p>
          </div>

          {(localError || authError) && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {localError || authError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <Input
                  type="email"
                  placeholder="admin@qodenow.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <Input
                  type={showPass ? "text" : "password"}
                  placeholder="admin123"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full py-3 h-auto text-base font-semibold text-black rounded-full bg-lime-500 hover:bg-lime-600 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="flex items-center justify-between mt-2">
            <Link to="/" className="text-sm text-neutral-500 hover:text-lime-500 transition-colors">
              Back to Website
            </Link>
            <Link to="/admin/reset-password" className="text-sm text-lime-500 hover:text-lime-400 transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
