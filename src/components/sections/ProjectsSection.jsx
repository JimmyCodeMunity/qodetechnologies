import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, ExternalLink, Brain, Layers, Code2, Building2, Truck, Smartphone, Bot, Palette, Cloud, Zap, Heart, TrendingUp, Loader2 } from "lucide-react";
import apiConfig from "../../config/api";

// Fallback projects for when server is down
const fallbackProjects = [
  {
    _id: "1",
    name: "E-Commerce Platform",
    type: "Web Development",
    description: "A modern e-commerce platform with real-time inventory management, secure payment processing, and responsive design for optimal user experience across all devices.",
    icon: "ShoppingBag",
    accentColor: "lime",
    link: "https://example.com",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    featured: true,
    status: "Completed",
    order: 1
  },
  {
    _id: "2",
    name: "AI Task Manager",
    type: "AI & Automation",
    description: "Intelligent task management system with AI-powered prioritization, natural language processing, and automated workflow optimization.",
    icon: "Bot",
    accentColor: "blue",
    link: "https://example.com",
    tags: ["Python", "TensorFlow", "React", "PostgreSQL"],
    featured: true,
    status: "In Progress",
    order: 2
  },
  {
    _id: "3",
    name: "Mobile Banking App",
    type: "Mobile Development",
    description: "Secure and intuitive mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.",
    icon: "Smartphone",
    accentColor: "purple",
    link: "https://example.com",
    tags: ["React Native", "Firebase", "Node.js", "Security"],
    featured: true,
    status: "Completed",
    order: 3
  }
];

const iconMap = {
  Globe: Brain,
  Code2,
  Smartphone,
  Bot,
  Palette,
  Cloud,
  Layers,
  Building2,
  Truck,
  ShoppingBag,
  Brain,
  Heart,
  TrendingUp,
  Zap,
};

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

const accentColors = {
  lime: { text: "text-lime-400", border: "group-hover:border-lime-500/40", bg: "bg-lime-500/10", borderBg: "border-lime-500/20", gradient: "from-lime-500/20 to-emerald-500/10" },
  orange: { text: "text-orange-400", border: "group-hover:border-orange-500/40", bg: "bg-orange-500/10", borderBg: "border-orange-500/20", gradient: "from-orange-500/20 to-red-500/10" },
  blue: { text: "text-blue-400", border: "group-hover:border-blue-500/40", bg: "bg-blue-500/10", borderBg: "border-blue-500/20", gradient: "from-blue-500/20 to-cyan-500/10" },
  purple: { text: "text-purple-400", border: "group-hover:border-purple-500/40", bg: "bg-purple-500/10", borderBg: "border-purple-500/20", gradient: "from-purple-500/20 to-blue-500/10" },
  pink: { text: "text-pink-400", border: "group-hover:border-pink-500/40", bg: "bg-pink-500/10", borderBg: "border-pink-500/20", gradient: "from-pink-500/20 to-rose-500/10" },
  cyan: { text: "text-cyan-400", border: "group-hover:border-cyan-500/40", bg: "bg-cyan-500/10", borderBg: "border-cyan-500/20", gradient: "from-cyan-500/20 to-teal-500/10" },
  yellow: { text: "text-yellow-400", border: "group-hover:border-yellow-500/40", bg: "bg-yellow-500/10", borderBg: "border-yellow-500/20", gradient: "from-yellow-500/20 to-amber-500/10" },
};

const accentBg = {
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  lime: "bg-lime-500/10 text-lime-400 border-lime-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(apiConfig.getEndpoint('/api/v1/projects'));
      const data = await res.json();
      if (data.success && data.data && data.data.length > 0) {
        // Show all projects from database, limit to 3 for homepage
        const homepageProjects = data.data.slice(0, 3);
        setProjects(homepageProjects);
        setUsingFallback(false);
      } else {
        // Use fallback if no data or empty response
        setProjects(fallbackProjects);
        setUsingFallback(true);
      }
    } catch (error) {
      console.error("Failed to fetch projects, using fallback:", error);
      setProjects(fallbackProjects);
      setUsingFallback(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="w-full bg-black py-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[200px]">
          <Loader2 size={32} className="animate-spin text-lime-500" />
        </div>
      </section>
    );
  }

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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-orange-500">
            Recent <span className="text-lime-500">Shipments</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            A few of the products we have built for clients who needed speed, scale, and design excellence.
          </p>
        </motion.div>

        {/* Featured Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {projects.map((project, i) => {
            const IconComponent = iconMap[project.icon] || Code2;
            const accentColor = project.accentColor || 'lime';

            return (
              <motion.a
                key={project._id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`group relative rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden hover:shadow-xl transition-all duration-500 ${accentBorder[accentColor]}`}
              >
                <div className={`relative h-36 bg-gradient-to-br ${accentColors[accentColor]?.gradient || 'from-lime-500/20 to-emerald-500/10'} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
                  <div className="relative z-10 w-14 h-14 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-center shadow-lg">
                    <IconComponent size={24} className={accentColors[accentColor]?.text || 'text-lime-400'} />
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <ExternalLink size={12} className="text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className={`text-lg font-bold mb-1 ${accentText[accentColor]} transition-colors`}>
                    {project.name}
                  </h3>
                  <p className="text-sm text-neutral-400 mb-3">{project.description || project.type}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className={`text-xs px-2 py-0.5 rounded-full border ${accentBg[accentColor]}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Fallback Notice */}
        {usingFallback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <p className="text-sm text-neutral-500">
              Showing sample projects. <Link to="/projects" className="text-lime-400 hover:text-lime-300 underline">View all projects</Link>
            </p>
          </motion.div>
        )}

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
