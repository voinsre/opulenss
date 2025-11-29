"use client";

import { MOCK_TALENT } from "@/lib/data";
import { MapPin, LayoutGrid, Film, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TalentCarousel } from "@/components/features/talent/talent-carousel";
import { motion, AnimatePresence } from "framer-motion";

export default function TalentDiscoveryPage() {
    const [filterCity, setFilterCity] = useState("All");
    const [viewMode, setViewMode] = useState<"grid" | "reel">("reel");
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    // Mock favorites state - in a real app this would come from user context or API
    const [favorites, setFavorites] = useState<string[]>(["t1", "t3", "t17"]);

    const cities = ["All", ...Array.from(new Set(MOCK_TALENT.map(t => t.city)))];

    const toggleFavorite = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        e.stopPropagation();
        setFavorites(prev =>
            prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
        );
    };

    const filteredTalent = MOCK_TALENT.filter(t => {
        const matchesCity = filterCity === "All" || t.city === filterCity;
        const matchesFavorite = !showFavoritesOnly || favorites.includes(t.id);
        return matchesCity && matchesFavorite;
    });

    return (
        <div className="p-8 max-w-[1600px] mx-auto min-h-screen pt-24">
            <div className="flex flex-col xl:flex-row justify-between items-end gap-8 mb-12">
                <div className="space-y-2">
                    <h1 className="text-5xl font-display font-bold text-bone">Curated Talent</h1>
                    <p className="text-bone/60 text-lg max-w-md">Discover and invite exceptional guests for your events.</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    {/* View Toggle */}
                    <div className="flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
                        <button
                            onClick={() => setViewMode("reel")}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${viewMode === "reel"
                                ? "bg-gold text-emerald-deep shadow-[0_0_20px_rgba(208,169,105,0.2)]"
                                : "text-bone/60 hover:text-bone hover:bg-white/5"
                                }`}
                        >
                            <Film className="w-4 h-4" />
                            Reel
                        </button>
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${viewMode === "grid"
                                ? "bg-gold text-emerald-deep shadow-[0_0_20px_rgba(208,169,105,0.2)]"
                                : "text-bone/60 hover:text-bone hover:bg-white/5"
                                }`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                            Grid
                        </button>
                    </div>

                    <div className="h-8 w-px bg-white/10 mx-2 hidden md:block" />

                    {/* Favorites Toggle */}
                    <button
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className={`flex items-center gap-2 px-6 py-3.5 rounded-full border text-sm font-medium transition-all duration-300 ${showFavoritesOnly
                            ? "bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                            : "bg-white/5 border-white/10 text-bone/60 hover:border-white/20 hover:text-bone hover:bg-white/10"
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${showFavoritesOnly ? "fill-current" : ""}`} />
                        Favorites <span className="ml-1 opacity-60">({favorites.length})</span>
                    </button>

                    {/* Filter */}
                    <div className="flex gap-2 overflow-x-auto no-scrollbar">
                        {cities.map(city => (
                            <button
                                key={city}
                                onClick={() => setFilterCity(city)}
                                className={`px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap border ${filterCity === city
                                    ? "bg-emerald-deep border-gold text-gold shadow-[0_0_15px_rgba(208,169,105,0.1)]"
                                    : "bg-white/5 border-white/10 text-bone/60 hover:border-white/20 hover:text-bone hover:bg-white/10"
                                    }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {viewMode === "reel" ? (
                    <motion.div
                        key="reel"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                    >
                        <TalentCarousel talents={filteredTalent} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                    >
                        {filteredTalent.map((talent, index) => (
                            <motion.div
                                key={talent.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link href={`/app/talent/${talent.id}`}>
                                    <div className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500 relative">
                                        {/* Image */}
                                        <div className="aspect-[4/5] relative overflow-hidden">
                                            <img
                                                src={talent.gallery[0] || talent.avatarUrl}
                                                alt={talent.stageName}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                                            {/* Favorite Button Overlay */}
                                            <button
                                                onClick={(e) => toggleFavorite(e, talent.id)}
                                                className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-bone/60 hover:text-red-500 hover:bg-white/10 transition-all group-hover:opacity-100 opacity-0"
                                            >
                                                <Heart className={`w-4 h-4 ${favorites.includes(talent.id) ? "fill-red-500 text-red-500" : ""}`} />
                                            </button>

                                            {/* Overlay Info */}
                                            <div className="absolute bottom-0 left-0 right-0 p-5 text-bone transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                                <h3 className="font-display text-2xl font-bold mb-1">{talent.stageName || talent.name}</h3>
                                                <div className="flex items-center gap-3 text-sm text-bone/70 mb-3">
                                                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-gold" /> {talent.city}</span>
                                                </div>

                                                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                    {talent.styleTags.slice(0, 2).map(tag => (
                                                        <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-gold/10 border border-gold/20 text-gold rounded-sm">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Indicator */}
                                        <div className="absolute top-4 right-4">
                                            <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] ${talent.availabilityStatus === 'Available' ? 'bg-emerald-500 text-emerald-500' : 'bg-red-500 text-red-500'
                                                }`} />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
