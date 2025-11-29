"use client";

import { useParams } from "next/navigation";
import { MOCK_EVENTS, MOCK_TALENT } from "@/lib/data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, MessageSquare, CheckCircle, Star, Send } from "lucide-react";
import Link from "next/link";

export default function EventDetailsPage() {
    const params = useParams();
    const eventId = params.id as string;
    const event = MOCK_EVENTS.find(e => e.id === eventId);
    const [activeTab, setActiveTab] = useState<'details' | 'talent' | 'messages'>('details');

    if (!event) return <div className="p-8">Event not found</div>;

    const interestedTalent = MOCK_TALENT.filter(t => event.interestedTalentIds.includes(t.id));
    const invitedTalent = MOCK_TALENT.filter(t => event.invitedTalentIds.includes(t.id));
    const confirmedTalent = MOCK_TALENT.filter(t => event.confirmedTalentIds.includes(t.id));

    return (
        <div className="p-8 max-w-7xl mx-auto pt-24">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-bone/60 mb-2">
                    <Link href="/app/events" className="hover:text-gold transition-colors">Events</Link> / {event.title}
                </div>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-display text-bone mb-2">{event.title}</h1>
                        <div className="flex items-center gap-6 text-sm text-bone/60">
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-gold" /> {event.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-gold" /> {event.startTime} - {event.endTime}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gold" /> {event.area}, {event.city}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Link href={`/app/events/${event.id}/edit`}>
                            <Button variant="outline" className="border-white/10 text-bone hover:bg-white/5">Edit Event</Button>
                        </Link>
                        <Link href="/app/talent">
                            <Button className="bg-gold text-emerald-deep hover:bg-gold/90">Invite Talent</Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 mb-8">
                <button
                    onClick={() => setActiveTab('details')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'details' ? 'border-gold text-gold' : 'border-transparent text-bone/60 hover:text-bone'}`}
                >
                    Event Details
                </button>
                <button
                    onClick={() => setActiveTab('talent')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'talent' ? 'border-gold text-gold' : 'border-transparent text-bone/60 hover:text-bone'}`}
                >
                    Guest List ({confirmedTalent.length}/{event.desiredTalentCount})
                </button>
                <button
                    onClick={() => setActiveTab('messages')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'messages' ? 'border-gold text-gold' : 'border-transparent text-bone/60 hover:text-bone'}`}
                >
                    Messages
                </button>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                {activeTab === 'details' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                                <h3 className="font-display text-lg mb-4 text-bone">Description</h3>
                                <p className="text-bone/80 leading-relaxed">{event.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <h3 className="font-display text-lg mb-2 text-bone">Vibe</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {event.vibeTags.map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-gold/10 text-gold border border-gold/20 text-xs rounded-full uppercase tracking-wider">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <h3 className="font-display text-lg mb-2 text-bone">Dress Code</h3>
                                    <p className="text-bone/80">{event.dressCode}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-black/20 text-bone p-6 rounded-xl border border-white/10">
                                <h3 className="font-display text-lg mb-4 text-gold">Stats</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm opacity-70">Expected Guests</span>
                                        <span className="font-medium">{event.expectedGuests}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm opacity-70">Desired Talent</span>
                                        <span className="font-medium">{event.desiredTalentCount}</span>
                                    </div>
                                    <div className="h-px bg-white/10 my-2" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm opacity-70">Confirmed</span>
                                        <span className="font-medium text-emerald-400">{confirmedTalent.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'talent' && (
                    <div className="space-y-8">
                        {/* Interested */}
                        <section>
                            <h3 className="font-display text-lg mb-4 flex items-center gap-2 text-bone">
                                <Star className="w-4 h-4 text-gold" /> Interested ({interestedTalent.length})
                            </h3>
                            {interestedTalent.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {interestedTalent.map(talent => (
                                        <TalentCard key={talent.id} talent={talent} status="Interested" />
                                    ))}
                                </div>
                            ) : <p className="text-bone/40 text-sm italic">No new interest yet.</p>}
                        </section>

                        {/* Confirmed */}
                        <section>
                            <h3 className="font-display text-lg mb-4 flex items-center gap-2 text-bone">
                                <CheckCircle className="w-4 h-4 text-emerald-400" /> Confirmed ({confirmedTalent.length})
                            </h3>
                            {confirmedTalent.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {confirmedTalent.map(talent => (
                                        <TalentCard key={talent.id} talent={talent} status="Confirmed" />
                                    ))}
                                </div>
                            ) : <p className="text-bone/40 text-sm italic">No confirmed talent yet.</p>}
                        </section>

                        {/* Invited */}
                        <section>
                            <h3 className="font-display text-lg mb-4 flex items-center gap-2 text-bone">
                                <Send className="w-4 h-4 text-bone/60" /> Invited ({invitedTalent.length})
                            </h3>
                            {invitedTalent.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {invitedTalent.map(talent => (
                                        <TalentCard key={talent.id} talent={talent} status="Invited" />
                                    ))}
                                </div>
                            ) : <p className="text-bone/40 text-sm italic">No pending invites.</p>}
                        </section>
                    </div>
                )}

                {activeTab === 'messages' && (
                    <div className="flex flex-col items-center justify-center py-12 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
                        <MessageSquare className="w-12 h-12 text-bone/20 mb-4" />
                        <p className="text-bone/60 mb-4">Start a conversation with confirmed talent.</p>
                        <Link href="/app/messages">
                            <Button variant="outline" className="border-white/10 text-bone hover:bg-white/5">Go to Messages</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

function TalentCard({ talent, status }: { talent: any, status: string }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-4 hover:border-gold/30 transition-all group">
            <img src={talent.avatarUrl} className="w-12 h-12 rounded-full object-cover border border-white/10" />
            <div className="flex-1">
                <h4 className="font-medium text-bone group-hover:text-gold transition-colors">{talent.stageName || talent.name}</h4>
                <p className="text-xs text-bone/60">{talent.city}</p>
            </div>
            <div className="text-right">
                <span className={`text-xs font-medium px-2 py-1 rounded-full border ${status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    status === 'Interested' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-white/5 text-bone/60 border-white/10'
                    }`}>
                    {status}
                </span>
            </div>
        </div>
    )
}
