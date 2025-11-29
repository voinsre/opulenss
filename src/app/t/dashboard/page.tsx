"use client";

import { useUser } from "@/context/user-context";
import { MOCK_EVENTS } from "@/lib/data";
import { Talent } from "@/types";
import { Calendar, MapPin, Clock, CheckCircle, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";

export default function TalentDashboard() {
    const { user } = useUser();
    const talent = user as Talent;
    const [availableTonight, setAvailableTonight] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    if (!talent) return null;

    const opportunities = MOCK_EVENTS.filter(e =>
        (e.invitedTalentIds.includes(talent.id) || e.interestedTalentIds.includes(talent.id)) &&
        !e.confirmedTalentIds.includes(talent.id) &&
        e.status === "Upcoming"
    );

    const confirmedEvents = MOCK_EVENTS.filter(e =>
        e.confirmedTalentIds.includes(talent.id) &&
        e.status === "Upcoming"
    );

    const handleAccept = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    return (
        <div className="min-h-full p-8 relative overflow-hidden">
            {/* Confetti / Golden Ticket Effect */}
            <AnimatePresence>
                {showConfetti && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        <motion.div
                            initial={{ scale: 0.5, y: 100 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative z-10 bg-gold text-emerald-deep p-12 rounded-xl shadow-[0_0_100px_rgba(208,169,105,0.8)] text-center border-4 border-white/20"
                        >
                            <h2 className="font-display text-4xl mb-2">You're On The List</h2>
                            <p className="font-medium uppercase tracking-widest">Access Granted</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto space-y-12 relative z-10">
                {/* Hero Strip */}
                <div className="flex flex-col md:flex-row justify-between items-end pb-8 border-b border-white/10 gap-6">
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-display text-bone"
                        >
                            The Green Room
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-bone/60 mt-2 text-lg"
                        >
                            Welcome back, <span className="text-emerald-400">{talent.stageName || talent.name}</span>.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md"
                    >
                        <span className={`text-sm font-medium transition-colors ${availableTonight ? "text-emerald-400" : "text-bone/50"}`}>
                            {availableTonight ? "Available Tonight" : "Set Available Tonight"}
                        </span>
                        <Switch checked={availableTonight} onCheckedChange={setAvailableTonight} />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Column */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Opportunities */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-gold/10 rounded-lg text-gold">
                                    <Star className="w-5 h-5" />
                                </div>
                                <h2 className="text-2xl font-display text-bone">Opportunities</h2>
                            </div>

                            {opportunities.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4">
                                    {opportunities.map((event, i) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 + (i * 0.1) }}
                                            className="group relative bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-500 overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6">
                                                <div>
                                                    <div className="flex gap-2 mb-2">
                                                        <span className="bg-gold/20 text-gold text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm font-medium">{event.type}</span>
                                                        {event.invitedTalentIds.includes(talent.id) && (
                                                            <span className="bg-emerald-400/20 text-emerald-400 text-[10px] uppercase tracking-wider px-2 py-1 rounded-sm font-medium">Invited</span>
                                                        )}
                                                    </div>
                                                    <h3 className="font-display text-2xl text-bone mb-2 group-hover:text-gold transition-colors">{event.title}</h3>
                                                    <p className="text-bone/60 mb-4 max-w-md line-clamp-2">{event.description}</p>
                                                    <div className="flex items-center gap-4 text-sm text-bone/40">
                                                        <span>{event.date}</span>
                                                        <span>•</span>
                                                        <span>{event.area}</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col justify-center gap-3 min-w-[140px]">
                                                    <Button onClick={handleAccept} className="bg-gold text-emerald-deep hover:bg-gold/90 w-full">
                                                        Accept
                                                    </Button>
                                                    <Link href={`/t/events/${event.id}`}>
                                                        <Button variant="outline" className="border-white/10 text-bone hover:bg-white/5 w-full">
                                                            Details
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/10">
                                    <p className="text-bone/50">No new opportunities. Update your availability to be seen.</p>
                                </div>
                            )}
                        </section>

                        {/* Confirmed Events */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-400/10 rounded-lg text-emerald-400">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <h2 className="text-2xl font-display text-bone">Confirmed</h2>
                            </div>

                            {confirmedEvents.length > 0 ? (
                                <div className="space-y-4">
                                    {confirmedEvents.map(event => (
                                        <div key={event.id} className="bg-black/20 border border-white/5 rounded-xl p-5 flex justify-between items-center opacity-80 hover:opacity-100 transition-opacity">
                                            <div>
                                                <h3 className="font-display text-lg text-bone mb-1">{event.title}</h3>
                                                <div className="flex items-center gap-4 text-sm text-bone/40">
                                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {event.startTime}</span>
                                                </div>
                                            </div>
                                            <Link href={`/t/events/${event.id}`}>
                                                <Button size="sm" variant="ghost" className="text-bone/60 hover:text-bone">View <ArrowRight className="ml-1 w-3 h-3" /></Button>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-bone/40 text-sm italic">No confirmed events yet.</p>
                            )}
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="space-y-6">
                        <div className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
                            <h3 className="font-display text-lg text-bone mb-6">Your Reach</h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-bone/60">Profile Views</span>
                                        <span className="text-emerald-400 font-medium">+12%</span>
                                    </div>
                                    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "75%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-emerald-400"
                                        />
                                    </div>
                                    <p className="text-xs text-bone/30 mt-2">124 views this week</p>
                                </div>

                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-bone/60">Response Rate</span>
                                        <span className="text-gold font-medium">High</span>
                                    </div>
                                    <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "90%" }}
                                            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                                            className="h-full bg-gold"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Link href="/t/profile">
                                <Button className="w-full mt-8 bg-white/10 hover:bg-white/20 text-bone border border-white/10">
                                    Edit Profile
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
