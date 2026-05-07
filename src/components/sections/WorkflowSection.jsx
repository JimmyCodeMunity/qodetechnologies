import React from "react";
import { motion } from "motion/react";
import {
  MessageSquare,
  Lightbulb,
  Code2,
  Rocket,
  Wrench,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: <MessageSquare size={24} className="text-lime-500" />,
    number: "01",
    title: "Discovery",
    desc: "We dive deep into your vision, users, and market. Every great product starts with understanding the problem, not the solution.",
  },
  {
    icon: <Lightbulb size={24} className="text-orange-500" />,
    number: "02",
    title: "Strategy & Design",
    desc: "Wireframes, prototypes, and a technical roadmap. We align on architecture, tech stack, and milestones before a single line of code.",
  },
  {
    icon: <Code2 size={24} className="text-blue-500" />,
    number: "03",
    title: "Engineering",
    desc: "Two-week sprints, daily standups, and transparent demos. You see progress in real time and pivot when opportunities emerge.",
  },
  {
    icon: <Rocket size={24} className="text-purple-500" />,
    number: "04",
    title: "Launch",
    desc: "Rigorous QA, performance testing, and smooth deployment to production. We handle app store submissions and cloud provisioning.",
  },
  {
    icon: <Wrench size={24} className="text-pink-500" />,
    number: "05",
    title: "Scale & Optimize",
    desc: "Post-launch monitoring, user feedback loops, and continuous improvement. Your product evolves as your business grows.",
  },
];

const WorkflowSection = () => {
  return (
    <section className="w-full bg-black py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-500/30 bg-lime-500/10 mb-6">
            <span className="text-xs font-medium text-lime-500 uppercase tracking-wider">
              How We Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            From Idea to{" "}
            <span className="bg-gradient-to-r from-lime-500 to-orange-500 bg-clip-text text-transparent">
              Impact
            </span>
          </h2>
          <p className="text-neutral-400 max-w-xl mx-auto">
            A proven process refined across 150+ projects. Transparent,
            collaborative, and obsessively focused on outcomes.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lime-500/50 via-orange-500/30 to-transparent" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-16 md:items-center ${i > 0 ? "md:mt-12" : ""
                    }`}
                >
                  {/* Connector Dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-black border-2 border-lime-500 z-10 items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-lime-500" />
                  </div>

                  {/* Left side */}
                  <div
                    className={`${isLeft ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"
                      }`}
                  >
                    <div
                      className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : ""
                        }`}
                    >
                      <span className="text-4xl font-bold text-neutral-800">
                        {step.number}
                      </span>
                      <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-500 mb-2">{step.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                      {step.desc}
                    </p>
                  </div>

                  {/* Empty spacer for opposite side */}
                  <div
                    className={`hidden md:block ${isLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1"
                      }`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
