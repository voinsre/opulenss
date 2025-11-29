"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    variant?: "light" | "dark";
    collapsed?: boolean;
}

export function Logo({ className, variant = "light", collapsed = false }: LogoProps) {
    const color = variant === "light" ? "#F3EEE7" : "#044830"; // Bone or Emerald Deep
    const accent = "#D0A969"; // Gold

    return (
        <div className={cn("flex items-center gap-3 group cursor-pointer", className)}>
            <motion.div
                className="relative w-10 h-10 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {/* Glow Effect */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-gold/20 blur-md"
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Animated Icon (Stylized Gem/O) */}
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10"
                >
                    <motion.path
                        d="M20 5L25 15L35 20L25 25L20 35L15 25L5 20L15 15L20 5Z"
                        stroke={accent}
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <motion.circle
                        cx="20"
                        cy="20"
                        r="3"
                        fill={accent}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, duration: 0.5, type: "spring" }}
                    />
                    <motion.circle
                        cx="20"
                        cy="20"
                        r="14"
                        stroke={color}
                        strokeWidth="1"
                        strokeOpacity="0.5"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.5 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        style={{ originX: "20px", originY: "20px" }}
                        whileHover={{ rotate: 180, scale: 1.1, transition: { duration: 1 } }}
                    />
                </svg>
            </motion.div>

            {!collapsed && (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="flex flex-col"
                >
                    <span className={cn("font-display text-2xl tracking-wide leading-none", variant === "light" ? "text-bone" : "text-emerald-deep")}>
                        Opulenss
                    </span>
                    <span className={cn("text-[0.6rem] uppercase tracking-[0.3em] opacity-60", variant === "light" ? "text-bone" : "text-emerald-deep")}>
                        Private Club
                    </span>
                </motion.div>
            )}
        </div>
    );
}
