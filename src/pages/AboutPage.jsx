import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Code2,
  Cpu,
  Globe,
  Users,
  Zap,
  ArrowRight,
  Sparkles,
  Shield,
  TrendingUp,
} from "lucide-react";
import ServiceDialog from "../components/ui/ServiceDialog";
import { AnimatedTooltipPreview } from "../components/ui/TeamTooltip";
import Footer from "../components/sections/Footer";

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "12+", label: "Countries Served" },
  { value: "98%", label: "Client Retention" },
];

const values = [
  {
    icon: <Zap size={28} className="text-lime-500" />,
    title: "Velocity First",
    desc: "We ship fast without cutting corners. Agile sprints, daily standups, and transparent progress keep your project on track.",
  },
  {
    icon: <Shield size={28} className="text-orange-500" />,
    title: "Security By Design",
    desc: "Every line of code is written with security in mind. From auth to encryption, we build systems you can trust.",
  },
  {
    icon: <Sparkles size={28} className="text-blue-500" />,
    title: "Obsess Over Quality",
    desc: "Pixel-perfect UI, optimized performance, and rigorous testing. We do not settle for good enough.",
  },
  {
    icon: <TrendingUp size={28} className="text-purple-500" />,
    title: "Growth Obsessed",
    desc: "We build products that scale. Our architecture decisions are made with your next 10x growth phase in mind.",
  },
];

const milestones = [
  { year: "2020", title: "Founded", desc: "Qode started with a mission to make world-class engineering accessible." },
  { year: "2021", title: "First Enterprise Client", desc: "Delivered a custom SaaS platform that processed $2M in its first quarter." },
  { year: "2022", title: "AI Division Launch", desc: "Built our first LLM-powered automation suite, saving clients 500+ hours monthly." },
  { year: "2023", title: "Global Expansion", desc: "Opened remote teams across 3 continents to serve clients 24/7." },
  { year: "2024", title: "100th Project", desc: "Celebrated our 100th shipped product — from MVPs to enterprise platforms." },
];

const AboutPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-lime-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-500/30 bg-lime-500/10 mb-6"
          >
            <Users size={14} className="text-lime-500" />
            <span className="text-xs font-medium text-lime-500 uppercase tracking-wider">
              Who We Are
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            Engineering{" "}
            <span className="bg-gradient-to-r from-lime-500 to-orange-500 bg-clip-text text-transparent">
              Excellence
            </span>{" "}
            at Scale
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We are a team of engineers, designers, and AI specialists who
            partner with ambitious companies to build products that matter.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 border-y border-neutral-800/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-lime-500 to-orange-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Built by builders.{" "}
              <span className="text-neutral-500">For builders.</span>
            </h2>
            <p className="text-neutral-400 leading-relaxed">
              Qode was born from a simple belief: great technology should be
              accessible, fast, and beautiful. We started as a small team of
              passionate engineers and have grown into a global force delivering
              products for startups, enterprises, and everything in between.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              Our engineers specialize in modern stacks — React, Next.js,
              Python, Go, AI/ML, and cloud-native architectures. We do not just
              write code; we architect systems that grow with your ambitions.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              From MVPs that secure funding to enterprise platforms processing
              millions of transactions, we have done it all. And we are just
              getting started.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <ServiceDialog
                title="Work With Us"
                className="inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-black rounded-full bg-lime-500 shadow-xs hover:bg-lime-600 transition-all duration-500"
              />
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-white text-sm font-medium hover:text-lime-500 transition-colors"
              >
                Our Services <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-neutral-800 bg-neutral-950 p-6 space-y-4 overflow-hidden">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="space-y-3 font-mono text-sm">
                <div className="text-green-500">
                  <span className="text-neutral-600">$</span> qode --mission
                </div>
                <div className="text-neutral-300">
                  &gt; Empower businesses through world-class digital products.
                </div>
                <div className="text-neutral-300">
                  &gt; Ship fast. Iterate faster. Never compromise on quality.
                </div>
                <div className="text-neutral-300">
                  &gt; Build for the next decade, not the next sprint.
                </div>
                <div className="text-green-500">
                  <span className="text-neutral-600">$</span> qode --status
                </div>
                <div className="text-neutral-300">
                  &gt; Currently shipping. Always hiring. Forever curious.
                </div>
                <div className="inline-block w-2 h-4 bg-lime-500 animate-pulse ml-1" />
              </div>
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-lime-500/10 rounded-full blur-[80px]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4 sm:px-6 bg-neutral-950/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Principles That Drive Us
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              Culture is not a slide deck. It is the sum of every decision we make
              while building your product.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="p-6 rounded-xl border border-neutral-800 bg-black hover:border-neutral-700 transition-colors"
              >
                <div className="mb-4 p-3 rounded-lg bg-neutral-900 border border-neutral-800 w-fit">
                  {v.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the Minds Behind Qode
            </h2>
            <p className="text-neutral-400 max-w-xl mx-auto">
              A global team of engineers, designers, and strategists who live and
              breathe technology.
            </p>
          </motion.div>
          <div className="flex justify-center">
            <AnimatedTooltipPreview />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 sm:px-6 bg-neutral-950/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-neutral-400">
              From a garage idea to a global engineering partner.
            </p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-neutral-800" />
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className={`relative flex items-start gap-8 mb-12 ${
                  i % 2 === 0
                    ? "md:flex-row"
                    : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-lime-500 border-4 border-black z-10 mt-1" />
                <div className="ml-12 md:ml-0 md:w-1/2">
                  <div className="p-5 rounded-xl border border-neutral-800 bg-black">
                    <span className="text-lime-500 text-sm font-mono font-semibold">
                      {m.year}
                    </span>
                    <h3 className="text-lg font-semibold mt-1 mb-1">
                      {m.title}
                    </h3>
                    <p className="text-sm text-neutral-500">{m.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 md:p-16 rounded-2xl border border-neutral-800 bg-neutral-950 relative overflow-hidden"
          >
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-lime-500/10 rounded-full blur-[80px]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Something Extraordinary?
              </h2>
              <p className="text-neutral-400 max-w-lg mx-auto mb-8">
                Let us turn your vision into a product that users love and
                investors fund. The next great idea starts with a conversation.
              </p>
              <div className="flex items-center justify-center gap-4">
                <ServiceDialog
                  title="Start a Project"
                  className="inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-black rounded-full bg-lime-500 shadow-xs hover:bg-lime-600 transition-all duration-500"
                />
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-white text-sm font-medium hover:text-lime-500 transition-colors"
                >
                  Read Our Blog <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
