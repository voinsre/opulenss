"use client";

import { useUser } from "@/context/user-context";
import { MOCK_EVENTS } from "@/lib/data";
import { Talent } from "@/types";
import { Calendar, MapPin, Clock, CheckCircle, Star, History } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TalentEventsPage() {
    const { user } = useUser();
    const talent = user as Talent;
    const [activeTab, setActiveTab] = useState<'opportunities' | 'confirmed' | 'past'>('opportunities');

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

    const pastEvents = MOCK_EVENTS.filter(e => e.status === "Completed");

    const displayedEvents = activeTab === 'opportunities' ? opportunities : activeTab === 'confirmed' ? confirmedEvents : pastEvents;

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-display text-bone mb-8">My Events</h1>

            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-8">
                <button
                    onClick={() => setActiveTab('opportunities')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'opportunities' ? 'border-gold text-gold' : 'border-transparent text-bone/60 hover:text-bone'}`}
                >
                    <Star className="w-4 h-4" /> Opportunities
                </button>
                <button
                    onClick={() => setActiveTab('confirmed')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'confirmed' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-bone/60 hover:text-bone'}`}
                >
                    <CheckCircle className="w-4 h-4" /> Confirmed
                </button>
                <button
                    onClick={() => setActiveTab('past')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'past' ? 'border-white/50 text-white/50' : 'border-transparent text-bone/60 hover:text-bone'}`}
                >
                    <History className="w-4 h-4" /> Past
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedEvents.map(event => (
                    <Link key={event.id} href={`/t/events/${event.id}`}>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:border-gold/30 cursor-pointer h-full flex flex-col">
                            <div className="flex justify-between items-start mb-3">
                                <span className="bg-white/10 text-bone text-xs px-2 py-1 rounded-full font-medium">
                                    {event.type}
                                </span>
                                {event.invitedTalentIds.includes(talent.id) && activeTab === 'opportunities' && (
                                    <span className="text-xs text-emerald-400 font-medium">Invited</span>
                                )}
                            </div>
                            <h3 className="font-display text-xl text-bone mb-2">{event.title}</h3>
                            <div className="space-y-2 text-sm text-bone/60 mb-4 flex-1">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> {event.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> {event.startTime}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> {event.area}
                                </div>
                            </div>

                            <Button variant="outline" className="w-full border-white/20 text-bone hover:bg-white/10">
                                View Details
                            </Button>
                        </div>
                    </Link>
                ))}

                {displayedEvents.length === 0 && (
                    <div className="col-span-full text-center py-16 bg-white/5 rounded-xl border border-dashed border-white/10">
                        <p className="text-bone/50">No events found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
