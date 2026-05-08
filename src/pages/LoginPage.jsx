import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Eye, EyeOff, ArrowRight, LogIn } from "lucide-react";
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

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useUserAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const result = await login(formData.email, formData.password);
    setSubmitting(false);
    if (result.success) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    } else {
      toast.error(result.message || "Login failed.");
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar logoAlt="Qode Logo" items={navItems} baseColor="#fff" buttonBgColor="#84CC16" buttonTextColor="#000" />

      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 left-1/3 w-72 h-72 bg-lime-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-md mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-lime-500/10 border border-lime-500/20 mb-4">
              <LogIn size={24} className="text-lime-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-neutral-400">Sign in to your Qode account</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Email</label>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-neutral-400 cursor-pointer">
                  <input type="checkbox" className="accent-lime-500 rounded" />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-lime-500 hover:text-lime-400 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full py-3 h-auto text-base font-semibold text-black rounded-full bg-lime-500 shadow-xs hover:bg-lime-600 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Signing in..." : "Sign In"} <ArrowRight size={18} />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
              <p className="text-neutral-400 text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-lime-500 hover:text-lime-400 transition-colors font-medium">
                  Create one
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LoginPage;
