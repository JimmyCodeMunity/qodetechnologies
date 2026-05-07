import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Layers, Globe, Code2, Truck, Brain, Building2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

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

const projects = [
  {
    id: "cubicalm",
    name: "Cubicalm",
    url: "https://cubicalm.com/",
    icon: <Brain size={28} className="text-purple-400" />,
    tagline: "Mental wellness & focus platform",
    description:
      "A mindfulness and productivity suite designed to help teams stay calm and focused. Built with real-time analytics and personalized wellness tracking.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Tailwind"],
    gradient: "from-purple-500/20 to-blue-500/10",
    accent: "purple",
  },
  {
    id: "foiyd",
    name: "Foiyd",
    url: "https://foiyd.com/",
    icon: <Layers size={28} className="text-orange-400" />,
    tagline: "Creative digital experience",
    description:
      "A modern web platform blending content, community, and creative tools. Engineered for speed with a highly interactive UI and smooth animations.",
    tags: ["React", "Firebase", "Framer Motion", "Vercel"],
    gradient: "from-orange-500/20 to-red-500/10",
    accent: "orange",
  },
  {
    id: "computer-one",
    name: "Computer One Solutions",
    url: "https://computeronesolutions.vercel.app/",
    icon: <Code2 size={28} className="text-lime-400" />,
    tagline: "IT solutions & tech services",
    description:
      "Corporate website and service portal for an IT solutions provider. Features service booking, live chat integration, and a clean enterprise-grade design.",
    tags: ["React", "Vite", "Tailwind", "Supabase"],
    gradient: "from-lime-500/20 to-emerald-500/10",
    accent: "lime",
  },
  {
    id: "zanacoworking",
    name: "Zana Coworking Hub",
    url: "https://zanacoworkinghub.vercel.app/",
    icon: <Building2 size={28} className="text-blue-400" />,
    tagline: "Coworking space management",
    description:
      "Booking and management platform for a modern coworking space. Includes real-time desk availability, membership tiers, and payment processing.",
    tags: ["Next.js", "Prisma", "Stripe", "PostgreSQL"],
    gradient: "from-blue-500/20 to-cyan-500/10",
    accent: "blue",
  },
  {
    id: "cgm-logistics",
    name: "CGM Logistics",
    url: "https://cgmlogistics.vercel.app/",
    icon: <Truck size={28} className="text-yellow-400" />,
    tagline: "Logistics & supply chain tracking",
    description:
      "End-to-end logistics management dashboard with live shipment tracking, route optimization, and fleet analytics for transportation companies.",
    tags: ["React", "Node.js", "MongoDB", "Mapbox"],
    gradient: "from-yellow-500/20 to-amber-500/10",
    accent: "yellow",
  },
];

const accentText = {
  purple: "text-purple-400 group-hover:text-purple-300",
  orange: "text-orange-400 group-hover:text-orange-300",
  lime: "text-lime-400 group-hover:text-lime-300",
  blue: "text-blue-400 group-hover:text-blue-300",
  yellow: "text-yellow-400 group-hover:text-yellow-300",
};

const accentBorder = {
  purple: "group-hover:border-purple-500/40",
  orange: "group-hover:border-orange-500/40",
  lime: "group-hover:border-lime-500/40",
  blue: "group-hover:border-blue-500/40",
  yellow: "group-hover:border-yellow-500/40",
};

const accentBg = {
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  lime: "bg-lime-500/10 text-lime-400 border-lime-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const ProjectsPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar logoAlt="Qode Logo" items={navItems} baseColor="#fff" buttonBgColor="#84CC16" buttonTextColor="#000" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 left-20 w-72 h-72 bg-lime-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-500/30 bg-lime-500/10 mb-6">
              <Globe size={14} className="text-lime-500" />
              <span className="text-xs font-medium text-lime-500 uppercase tracking-wider">Selected Work</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Projects We Have <span className="text-lime-500">Shipped</span>
            </h1>
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Real products for real businesses. Every project is a partnership built on trust, speed, and engineering excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden hover:shadow-xl transition-all duration-500 ${accentBorder[project.accent]}`}
            >
              {/* Gradient Header */}
              <div className={`relative h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-center shadow-lg">
                  {project.icon}
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <ExternalLink size={14} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-xl font-bold ${accentText[project.accent]} transition-colors`}>
                    {project.name}
                  </h3>
                  <span className="text-xs text-neutral-500 font-mono">{new URL(project.url).hostname}</span>
                </div>
                <p className="text-sm text-neutral-400 font-medium mb-3">{project.tagline}</p>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2.5 py-1 rounded-full border ${accentBg[project.accent]}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                  Visit Site <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 border-t border-neutral-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a project in mind?</h2>
            <p className="text-neutral-400 text-lg mb-8 max-w-xl mx-auto">
              Let us turn your idea into a product. From MVPs to enterprise platforms, we ship fast and scale smart.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/services"
                className="inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-black rounded-full bg-lime-500 shadow-xs hover:bg-lime-600 transition-all duration-500"
              >
                Explore Services <ArrowRight size={18} className="ml-2" />
              </Link>
              <a
                href="https://wa.me/254141447430"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-white rounded-full border border-neutral-700 hover:bg-neutral-800 transition-all duration-500"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ProjectsPage;
