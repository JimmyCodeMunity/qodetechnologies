import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Brain, Layers, Code2, Building2, Truck } from "lucide-react";

const featured = [
  {
    id: "cubicalm",
    name: "Cubicalm",
    url: "https://cubicalm.com/",
    icon: <Brain size={24} className="text-purple-400" />,
    tagline: "Mental wellness & focus platform",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    gradient: "from-purple-500/20 to-blue-500/10",
    accent: "purple",
  },
  {
    id: "foiyd",
    name: "Foiyd",
    url: "https://foiyd.com/",
    icon: <Layers size={24} className="text-orange-400" />,
    tagline: "Creative digital experience",
    tags: ["React", "Firebase", "Framer Motion"],
    gradient: "from-orange-500/20 to-red-500/10",
    accent: "orange",
  },
  {
    id: "computer-one",
    name: "Computer One Solutions",
    url: "https://computeronesolutions.vercel.app/",
    icon: <Code2 size={24} className="text-lime-400" />,
    tagline: "IT solutions & tech services",
    tags: ["React", "Vite", "Supabase"],
    gradient: "from-lime-500/20 to-emerald-500/10",
    accent: "lime",
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

const ProjectsSection = () => {
  return (
    <section className="w-full bg-black py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-500/30 bg-lime-500/10 mb-6">
            <span className="text-xs font-medium text-lime-500 uppercase tracking-wider">Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Recent <span className="text-lime-500">Shipments</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            A few of the products we have built for clients who needed speed, scale, and design excellence.
          </p>
        </motion.div>

        {/* Featured Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featured.map((project, i) => (
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
              <div className={`relative h-36 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
                <div className="relative z-10 w-14 h-14 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-center shadow-lg">
                  {project.icon}
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <ExternalLink size={12} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className={`text-lg font-bold mb-1 ${accentText[project.accent]} transition-colors`}>
                  {project.name}
                </h3>
                <p className="text-sm text-neutral-400 mb-3">{project.tagline}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className={`text-xs px-2 py-0.5 rounded-full border ${accentBg[project.accent]}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 py-3 px-7 text-base font-semibold text-black rounded-full bg-lime-500 shadow-xs hover:bg-lime-600 transition-all duration-500"
          >
            View All Projects <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
