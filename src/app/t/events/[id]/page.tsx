"use client";

import { useParams } from "next/navigation";
import { MOCK_EVENTS } from "@/lib/data";
import { useUser } from "@/context/user-context";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function TalentEventDetailsPage() {
    const params = useParams();
    const { user } = useUser();
    const eventId = params.id as string;
    const event = MOCK_EVENTS.find(e => e.id === eventId);
    const [status, setStatus] = useState<'none' | 'interested' | 'confirmed' | 'declined'>('none');

    if (!event || !user) return <div className="p-8 text-bone">Event not found</div>;

    // Determine initial status based on mock data
    // In a real app, this would be fetched
    const isInvited = event.invitedTalentIds.includes(user.id);
    const isConfirmed = event.confirmedTalentIds.includes(user.id);
    const isInterested = event.interestedTalentIds.includes(user.id);

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="mb-8">
                <Link href="/t/events" className="text-sm text-bone/60 hover:text-white mb-2 block">
                    &larr; Back to Events
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-display text-bone mb-2">{event.title}</h1>
                        <div className="flex items-center gap-6 text-sm text-bone/60">
                            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {event.startTime} - {event.endTime}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.area}, {event.city}</span>
                        </div>
                    </div>

                    {isConfirmed && (
                        <div className="bg-emerald-500/20 border border-emerald-500/50 px-4 py-2 rounded-lg text-emerald-400 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" /> Confirmed
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="font-display text-lg text-bone mb-4">About the Event</h3>
                        <p className="text-bone/80 leading-relaxed">{event.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <h3 className="font-display text-lg text-bone mb-2">Vibe</h3>
                            <div className="flex flex-wrap gap-2">
                                {event.vibeTags.map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-white/10 text-bone text-xs rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <h3 className="font-display text-lg text-bone mb-2">Dress Code</h3>
                            <p className="text-bone/80">{event.dressCode}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Action Card */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 sticky top-8">
                        <h3 className="font-display text-lg text-bone mb-4">Your Response</h3>

                        {isConfirmed ? (
                            <div className="space-y-4">
                                <p className="text-sm text-bone/70">You are on the guest list. The host has been notified.</p>
                                <Button variant="outline" className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300">
                                    Cancel Attendance
                                </Button>
                            </div>
                        ) : isInvited ? (
                            <div className="space-y-3">
                                <p className="text-sm text-bone/70 mb-2">You have been invited to this event.</p>
                                <Button className="w-full bg-emerald-500 text-white hover:bg-emerald-600">
                                    Accept Invitation
                                </Button>
                                <Button variant="outline" className="w-full border-white/20 text-bone hover:bg-white/10">
                                    Decline
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-sm text-bone/70 mb-2">Express interest to be considered for the guest list.</p>
                                <Button
                                    className={`w-full ${isInterested ? 'bg-gold/20 text-gold border border-gold/50' : 'bg-gold text-emerald-deep hover:bg-gold/90'}`}
                                    disabled={isInterested}
                                >
                                    {isInterested ? "Interest Shown" : "Show Interest"}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
