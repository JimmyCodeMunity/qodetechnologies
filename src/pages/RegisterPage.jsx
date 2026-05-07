import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Eye, EyeOff, ArrowRight, UserPlus, Check } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";

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

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
  };

  const strengths = [
    { label: "8+ characters", met: formData.password.length >= 8 },
    { label: "Uppercase & lowercase", met: /[a-z]/.test(formData.password) && /[A-Z]/.test(formData.password) },
    { label: "Number or symbol", met: /[0-9!@#$%^&*]/.test(formData.password) },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar logoAlt="Qode Logo" items={navItems} baseColor="#fff" buttonBgColor="#84CC16" buttonTextColor="#000" />

      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-1/3 w-72 h-72 bg-orange-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-lime-500/15 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-md mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-4">
              <UserPlus size={24} className="text-orange-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Create Account</h1>
            <p className="text-neutral-400">Join Qode and start building</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300">First Name</label>
                  <Input
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300">Last Name</label>
                  <Input
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Create a strong password"
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-300">Confirm Password</label>
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
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
                className="w-full py-3 h-auto text-base font-semibold text-black rounded-full bg-orange-500 shadow-xs hover:bg-orange-600 transition-all duration-500"
              >
                Create Account <ArrowRight size={18} />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
              <p className="text-neutral-400 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="text-lime-500 hover:text-lime-400 transition-colors font-medium">
                  Sign in
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

export default RegisterPage;
