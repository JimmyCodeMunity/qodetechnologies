import React, { useState } from "react";
import { motion } from "motion/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, KeyRound, Check } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { useUserAuth } from "../context/UserAuthContext";
import { toast } from "sonner";

const navItems = [
  {
    label: "Company",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "About Us", href: "/about", ariaLabel: "About Qode" },
      { label: "Our Services", href: "/services", ariaLabel: "Our Services" },
      { label: "Blog", href: "/blog", ariaLabel: "Qode Blog" },
      { label: "Projects", href: "/projects", ariaLabel: "Our Projects" },
      { label: "Dashboard", href: "/dashboard", ariaLabel: "User Dashboard" },
    ],
  },
  {
    label: "Services",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      { label: "Web Development", href: "/services", ariaLabel: "Web Development" },
      { label: "Mobile Development", href: "/services", ariaLabel: "Mobile Development" },
      { label: "AI & Automation", href: "/services", ariaLabel: "AI Automation" },
    ],
  },
  {
    label: "Connect",
    bgColor: "#271E37",
    textColor: "#fff",
    links: [
      { label: "Contact Us", href: "/about", ariaLabel: "Contact Qode" },
      { label: "Twitter / X", href: "https://twitter.com", ariaLabel: "Twitter" },
      { label: "LinkedIn", href: "https://linkedin.com", ariaLabel: "LinkedIn" },
    ],
  },
];

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword } = useUserAuth();
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
    const result = await resetPassword(form.token, form.password);
    setSubmitting(false);
    if (result.success) {
      setDone(true);
      toast.success("Password reset successfully. You can now sign in.");
    } else {
      toast.error(result.message || "Failed to reset password.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar logoAlt="Qode Logo" items={navItems} baseColor="#fff" buttonBgColor="#84CC16" buttonTextColor="#000" />

      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 left-1/2 w-72 h-72 bg-lime-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-1/3 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-md mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-lime-500/10 border border-lime-500/20 mb-4">
              <KeyRound size={24} className="text-lime-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Set New Password</h1>
            <p className="text-neutral-400">Enter your new password below</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            {!done ? (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                  className="w-full py-3 h-auto text-base font-semibold text-black rounded-full bg-lime-500 shadow-xs hover:bg-lime-600 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
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
                <p className="text-neutral-400 text-sm mb-6">Your password has been reset successfully.</p>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-lime-500 text-black font-semibold text-sm hover:bg-lime-600 transition-all"
                >
                  Sign In <ArrowRight size={16} />
                </Link>
              </motion.div>
            )}

            <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-lime-500 transition-colors"
              >
                Back to login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
