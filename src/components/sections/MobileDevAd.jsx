import React from "react";
import { motion } from "motion/react";
import { Smartphone, Zap, Globe, Shield, ArrowRight } from "lucide-react";
import ServiceDialog from "../ui/ServiceDialog";

const features = [
  {
    icon: <Zap size={22} className="text-lime-500" />,
    title: "Lightning Fast",
    desc: "Optimized performance with 60fps animations and sub-second load times.",
  },
  {
    icon: <Globe size={22} className="text-orange-500" />,
    title: "Cross-Platform",
    desc: "One codebase. iOS, Android, and Web. Reach every user, everywhere.",
  },
  {
    icon: <Shield size={22} className="text-blue-500" />,
    title: "Enterprise Security",
    desc: "End-to-end encryption, biometric auth, and compliance-ready architecture.",
  },
];

const MobileDevAd = () => {
  return (
    <section className="w-full bg-black py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-500/30 bg-lime-500/10">
              <Smartphone size={14} className="text-lime-500" />
              <span className="text-xs font-medium text-lime-500 uppercase tracking-wider">
                Mobile First
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Build Apps That{" "}
              <span className="bg-gradient-to-r from-lime-500 to-orange-500 bg-clip-text text-transparent">
                Users Love
              </span>
            </h2>

            <p className="text-neutral-400 text-lg leading-relaxed max-w-lg">
              From idea to App Store — we craft pixel-perfect native and
              cross-platform mobile experiences. Flutter, React Native, Swift,
              and Kotlin. Your vision, engineered for engagement and growth.
            </p>

            <div className="space-y-4 pt-2">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="mt-0.5 p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">
                      {f.title}
                    </h4>
                    <p className="text-neutral-500 text-sm mt-0.5">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="pt-4 flex items-center gap-4"
            >
              <ServiceDialog
                title="Start Your Mobile Project"
                className="inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-black rounded-full bg-lime-500 shadow-xs hover:bg-lime-600 transition-all duration-500"
              />
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-white text-sm font-medium hover:text-lime-500 transition-colors"
              >
                Explore Services <ArrowRight size={16} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-72 h-[500px] md:w-80 md:h-[540px] rounded-[3rem] border-4 border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-neutral-800 rounded-b-xl z-20" />

              {/* Screen Content */}
              <div className="absolute inset-0 p-6 pt-10 flex flex-col justify-between">
                <div className="space-y-4">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-full h-32 rounded-2xl bg-gradient-to-br from-lime-500/20 to-orange-500/20 border border-lime-500/20 flex flex-col justify-end p-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-lime-500 flex items-center justify-center mb-3">
                      <Zap size={20} className="text-black" />
                    </div>
                    <div className="h-3 w-3/4 bg-white/20 rounded" />
                    <div className="h-2 w-1/2 bg-white/10 rounded mt-2" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                    className="w-full h-24 rounded-2xl bg-gradient-to-br from-orange-500/20 to-blue-500/20 border border-orange-500/20 flex items-center gap-3 px-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                      <Globe size={18} className="text-black" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-24 bg-white/20 rounded" />
                      <div className="h-2 w-16 bg-white/10 rounded" />
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full py-3 rounded-xl bg-lime-500 text-black font-semibold text-center text-sm"
                >
                  Launch My App
                </motion.div>
              </div>

              {/* Glow behind phone */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-56 h-56 bg-lime-500/20 rounded-full blur-[80px] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MobileDevAd;
