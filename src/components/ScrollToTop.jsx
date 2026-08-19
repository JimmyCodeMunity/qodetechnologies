import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? scrollY / docHeight : 0;
            setProgress(pct);
            setVisible(scrollY > 300);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollUp = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // SVG circle progress ring
    const size = 48;
    const strokeWidth = 2.5;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - progress);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    key="scroll-to-top"
                    initial={{ opacity: 0, scale: 0.6, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    onClick={scrollUp}
                    aria-label="Scroll to top"
                    className="fixed bottom-24 right-5 z-50 group"
                    style={{ width: size, height: size }}
                >
                    {/* Progress ring */}
                    <svg
                        width={size}
                        height={size}
                        className="absolute inset-0 -rotate-90"
                        aria-hidden="true"
                    >
                        {/* Track */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth={strokeWidth}
                        />
                        {/* Progress */}
                        <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            fill="none"
                            stroke="#84CC16"
                            strokeWidth={strokeWidth}
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={dashOffset}
                            style={{ transition: "stroke-dashoffset 0.1s linear" }}
                        />
                    </svg>

                    {/* Button face */}
                    <span className="absolute inset-[4px] flex items-center justify-center rounded-full bg-neutral-900 border border-neutral-700 group-hover:bg-neutral-800 group-hover:border-lime-500/50 transition-all duration-200 shadow-lg">
                        <motion.span
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                            className="flex"
                        >
                            <ArrowUp size={16} className="text-lime-500" />
                        </motion.span>
                    </span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
