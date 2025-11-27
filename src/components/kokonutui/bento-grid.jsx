"use client";
/**
 * @author: @dorian_baffier
 * @description: Bento Grid
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import Anthropic from "./anthropic";
import AnthropicDark from "./anthropic-dark";
import Google from "./gemini";
import OpenAI from "./open-ai";
import OpenAIDark from "./open-ai-dark";
import MistralAI from "./mistral";
import DeepSeek from "./deepseek";
import {
  Mic,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";

import { useState, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";
import SpotlightCard from "../ui/SpotlightCard";
import { IconCloudDemo } from "../ui/iccloud";

const bentoItems = [
  {
    id: "main",
    title: "Building tomorrow's technology",
    description:
      "We architect and develop enterprise-grade applications that scale seamlessly with cloud-native technologies and microservices.",
    href: "#",
    feature: "spotlight",
    spotlightItems: [
      "Microservices architecture",
      "Serverless computing",
      "Container orchestration",
      "API-first design",
      "Event-driven systems",
    ],
    size: "lg",
    className: "col-span-2 row-span-1 md:col-span-2 md:row-span-1",
  },
  {
    id: "stat1",
    title: "AI Agents & Automation",
    description:
      "Intelligent agents that learn, adapt, and automate complex workflows",
    href: "#",
    feature: "typing",
    typingText:
      "const createAgent = async () => {\n  const agent = new AIAgent({\n    model: 'gpt-4-turbo',\n    tools: [codeAnalysis, dataProcessing],\n    memory: new ConversationalMemory()\n  });\n\n  // Train on domain knowledge\n  await agent.learn(domainData);\n\n  return agent;\n};",
    size: "md",
    className: "col-span-2 row-span-1 col-start-1 col-end-3",
  },
  {
    id: "partners",
    title: "Trusted partners",
    description:
      "Working with the leading AI and cloud providers to deliver cutting-edge solutions",
    icons: true,
    href: "#",
    feature: "icons",
    size: "md",
    className: "col-span-1 row-span-1",
  },
  {
    id: "innovation",
    title: "Innovation timeline",
    description:
      "Pioneering the future of AI and cloud computing with breakthrough innovations",
    href: "#",
    feature: "timeline",
    timeline: [
      { year: "2020", event: "Launch of Cloud-Native Platform" },
      { year: "2021", event: "Advanced AI Integration & LLM APIs" },
      { year: "2022", event: "Multi-Agent Systems & RAG Architecture" },
      { year: "2023", event: "Autonomous AI Agents & Neural Networks" },
      {
        year: "2024",
        event: "AGI-Ready Infrastructure & Edge Computing",
      },
    ],
    size: "sm",
    className: "col-span-1 row-span-1",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const SpotlightFeature = ({ items }) => {
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item, index) => (
        <motion.li
          key={`spotlight-${item.toLowerCase().replace(/\s+/g, "-")}`}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * index }}
          className="flex items-center gap-2"
        >
          <CheckCircle2 className="h-4 w-4 text-lime-500 dark:text-lime-400 flex-shrink-0" />
          <span className="text-sm text-neutral-300 dark:text-neutral-300">
            {item}
          </span>
        </motion.li>
      ))}
    </ul>
  );
};

const CounterAnimation = ({ start, end, suffix = "" }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    let currentFrame = 0;
    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const easedProgress = 1 - (1 - progress) ** 3;
      const current = start + (end - start) * easedProgress;

      setCount(Math.min(current, end));

      if (currentFrame === totalFrames) {
        clearInterval(counter);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [start, end]);

  return (
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        {count.toFixed(1).replace(/\.0$/, "")}
      </span>
      <span className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
        {suffix}
      </span>
    </div>
  );
};

const ChartAnimation = ({ value }) => {
  return (
    <div className="mt-2 w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  );
};

const IconsFeature = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <motion.div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-neutral-100/80 to-neutral-100 dark:from-neutral-800/80 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <OpenAI className="w-7 h-7 dark:hidden transition-transform " />
          <OpenAIDark className="w-7 h-7 hidden dark:block transition-transform " />
        </div>
        <span className="text-xs font-medium text-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
          OpenAI
        </span>
      </motion.div>
      <motion.div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-neutral-100/80 to-neutral-100 dark:from-neutral-800/80 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Anthropic className="w-7 h-7 dark:hidden transition-transform " />
          <AnthropicDark className="w-7 h-7 hidden dark:block transition-transform " />
        </div>
        <span className="text-xs font-medium text-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
          Anthropic
        </span>
      </motion.div>
      <motion.div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-neutral-100/80 to-neutral-100 dark:from-neutral-800/80 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Google className="w-7 h-7 transition-transform " />
        </div>
        <span className="text-xs font-medium text-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
          Google
        </span>
      </motion.div>
      <motion.div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-neutral-100/80 to-neutral-100 dark:from-neutral-800/80 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <MistralAI className="w-7 h-7 transition-transform " />
        </div>
        <span className="text-xs font-medium text-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
          Mistral
        </span>
      </motion.div>
      <motion.div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-neutral-100/80 to-neutral-100 dark:from-neutral-800/80 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <DeepSeek className="w-7 h-7 transition-transform " />
        </div>
        <span className="text-xs font-medium text-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
          DeepSeek
        </span>
      </motion.div>
      <motion.div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gradient-to-b from-neutral-100/80 to-neutral-100 dark:from-neutral-800/80 dark:to-neutral-800 border border-neutral-200/50 dark:border-neutral-700/50 group transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-600">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Plus className="w-6 h-6 text-neutral-600 dark:text-neutral-400 transition-transform " />
        </div>
        <span className="text-xs font-medium text-center text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
          More
        </span>
      </motion.div>
    </div>
  );
};

const TimelineFeature = ({ timeline }) => {
  return (
    <div className="mt-3 relative">
      <div className="absolute top-0 bottom-0 left-[9px] w-[2px] bg-neutral-200 dark:bg-neutral-700" />
      {timeline.map((item) => (
        <motion.div
          key={`timeline-${item.year}-${item.event
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          className="flex gap-3 mb-3 relative"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: (0.15 * Number.parseInt(item.year)) % 10,
          }}
        >
          <div className="w-5 h-5 rounded-full bg-neutral-100 dark:bg-neutral-800 border-2 border-neutral-300 dark:border-neutral-600 flex-shrink-0 z-10 mt-0.5" />
          <div>
            <div className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {item.year}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">
              {item.event}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const TypingCodeFeature = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);

        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, Math.random() * 30 + 10); // Random typing speed for realistic effect

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  // Reset animation when component unmounts and remounts
  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mt-3 relative">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-xs text-green-500 dark:text-neutral-400">
          qode.ts
        </div>
      </div>
      <div
        ref={terminalRef}
        className="bg-black dark:bg-black text-lime-500 p-3 rounded-md text-xs font-mono h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-700"
      >
        <pre className="whitespace-pre-wrap">
          {displayedText}
          <span className="animate-pulse">|</span>
        </pre>
      </div>
    </div>
  );
};

const MetricsFeature = ({ metrics }) => {
  const getColorClass = (color = "emerald") => {
    const colors = {
      emerald: "bg-emerald-500 dark:bg-emerald-400",
      blue: "bg-blue-500 dark:bg-blue-400",
      violet: "bg-violet-500 dark:bg-violet-400",
      amber: "bg-amber-500 dark:bg-amber-400",
      rose: "bg-rose-500 dark:bg-rose-400",
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="mt-3 space-y-3">
      {metrics.map((metric, index) => (
        <motion.div
          key={`metric-${metric.label.toLowerCase().replace(/\s+/g, "-")}`}
          className="space-y-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 * index }}
        >
          <div className="flex justify-between items-center text-sm">
            <div className="text-neutral-700 dark:text-neutral-300 font-medium flex items-center gap-1.5">
              {metric.label === "Uptime" && <Clock className="w-3.5 h-3.5" />}
              {metric.label === "Response time" && (
                <Zap className="w-3.5 h-3.5" />
              )}
              {metric.label === "Cost reduction" && (
                <Sparkles className="w-3.5 h-3.5" />
              )}
              {metric.label}
            </div>
            <div className="text-neutral-700 dark:text-neutral-300 font-semibold">
              {metric.value}
              {metric.suffix}
            </div>
          </div>
          <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${getColorClass(metric.color)}`}
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(100, metric.value)}%`,
              }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: 0.15 * index,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

function AIInput_Voice() {
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isDemo, setIsDemo] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let intervalId;

    if (submitted) {
      intervalId = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else {
      setTime(0);
    }

    return () => clearInterval(intervalId);
  }, [submitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!isDemo) return;

    let timeoutId;
    const runAnimation = () => {
      setSubmitted(true);
      timeoutId = setTimeout(() => {
        setSubmitted(false);
        timeoutId = setTimeout(runAnimation, 1000);
      }, 3000);
    };

    const initialTimeout = setTimeout(runAnimation, 100);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(initialTimeout);
    };
  }, [isDemo]);

  const handleClick = () => {
    if (isDemo) {
      setIsDemo(false);
      setSubmitted(false);
    } else {
      setSubmitted((prev) => !prev);
    }
  };

  return (
    <div className="w-full py-4">
      <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
        <button
          className={cn(
            "group w-16 h-16 rounded-xl flex items-center justify-center transition-colors",
            submitted
              ? "bg-none"
              : "bg-none hover:bg-black/10 dark:hover:bg-white/10"
          )}
          type="button"
          onClick={handleClick}
        >
          {submitted ? (
            <div
              className="w-6 h-6 rounded-sm animate-spin bg-white  dark:bg-white cursor-pointer pointer-events-auto"
              style={{ animationDuration: "3s" }}
            />
          ) : (
            <Mic className="w-6 h-6 text-lime-500 dark:text-white/70" />
          )}
        </button>

        <span
          className={cn(
            "font-mono text-sm transition-opacity duration-300",
            submitted
              ? "text-white dark:text-white/70"
              : "text-lime-500 dark:text-white/30"
          )}
        >
          {formatTime(time)}
        </span>

        <div className="h-4 w-64 flex items-center justify-center gap-0.5">
          {[...Array(48)].map((_, i) => (
            <div
              key={`voice-bar-${i}`}
              className={cn(
                "w-0.5 rounded-full transition-all duration-300",
                submitted
                  ? "bg-white dark:bg-white/50 animate-pulse"
                  : "bg-lime-500 dark:bg-white/10 h-1"
              )}
              style={
                submitted && isClient
                  ? {
                      height: `${20 + Math.random() * 80}%`,
                      animationDelay: `${i * 0.05}s`,
                    }
                  : undefined
              }
            />
          ))}
        </div>

        <p className="h-4 text-xs text-lime-500 dark:text-white/70">
          {submitted ? "Listening..." : "Click to speak"}
        </p>
      </div>
    </div>
  );
}

const BentoCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [2, -2]);
  const rotateY = useTransform(x, [-100, 100], [-2, 2]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <SpotlightCard
        href={item.href || "#"}
        className={`
                    group relative flex flex-col gap-4 h-full rounded-xl p-5
                    bg-black text-white
                    transition-all duration-500 ease-out ${item.className}
                `}
        tabIndex={0}
        aria-label={`${item.title} - ${item.description}`}
      >
        <div
          className="relative z-10 flex flex-col gap-3 h-full"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="space-y-2 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold tracking-tight text-white dark:text-neutral-100 group-hover:text-lime-500 dark:group-hover:text-neutral-300 transition-colors duration-300">
                {item.title}
              </h3>
              <div className="text-neutral-400 dark:text-neutral-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>

            <p className="text-sm text-white dark:text-neutral-400 tracking-tight">
              {item.description}
            </p>

            {/* Feature specific content */}
            {item.feature === "spotlight" && item.spotlightItems && (
              <SpotlightFeature items={item.spotlightItems} />
            )}

            {item.feature === "counter" && item.statistic && (
              <div className="mt-auto pt-3">
                <CounterAnimation
                  start={item.statistic.start || 0}
                  end={item.statistic.end || 100}
                  suffix={item.statistic.suffix}
                />
              </div>
            )}

            {item.feature === "chart" && item.statistic && (
              <div className="mt-auto pt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-white dark:text-neutral-300">
                    {item.statistic.label}
                  </span>
                  <span className="text-sm font-medium text-white dark:text-neutral-300">
                    {item.statistic.end}
                    {item.statistic.suffix}
                  </span>
                </div>
                <ChartAnimation value={item.statistic.end || 0} />
              </div>
            )}

            {item.feature === "timeline" && item.timeline && (
              <TimelineFeature timeline={item.timeline} />
            )}

            {item.feature === "icons" && <IconsFeature />}

            {item.feature === "typing" && item.typingText && (
              <TypingCodeFeature text={item.typingText} />
            )}

            {item.feature === "metrics" && item.metrics && (
              <MetricsFeature metrics={item.metrics} />
            )}

            {item.icons && !item.feature && (
              <div className="mt-auto pt-4 flex items-center flex-wrap gap-4 border-t border-neutral-200/70 dark:border-neutral-800/70">
                <OpenAI className="w-5 h-5 dark:hidden opacity-70 hover:opacity-100 transition-opacity" />
                <OpenAIDark className="w-5 h-5 hidden dark:block opacity-70 hover:opacity-100 transition-opacity" />
                <AnthropicDark className="w-5 h-5 dark:block hidden opacity-70 hover:opacity-100 transition-opacity" />
                <Anthropic className="w-5 h-5 dark:hidden opacity-70 hover:opacity-100 transition-opacity" />
                <Google className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
                <MistralAI className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
                <DeepSeek className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default function BentoGrid() {
  return (
    <section className="relative py-24 sm:py-32 bg-black dark:bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-6"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div variants={fadeInUp} className="md:col-span-1">
              <BentoCard item={bentoItems[0]} />
            </motion.div>
            <motion.div variants={fadeInUp} className="md:col-span-2">
              <BentoCard item={bentoItems[1]} />
            </motion.div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp} className="md:col-span-1">
              <BentoCard item={bentoItems[2]} />
            </motion.div>
            <motion.div
              variants={fadeInUp}
              //   className="md:col-span-1 rounded-xl overflow-hidden bg-gradient-to-b from-neutral-50/80 to-neutral-50 dark:from-neutral-900/80 dark:to-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 hover:border-neutral-400/30 dark:hover:border-neutral-600/30 hover:shadow-lg hover:shadow-neutral-200/20 dark:hover:shadow-neutral-900/20 transition-all duration-300"
            >
              <SpotlightCard
                className="custom-spotlight-  w-full space-y-5 p-4 border-1 border-neutral-600"
                spotlightColor="rgba(0, 229, 255, 0.2)"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      Variety Of Programming Laguages
                    </h3>
                  </div>
                  {/* <p className="text-sm text-neutral-400 dark:text-neutral-400 tracking-tight mb-4">
                    Interact with our AI using natural voice commands.
                    Experience seamless voice-driven interactions with advanced
                    speech recognition.
                  </p>
                  <AIInput_Voice /> */}
                  <IconCloudDemo />
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
