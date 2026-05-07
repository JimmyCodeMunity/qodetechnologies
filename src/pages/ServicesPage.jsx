import React from "react";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Services from "../components/sections/Services";
import Footer from "../components/sections/Footer";
import ServiceDialog from "../components/ui/ServiceDialog";
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

const ServicesPage = () => {
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
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-lime-500/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-lime-500">Our Services</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              We build scalable, future-proof digital solutions that drive real business results.
            </p>
            <ServiceDialog
              title="Get Started"
              className="inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-black rounded-full bg-lime-500 shadow-xs hover:bg-lime-600 transition-all duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <Services />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Something Great?</h2>
            <p className="text-gray-400 text-lg mb-8">
              Let's discuss how we can help you achieve your goals with our expertise in web, mobile, and AI solutions.
            </p>
            <ServiceDialog
              title="Start Your Project"
              className="inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-black rounded-full bg-orange-500 shadow-xs hover:bg-orange-600 transition-all duration-500"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServicesPage;