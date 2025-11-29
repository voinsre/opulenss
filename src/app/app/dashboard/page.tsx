"use client";

import { useUser } from "@/context/user-context";
import { MOCK_EVENTS } from "@/lib/data";
import { Client } from "@/types";
import { ArrowRight, Plus, Search, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function ClientDashboard() {
    const { user } = useUser();
    const client = user as Client;

    if (!client) return null;

    const upcomingEvents = MOCK_EVENTS.filter(e =>
        e.hostClientId === client.id && e.status === "Upcoming"
    );

    const greetingTime = new Date().getHours() < 12 ? "Good morning" : new Date().getHours() < 18 ? "Good afternoon" : "Good evening";

    return (
        <div className="min-h-full p-8 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

            <div className="max-w-5xl mx-auto relative z-10 space-y-12">
                {/* Greeting Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="pt-12"
                >
                    <h1 className="font-display text-5xl md:text-6xl text-bone mb-4">
                        {greetingTime}, <span className="text-gold italic">{client.name.split(' ')[0]}</span>.
                    </h1>
                    <p className="text-xl text-bone/60 font-light max-w-2xl leading-relaxed">
                        Your Friday night is currently open. The city is alive with possibilities.
                        Shall we arrange something exceptional?
                    </p>
                </motion.div>

                {/* Quick Actions / Concierge Menu */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <Link href="/app/events/new" className="group">
                        <div className="h-full bg-white/5 border border-white/10 hover:border-gold/50 p-8 rounded-xl transition-all duration-500 hover:bg-white/10 flex flex-col justify-between min-h-[200px] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-6 text-gold group-hover:scale-110 transition-transform duration-500">
                                    <Plus className="w-6 h-6" />
                                </div>
                                <h3 className="font-display text-2xl text-bone mb-2">Host an Event</h3>
                                <p className="text-sm text-bone/60">Curate a gathering for the weekend.</p>
                            </div>
                            <div className="relative z-10 flex justify-end mt-4">
                                <ArrowRight className="w-5 h-5 text-gold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>
                        </div>
                    </Link>

                    <Link href="/app/talent" className="group">
                        <div className="h-full bg-white/5 border border-white/10 hover:border-emerald-400/50 p-8 rounded-xl transition-all duration-500 hover:bg-white/10 flex flex-col justify-between min-h-[200px] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-emerald-400/20 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                                    <Search className="w-6 h-6" />
                                </div>
                                <h3 className="font-display text-2xl text-bone mb-2">Discover Talent</h3>
                                <p className="text-sm text-bone/60">Find the perfect guests for your list.</p>
                            </div>
                            <div className="relative z-10 flex justify-end mt-4">
                                <ArrowRight className="w-5 h-5 text-emerald-400 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>
                        </div>
                    </Link>

                    <Link href="/app/concierge" className="group">
                        <div className="h-full bg-white/5 border border-white/10 hover:border-rosegold/50 p-8 rounded-xl transition-all duration-500 hover:bg-white/10 flex flex-col justify-between min-h-[200px] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-rosegold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-full bg-rosegold/20 flex items-center justify-center mb-6 text-rosegold group-hover:scale-110 transition-transform duration-500">
                                    <Calendar className="w-6 h-6" />
                                </div>
                                <h3 className="font-display text-2xl text-bone mb-2">Concierge</h3>
                                <p className="text-sm text-bone/60">Request a table or custom arrangement.</p>
                            </div>
                            <div className="relative z-10 flex justify-end mt-4">
                                <ArrowRight className="w-5 h-5 text-rosegold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Upcoming Events Preview */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                        <h2 className="text-xl font-display text-bone">Your Calendar</h2>
                        <Link href="/app/events" className="text-sm text-gold hover:text-bone transition-colors">View All</Link>
                    </div>

                    {upcomingEvents.length > 0 ? (
                        <div className="space-y-4">
                            {upcomingEvents.map((event, i) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                >
                                    <Link href={`/app/events/${event.id}`}>
                                        <div className="group flex items-center gap-6 p-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 cursor-pointer">
                                            <div className="w-16 h-16 rounded-lg bg-white/10 flex flex-col items-center justify-center border border-white/10 group-hover:border-gold/30 transition-colors">
                                                <span className="text-xs text-bone/60 uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                                <span className="text-xl font-display text-gold">{new Date(event.date).getDate()}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-display text-bone group-hover:text-gold transition-colors">{event.title}</h3>
                                                <p className="text-sm text-bone/50">{event.startTime} • {event.area}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-medium text-emerald-400">{event.confirmedTalentIds.length} Guests</div>
                                                <div className="text-xs text-bone/30">Confirmed</div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-bone/40 italic">No upcoming events. The night is yours to design.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
