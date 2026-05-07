import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, KeyRound, Mail, ArrowLeft } from "lucide-react";
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

const ForgotPasswordPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setSubmitted(true);
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Reset Password</h1>
            <p className="text-neutral-400">We will send you a reset link</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-xl"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-300">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-3 h-auto text-base font-semibold text-black rounded-full bg-lime-500 shadow-xs hover:bg-lime-600 transition-all duration-500"
                >
                  Send Reset Link <ArrowRight size={18} />
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-12 h-12 rounded-full bg-lime-500/10 border border-lime-500/20 flex items-center justify-center mx-auto mb-4">
                  <Mail size={20} className="text-lime-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Check your inbox</h3>
                <p className="text-neutral-400 text-sm mb-6">
                  If an account exists for <span className="text-white font-medium">{email}</span>, you will receive a password reset link shortly.
                </p>
                <Button
                  onClick={() => { setSubmitted(false); setEmail(""); }}
                  variant="outline"
                  className="rounded-full border-neutral-700 text-white hover:bg-neutral-800 hover:text-white"
                >
                  Send another link
                </Button>
              </motion.div>
            )}

            <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-lime-500 transition-colors"
              >
                <ArrowLeft size={16} /> Back to login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
