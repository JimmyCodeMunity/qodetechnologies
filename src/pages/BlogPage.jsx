import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Calendar, Tag } from "lucide-react";
import Footer from "../components/sections/Footer";
import Navbar from "../components/Navbar";
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

export const blogPosts = [
  {
    slug: "why-we-chose-nextjs",
    title: "Why We Chose Next.js for Enterprise-Grade Applications",
    excerpt:
      "Server Components, App Router, and edge caching have changed how we think about web performance at scale. Here is our playbook.",
    date: "May 3, 2026",
    readTime: "6 min read",
    tags: ["Next.js", "Performance", "Engineering"],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "ai-automation-2026",
    title: "AI Automation in 2026: Beyond the Hype Cycle",
    excerpt:
      "LLMs are table stakes. The real differentiator is how you orchestrate agents, memory, and retrieval to build systems that think.",
    date: "April 18, 2026",
    readTime: "8 min read",
    tags: ["AI", "Automation", "LLM"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "mobile-first-design",
    title: "Mobile-First Design Principles That Actually Convert",
    excerpt:
      "It is not about shrinking desktop UI. It is about rethinking the entire experience for thumbs, context, and on-the-go attention spans.",
    date: "March 22, 2026",
    readTime: "5 min read",
    tags: ["Mobile", "UX", "Design"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "scaling-react-native",
    title: "Scaling React Native to Millions of Users",
    excerpt:
      "From monorepo architecture to over-the-air updates, here is how we keep our React Native apps fast and stable at scale.",
    date: "February 10, 2026",
    readTime: "7 min read",
    tags: ["React Native", "Mobile", "Scaling"],
    image:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "cloud-cost-optimization",
    title: "Cloud Cost Optimization Without Sacrificing Performance",
    excerpt:
      "We cut our clients cloud bills by 40% while improving response times. Here is the strategy we used across AWS, GCP, and Vercel.",
    date: "January 28, 2026",
    readTime: "6 min read",
    tags: ["Cloud", "DevOps", "Cost"],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60",
  },
  {
    slug: "future-of-programming",
    title: "The Future of Programming: AI Pairing and Beyond",
    excerpt:
      "Will AI replace developers? No. But developers who use AI will replace those who do not. Here is how we train our team.",
    date: "January 5, 2026",
    readTime: "9 min read",
    tags: ["AI", "Programming", "Future"],
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60",
  },
];

const BlogPage = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar
        logoAlt="Qode Logo"
        items={navItems}
        baseColor="#fff"
        buttonBgColor="#84CC16"
        buttonTextColor="#000"
      />
      {/* Hero */}
      <section className="relative pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-orange-500/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-lime-500/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-6"
          >
            <Tag size={14} className="text-orange-500" />
            <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">
              Engineering Insights
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            The <span className="text-lime-500">Qode</span> Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Deep dives into architecture, AI, mobile, and the craft of building
            products that scale.
          </motion.p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link to={`/blog/${blogPosts[0].slug}`} className="group block">
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 grid md:grid-cols-2">
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-sm text-neutral-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {blogPosts[0].date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {blogPosts[0].readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-lime-500 transition-colors">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-neutral-400 mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {blogPosts[0].tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full border border-neutral-700 text-neutral-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-lime-500 font-medium text-sm">
                    Read Article <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Post Grid */}
      <section className="px-4 sm:px-6 py-12">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (i % 3), duration: 0.5 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full rounded-xl border border-neutral-800 bg-neutral-950 overflow-hidden hover:border-neutral-700 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-neutral-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-lime-500 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-neutral-400 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {post.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-full border border-neutral-800 text-neutral-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPage;
