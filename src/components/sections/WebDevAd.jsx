import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Globe, Zap, Code2, Layers, ArrowRight } from "lucide-react";
import ServiceDialog from "../ui/ServiceDialog";

const features = [
  {
    icon: <Zap size={22} className="text-lime-500" />,
    title: "High Performance",
    desc: "Next.js, Remix, and SSR for instant page loads and SEO dominance.",
  },
  {
    icon: <Layers size={22} className="text-orange-500" />,
    title: "Scalable Architecture",
    desc: "Micro-frontends, headless CMS, and cloud-native backends that grow with you.",
  },
  {
    icon: <Code2 size={22} className="text-blue-500" />,
    title: "Pixel-Perfect UI",
    desc: "Accessible, responsive designs with Tailwind CSS and Framer Motion animations.",
  },
];

const WebDevAd = () => {
  return (
    <section className="w-full bg-black py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Visual — Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex justify-center items-center order-2 md:order-1"
          >
            <div className="relative w-full max-w-lg aspect-[16/10] rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl overflow-hidden">
              {/* Browser Chrome */}
              <div className="h-8 bg-neutral-900 border-b border-neutral-800 flex items-center px-3 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <div className="ml-4 h-4 w-48 rounded bg-neutral-800" />
              </div>

              {/* Screen Content */}
              <div className="p-5 space-y-4">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex gap-4"
                >
                  <div className="w-1/3 h-20 rounded-lg bg-gradient-to-br from-lime-500/15 to-lime-500/5 border border-lime-500/20 flex flex-col justify-end p-3">
                    <div className="h-2 w-12 bg-lime-500/30 rounded" />
                  </div>
                  <div className="w-1/3 h-20 rounded-lg bg-gradient-to-br from-orange-500/15 to-orange-500/5 border border-orange-500/20 flex flex-col justify-end p-3">
                    <div className="h-2 w-10 bg-orange-500/30 rounded" />
                  </div>
                  <div className="w-1/3 h-20 rounded-lg bg-gradient-to-br from-blue-500/15 to-blue-500/5 border border-blue-500/20 flex flex-col justify-end p-3">
                    <div className="h-2 w-14 bg-blue-500/30 rounded" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                  className="w-full h-28 rounded-lg bg-gradient-to-r from-neutral-800/50 to-neutral-900/50 border border-neutral-800 p-4 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-lime-500/20 flex items-center justify-center">
                      <Zap size={14} className="text-lime-500" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 w-32 bg-white/10 rounded" />
                      <div className="h-1.5 w-20 bg-white/5 rounded" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full bg-white/5 rounded" />
                    <div className="h-1.5 w-4/5 bg-white/5 rounded" />
                    <div className="h-1.5 w-2/3 bg-white/5 rounded" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4,
                  }}
                  className="flex gap-3"
                >
                  <div className="h-10 flex-1 rounded-lg bg-neutral-800/40 border border-neutral-800" />
                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6,
                    }}
                    className="h-10 w-24 rounded-lg bg-lime-500 flex items-center justify-center"
                  >
                    <span className="text-xs font-semibold text-black">Deploy</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Glow behind */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/15 rounded-full blur-[80px] pointer-events-none" />
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6 order-1 md:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10">
              <Globe size={14} className="text-orange-500" />
              <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">
                Web Experiences
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Web Platforms Built for{" "}
              <span className="bg-gradient-to-r from-orange-500 to-lime-500 bg-clip-text text-transparent">
                Scale & Speed
              </span>
            </h2>

            <p className="text-neutral-400 text-lg leading-relaxed max-w-lg">
              From marketing sites to full-stack SaaS platforms — we build modern
              web experiences using React, Next.js, Node.js, and the cloud.
              Performance-first, SEO-optimized, and conversion-obsessed.
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
                title="Start Your Web Project"
                className="inline-flex items-center justify-center py-3 md:px-7 px-1 text-base font-semibold text-center text-black rounded-full bg-orange-500  shadow-xs hover:bg-orange-600 transition-all duration-500"
              />
              <Link
                to="/services"
                className="inline-flex items-center md:gap-2 gap-1 text-white md:text-sm text-xs font-medium hover:text-orange-500 transition-colors"
              >
                View Tech Stack <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WebDevAd;
