"use client";

import { MOCK_TALENT } from "@/lib/data";
import { Search, Filter, MoreVertical, Star, MapPin, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AdminTalentPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display text-bone mb-2">Talent Roster</h1>
                    <p className="text-bone/60">Manage talent profiles and verification.</p>
                </div>
                <Button className="bg-gold text-emerald-deep hover:bg-gold/90">
                    Add Talent
                </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bone/40" />
                    <input
                        type="text"
                        placeholder="Search talent..."
                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-bone focus:outline-none focus:border-gold/50 transition-colors"
                    />
                </div>
                <Button variant="outline" className="border-white/10 text-bone hover:bg-white/5 gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                </Button>
            </div>

            {/* Talent Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_TALENT.map((talent, i) => (
                    <motion.div
                        key={talent.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all hover:shadow-lg hover:border-gold/30"
                    >
                        <div className="aspect-[4/5] relative overflow-hidden">
                            <Image
                                src={talent.avatarUrl || talent.gallery[0]}
                                alt={talent.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                            <div className="absolute top-4 right-4">
                                <span className="bg-black/40 backdrop-blur-md border border-white/10 text-bone/80 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <Star className="w-3 h-3 text-gold fill-gold" />
                                    4.9
                                </span>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <h3 className="text-xl font-display text-bone mb-1">{talent.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-bone/60">
                                    <MapPin className="w-3 h-3" />
                                    {talent.city}
                                </div>
                            </div>
                        </div>

                        <div className="p-4 flex items-center justify-between border-t border-white/5">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
                                <CheckCircle className="w-3 h-3" />
                                Verified
                            </span>
                            <Button size="sm" variant="ghost" className="text-bone/60 hover:text-gold hover:bg-white/5">
                                View Profile
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
