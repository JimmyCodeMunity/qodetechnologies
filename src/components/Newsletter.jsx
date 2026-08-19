import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Mail } from "lucide-react";
import CurvedInput from "./ui/CurvedInput";

const Newsletter = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (value) => {
    const trimmed = (value ?? email).trim();
    if (!trimmed) return;
    console.log("Newsletter subscription:", trimmed);
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="relative w-full bg-black py-24 px-4 sm:px-6 overflow-hidden">
      {/* Background blurs */}
      <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lime-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-neutral-950 border border-neutral-800 rounded-2xl p-8 md:p-12 text-center shadow-xl"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-lime-500/10 border border-lime-500/20 mb-6">
            <Mail size={24} className="text-lime-500" />
          </div>

          <h2 className="text-2xl md:text-4xl font-bold mb-3 text-white">
            Stay <span className="text-lime-500">Ahead</span> of the Curve
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-xl mx-auto mb-8">
            Get weekly insights on engineering, AI trends, and digital transformation — delivered straight to your inbox.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-500 font-medium"
            >
              <CheckCircle2 size={18} /> Subscribed successfully!
            </motion.div>
          ) : (
            <div className="max-w-lg mx-auto">
              <CurvedInput
                value={email}
                onChange={setEmail}
                onSubmit={handleSubmit}
                placeholder="Enter your email address"
                buttonText="Subscribe"
                type="email"
                showButton
                showIcon
                width="100%"
                bend={28}
                height={64}
                cornerRadius={18}
                borderWidth={1.5}
                fontSize={15}
                backgroundColor="#0a0a0a"
                textColor="#f5f5f5"
                placeholderColor="#525252"
                borderColor="#262626"
                buttonColor="#84CC16"
                buttonTextColor="#000000"
                shadowSize="md"
              />
            </div>
          )}

          <p className="text-neutral-600 text-xs mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
