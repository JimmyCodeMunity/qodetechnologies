import React, { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
    ShoppingCart,
    Hospital,
    GraduationCap,
    Building2,
    Truck,
    Hotel,
    ArrowRight,
    CheckCircle2,
    Cloud,
    HardDrive,
    Sparkles,
    ExternalLink,
} from "lucide-react";

const solutions = [
    {
        id: "pos",
        icon: ShoppingCart,
        label: "Retail & Commerce",
        title: "Qode POS",
        tagline: "Modern Point of Sale",
        description:
            "A full-featured POS system built for retail, restaurants, and service businesses. Real-time inventory, multi-branch support, and offline-first architecture.",
        features: ["Real-time inventory tracking", "Multi-branch & franchise support", "Offline-first with auto-sync", "Sales analytics & reporting"],
        accent: "lime",
        badge: "Available Now",
        badgeType: "live",
    },
    {
        id: "hms",
        icon: Hospital,
        label: "Healthcare",
        title: "Qode HMS",
        tagline: "Hospital Management System",
        description:
            "End-to-end hospital operations platform — patient records, appointments, billing, pharmacy, lab, and ward management in one unified system.",
        features: ["Electronic health records (EHR)", "Appointment & scheduling", "Pharmacy & lab integration", "Insurance & billing automation"],
        accent: "blue",
        badge: "In Development",
        badgeType: "dev",
    },
    {
        id: "sms",
        icon: GraduationCap,
        label: "Education",
        title: "Qode SMS",
        tagline: "School Management System",
        description:
            "Complete school administration platform covering student enrollment, grading, timetables, fee collection, and parent communication portals.",
        features: ["Student lifecycle management", "Automated fee & payroll", "Timetable & attendance", "Parent & teacher portals"],
        accent: "orange",
        badge: "In Development",
        badgeType: "dev",
    },
    {
        id: "hrm",
        icon: Building2,
        label: "Human Resources",
        title: "Qode HRM",
        tagline: "HR & Payroll Platform",
        description:
            "Streamline your people operations with automated payroll, leave management, performance tracking, and compliance-ready reporting for any team size.",
        features: ["Automated payroll processing", "Leave & attendance tracking", "Performance reviews", "Compliance & reporting"],
        accent: "purple",
        badge: "Coming Soon",
        badgeType: "soon",
    },
    {
        id: "lms",
        icon: Truck,
        label: "Logistics",
        title: "Qode LMS",
        tagline: "Logistics & Fleet Management",
        description:
            "Track deliveries, manage fleets, optimize routes, and keep customers informed in real time. Built for courier services, distributors, and supply chains.",
        features: ["Live GPS fleet tracking", "Route optimization", "Delivery notifications", "Fuel & maintenance logs"],
        accent: "yellow",
        badge: "Coming Soon",
        badgeType: "soon",
    },
    {
        id: "pms",
        icon: Hotel,
        label: "Hospitality",
        title: "Qode PMS",
        tagline: "Property Management System",
        description:
            "A smart property management solution for hotels, guest houses, and Airbnb operators — reservations, housekeeping, billing, and guest experience in one place.",
        features: ["Reservations & front desk", "Housekeeping management", "POS & restaurant billing", "Guest self-check-in"],
        accent: "pink",
        badge: "Coming Soon",
        badgeType: "soon",
    },
];

const accentConfig = {
    lime: {
        text: "text-lime-400",
        border: "border-lime-500/30",
        bg: "bg-lime-500/10",
        glow: "from-lime-500/20",
        icon: "text-lime-500",
        pill: "bg-lime-500/10 border-lime-500/30 text-lime-400",
        button: "bg-lime-500 hover:bg-lime-600 text-black",
        check: "text-lime-500",
    },
    blue: {
        text: "text-blue-400",
        border: "border-blue-500/30",
        bg: "bg-blue-500/10",
        glow: "from-blue-500/20",
        icon: "text-blue-500",
        pill: "bg-blue-500/10 border-blue-500/30 text-blue-400",
        button: "bg-blue-500 hover:bg-blue-600 text-white",
        check: "text-blue-500",
    },
    orange: {
        text: "text-orange-400",
        border: "border-orange-500/30",
        bg: "bg-orange-500/10",
        glow: "from-orange-500/20",
        icon: "text-orange-500",
        pill: "bg-orange-500/10 border-orange-500/30 text-orange-400",
        button: "bg-orange-500 hover:bg-orange-600 text-black",
        check: "text-orange-500",
    },
    purple: {
        text: "text-purple-400",
        border: "border-purple-500/30",
        bg: "bg-purple-500/10",
        glow: "from-purple-500/20",
        icon: "text-purple-500",
        pill: "bg-purple-500/10 border-purple-500/30 text-purple-400",
        button: "bg-purple-500 hover:bg-purple-600 text-white",
        check: "text-purple-500",
    },
    yellow: {
        text: "text-yellow-400",
        border: "border-yellow-500/30",
        bg: "bg-yellow-500/10",
        glow: "from-yellow-500/20",
        icon: "text-yellow-500",
        pill: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
        button: "bg-yellow-500 hover:bg-yellow-600 text-black",
        check: "text-yellow-500",
    },
    pink: {
        text: "text-pink-400",
        border: "border-pink-500/30",
        bg: "bg-pink-500/10",
        glow: "from-pink-500/20",
        icon: "text-pink-500",
        pill: "bg-pink-500/10 border-pink-500/30 text-pink-400",
        button: "bg-pink-500 hover:bg-pink-600 text-white",
        check: "text-pink-500",
    },
};

const badgeStyles = {
    live: "bg-lime-500/15 border-lime-500/40 text-lime-400",
    dev: "bg-blue-500/15 border-blue-500/40 text-blue-400",
    soon: "bg-neutral-800 border-neutral-700 text-neutral-400",
};

const badgeDot = {
    live: "bg-lime-500 animate-pulse",
    dev: "bg-blue-500 animate-pulse",
    soon: "bg-neutral-500",
};

const deployModes = [
    {
        icon: Cloud,
        title: "SaaS",
        desc: "Subscribe and go live instantly. We host, maintain, and scale it for you.",
        color: "text-lime-500",
        border: "border-lime-500/20",
        bg: "bg-lime-500/5",
    },
    {
        icon: HardDrive,
        title: "Self-Hosted",
        desc: "We deploy it on your own servers or cloud. Full ownership of your data.",
        color: "text-orange-500",
        border: "border-orange-500/20",
        bg: "bg-orange-500/5",
    },
];

const SolutionCard = ({ solution, index }) => {
    const c = accentConfig[solution.accent];
    const Icon = solution.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className={`group relative rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden hover:border-neutral-700 transition-all duration-400`}
        >
            {/* Top gradient strip */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${c.glow} to-transparent`} />

            <div className="p-6">
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${c.bg} border ${c.border}`}>
                        <Icon size={22} className={c.icon} />
                    </div>
                    {/* Status badge */}
                    <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${badgeStyles[solution.badgeType]}`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${badgeDot[solution.badgeType]}`} />
                        {solution.badge}
                    </span>
                </div>

                {/* Label pill */}
                <div className={`inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-medium mb-3 ${c.pill}`}>
                    {solution.label}
                </div>

                <h3 className={`text-xl font-bold mb-0.5 ${c.text} transition-colors`}>
                    {solution.title}
                </h3>
                <p className="text-xs text-neutral-500 mb-3 font-medium uppercase tracking-wider">
                    {solution.tagline}
                </p>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                    {solution.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-5">
                    {solution.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2">
                            <CheckCircle2 size={13} className={`flex-shrink-0 ${c.check}`} />
                            <span className="text-xs text-neutral-300">{feat}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA */}
                <Link
                    to="/contact"
                    className={`inline-flex items-center gap-2 text-xs font-semibold ${c.text} hover:gap-3 transition-all duration-200`}
                >
                    {solution.badgeType === "soon" ? "Get Notified" : "Learn More"}{" "}
                    <ArrowRight size={13} />
                </Link>
            </div>
        </motion.div>
    );
};

const QodeSolutions = () => {
    return (
        <section className="w-full bg-black py-24 px-4 sm:px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-500/30 bg-lime-500/10 mb-6">
                        <Sparkles size={13} className="text-lime-500" />
                        <span className="text-xs font-medium text-lime-500 uppercase tracking-wider">
                            Qode Solutions
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
                        Software You Can{" "}
                        <span className="bg-gradient-to-r from-lime-500 to-orange-500 bg-clip-text text-transparent">
                            Buy or Subscribe
                        </span>
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Ready-made enterprise systems built to run your business — available as a SaaS subscription or a one-time self-hosted install.
                    </p>
                </motion.div>

                {/* Deploy modes */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="flex flex-wrap justify-center gap-4 mb-14"
                >
                    {deployModes.map((mode) => {
                        const ModeIcon = mode.icon;
                        return (
                            <div
                                key={mode.title}
                                className={`flex items-center gap-3 px-5 py-3 rounded-xl border ${mode.border} ${mode.bg}`}
                            >
                                <ModeIcon size={18} className={mode.color} />
                                <div>
                                    <span className={`text-sm font-semibold ${mode.color}`}>
                                        {mode.title}
                                    </span>
                                    <p className="text-xs text-neutral-500 max-w-[220px]">
                                        {mode.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Solution cards grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
                    {solutions.map((solution, i) => (
                        <SolutionCard key={solution.id} solution={solution} index={i} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-neutral-500 text-sm mb-5">
                        Need a custom solution tailored to your industry?
                    </p>
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 py-3 px-7 text-base font-semibold text-black rounded-full bg-lime-500 hover:bg-lime-600 transition-all duration-300 shadow-lg shadow-lime-500/20"
                    >
                        Talk to Us <ArrowRight size={18} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default QodeSolutions;
