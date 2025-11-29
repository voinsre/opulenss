"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Talent } from "@/types";
import { Button } from "@/components/ui/button";
import { MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface TalentCarouselProps {
    talents: Talent[];
}

export function TalentCarousel({ talents }: TalentCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % talents.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + talents.length) % talents.length);
    };

    const currentTalent = talents[activeIndex];

    return (
        <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm">
            {/* Background Image with Blur */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentTalent.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={currentTalent.gallery[0] || currentTalent.avatarUrl}
                        alt="Background"
                        className="w-full h-full object-cover blur-3xl scale-110"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Main Carousel Content */}
            <div className="relative z-10 flex items-center gap-8 w-full max-w-6xl px-8">
                {/* Text Content */}
                <div className="flex-1 space-y-6">
                    <motion.div
                        key={`text-${activeIndex}`}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            {currentTalent.styleTags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full border border-gold/30 text-gold text-xs uppercase tracking-widest">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h2 className="text-5xl md:text-7xl font-display font-bold text-bone leading-tight">
                            {currentTalent.stageName || currentTalent.name}
                        </h2>
                        <div className="flex items-center gap-4 text-bone/60 text-lg">
                            <span className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-gold" /> {currentTalent.city}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-gold/50" />
                            <span className="flex items-center gap-2">
                                <Star className="w-5 h-5 text-gold" /> {currentTalent.rating} Rating
                            </span>
                        </div>
                        <p className="text-bone/80 max-w-lg text-lg leading-relaxed">
                            {currentTalent.bio}
                        </p>

                        <div className="flex items-center gap-4 pt-4">
                            <Link href={`/app/talent/${currentTalent.id}`}>
                                <Button className="bg-gold text-emerald-deep hover:bg-gold/90 px-8 py-6 text-lg">
                                    View Profile
                                </Button>
                            </Link>
                            <Button variant="outline" className="border-white/20 text-bone hover:bg-white/10 px-8 py-6 text-lg">
                                Check Availability
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Image Card */}
                <div className="flex-1 flex justify-center relative">
                    <div className="relative w-[400px] h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTalent.id}
                                initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 1.1, rotate: -5 }}
                                transition={{ duration: 0.6 }}
                                className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border border-white/10"
                            >
                                <img
                                    src={currentTalent.gallery[0] || currentTalent.avatarUrl}
                                    alt={currentTalent.stageName}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </motion.div>
                        </AnimatePresence>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-gold/30 rounded-tr-3xl" />
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-gold/30 rounded-bl-3xl" />
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 right-12 flex gap-4 z-20">
                <button
                    onClick={prevSlide}
                    className="p-4 rounded-full border border-white/10 bg-black/40 text-bone hover:bg-gold hover:text-emerald-deep transition-all duration-300"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-4 rounded-full border border-white/10 bg-black/40 text-bone hover:bg-gold hover:text-emerald-deep transition-all duration-300"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
                <motion.div
                    className="h-full bg-gold"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((activeIndex + 1) / talents.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>
        </div>
    );
}
