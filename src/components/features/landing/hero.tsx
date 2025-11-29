"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const HERO_IMAGES = [
    "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=2940&auto=format&fit=crop", // Club vibe
    "https://images.unsplash.com/photo-1514525253440-b393452e3383?q=80&w=2800&auto=format&fit=crop", // Cocktail party
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2940&auto=format&fit=crop", // Elegant couple / luxury
    "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=2835&auto=format&fit=crop", // Elegant dinner
];

export function Hero({ onOpenLogin, onOpenApply }: { onOpenLogin: () => void, onOpenApply: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Rotating Background Carousel */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentImageIndex}
                        src={HERO_IMAGES[currentImageIndex]}
                        alt="Opulenss Atmosphere"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1.05 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
            </motion.div>

            {/* Ornate Frame Border */}
            <div className="absolute top-24 bottom-12 inset-x-4 md:top-28 md:bottom-16 md:inset-x-8 border border-white/20 z-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-20 h-20 md:w-32 md:h-32 border-t-2 border-l-2 border-gold/50" />
                <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 border-t-2 border-r-2 border-gold/50" />
                <div className="absolute bottom-0 left-0 w-20 h-20 md:w-32 md:h-32 border-b-2 border-l-2 border-gold/50" />
                <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32 border-b-2 border-r-2 border-gold/50" />
            </div>

            {/* Content */}
            <div className="relative z-30 text-center max-w-4xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <span className="text-gold tracking-[0.3em] text-sm uppercase mb-6 block font-medium">
                        Est. 2024 • Private Members Club
                    </span>
                </motion.div>

                <motion.h1
                    className="font-display text-5xl md:text-7xl lg:text-8xl mb-8 text-bone leading-[1.1] px-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                    The Art of <br />
                    <span className="italic text-gold gold-gradient-text">Gathering</span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-bone/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    Where exceptional company meets exquisite atmosphere.
                    <br />Strictly by invitation.
                </motion.p>
            </div>
        </div>
    );
}
