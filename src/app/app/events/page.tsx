"use client";

import { useUser } from "@/context/user-context";
import { MOCK_EVENTS } from "@/lib/data";
import { Client } from "@/types";
import { Calendar, MapPin, Users, Plus, Clock, Wine } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ClientEventsPage() {
    const { user } = useUser();
    const client = user as Client;

    if (!client) return null;

    const events = MOCK_EVENTS.filter(e => e.hostClientId === client.id);

    return (
        <div className="p-8 max-w-[1600px] mx-auto min-h-screen">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-display font-bold text-bone">My Events</h1>
                    <p className="text-bone/60 mt-2 text-lg">Manage your upcoming soirées and gatherings.</p>
                </div>
                <Link href="/app/events/new">
                    <Button className="bg-gold text-emerald-deep hover:bg-gold/90 gap-2 px-6 py-6 text-lg shadow-lg shadow-gold/10">
                        <Plus className="w-5 h-5" /> Create New Event
                    </Button>
                </Link>
            </div>

            <div className="grid gap-6">
                {events.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={`/app/events/${event.id}`}>
                            <div className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-gold/50 hover:bg-white/10 transition-all duration-300 cursor-pointer flex flex-col md:flex-row justify-between md:items-center gap-6 relative overflow-hidden">
                                {/* Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10 flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider border ${event.status === 'Upcoming'
                                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                                            : 'bg-white/5 border-white/10 text-bone/60'
                                            }`}>
                                            {event.status}
                                        </span>
                                        <span className="text-sm text-gold/80 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {event.date}
                                        </span>
                                        <span className="text-bone/40">•</span>
                                        <span className="text-sm text-bone/60 flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {event.startTime}
                                        </span>
                                    </div>
                                    <h3 className="font-display text-3xl text-bone mb-2 group-hover:text-gold transition-colors">{event.title}</h3>
                                    <div className="flex items-center gap-6 text-sm text-bone/60">
                                        <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold/70" /> {event.area}</span>
                                        <span className="flex items-center gap-2"><Users className="w-4 h-4 text-gold/70" /> {event.confirmedTalentIds.length} / {event.desiredTalentCount} Talent Confirmed</span>
                                        <span className="flex items-center gap-2"><Wine className="w-4 h-4 text-gold/70" /> {event.type}</span>
                                    </div>
                                </div>

                                <div className="relative z-10 flex items-center gap-6">
                                    <div className="text-right hidden md:block">
                                        <div className="text-2xl font-display font-bold text-bone">{event.expectedGuests}</div>
                                        <div className="text-xs uppercase tracking-widest text-bone/40">Guests</div>
                                    </div>
                                    <div className="h-12 w-px bg-white/10 hidden md:block" />
                                    <Button variant="outline" className="w-full md:w-auto border-white/20 text-bone hover:bg-white/10 hover:text-gold hover:border-gold/50 transition-all">
                                        Manage Event
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}

                {events.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24 bg-white/5 backdrop-blur-sm rounded-2xl border border-dashed border-white/10"
                    >
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Wine className="w-8 h-8 text-bone/20" />
                        </div>
                        <h3 className="text-xl font-display text-bone mb-2">No Events Yet</h3>
                        <p className="text-bone/40 mb-8 max-w-md mx-auto">Start planning your first exclusive gathering. Invite talent, manage guests, and create unforgettable moments.</p>
                        <Link href="/app/events/new">
                            <Button className="bg-gold text-emerald-deep hover:bg-gold/90 px-8 py-6">Create Your First Event</Button>
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
