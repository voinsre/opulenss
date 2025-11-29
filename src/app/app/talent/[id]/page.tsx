"use client";

import { useParams } from "next/navigation";
import { MOCK_TALENT } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Calendar, Star, CreditCard } from "lucide-react";
import Link from "next/link";

export default function TalentProfilePage() {
    const params = useParams();
    const talentId = params.id as string;
    const talent = MOCK_TALENT.find(t => t.id === talentId);

    if (!talent) return <div className="p-8 text-bone">Talent not found</div>;

    // Mock additional data
    const stats = [
        { label: "Height", value: "5'9\"" },
        { label: "Dress Size", value: "4 (US)" },
        { label: "Shoe Size", value: "8 (US)" },
        { label: "Hair", value: "Brunette" },
        { label: "Eyes", value: "Hazel" },
    ];

    const reviews = [
        { id: 1, client: "Alexander S.", rating: 5, text: "Absolutely stunning performance. Elevates the room instantly.", date: "2 weeks ago" },
        { id: 2, client: "Victoria M.", rating: 5, text: "Professional, punctual, and incredibly charming.", date: "1 month ago" },
    ];

    return (
        <div className="flex flex-col h-full bg-emerald-deep min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[50vh] md:h-[60vh] w-full bg-offblack">
                <img
                    src={talent.gallery[0] || talent.avatarUrl}
                    className="w-full h-full object-cover opacity-90"
                    alt={talent.stageName}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-7xl w-full mx-auto z-10">
                    <Link href="/app/talent" className="text-bone/80 hover:text-gold text-sm mb-6 block transition-colors flex items-center gap-2">
                        &larr; Back to Talent
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                {talent.styleTags.map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full border border-gold/40 text-gold text-xs uppercase tracking-widest bg-black/20 backdrop-blur-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-display font-bold text-bone mb-4 text-glow">{talent.stageName || talent.name}</h1>
                            <div className="flex items-center gap-6 text-bone/90 text-lg">
                                <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-gold" /> {talent.city}</span>
                                <span className="w-1 h-1 rounded-full bg-gold/50" />
                                <span className="flex items-center gap-2"><Globe className="w-5 h-5 text-gold" /> {talent.languages.join(", ")}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-3xl font-display text-gold">{talent.rating}</div>
                                <div className="text-xs text-bone/60 uppercase tracking-widest">Rating</div>
                            </div>
                            <div className="w-px h-12 bg-white/10" />
                            <div className="text-right">
                                <div className="text-3xl font-display text-gold">12</div>
                                <div className="text-xs text-bone/60 uppercase tracking-widest">Events</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-8 md:p-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Left Column: Info */}
                    <div className="lg:col-span-2 space-y-16">
                        <section>
                            <h2 className="text-3xl font-display text-bone mb-6 border-b border-gold/20 pb-4 inline-block">About</h2>
                            <p className="text-bone/80 leading-relaxed text-lg font-light">
                                {talent.bio || `${talent.name} is a professional model and event personality based in ${talent.city}. Known for her ${talent.styleTags.join(", ")} style, she brings elegance and energy to every gathering.`}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display text-bone mb-8 border-b border-gold/20 pb-4 inline-block">Stats & Details</h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                {stats.map((stat, i) => (
                                    <div key={i} className="bg-white/5 p-4 rounded-lg border border-white/5">
                                        <div className="text-xs text-bone/40 uppercase tracking-widest mb-1">{stat.label}</div>
                                        <div className="text-xl text-bone font-display">{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display text-bone mb-8 border-b border-gold/20 pb-4 inline-block">Gallery</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {talent.gallery.map((img, i) => (
                                    <div key={i} className="aspect-[3/4] rounded-lg overflow-hidden bg-warmgrey/10 group relative">
                                        <img src={img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-3xl font-display text-bone mb-8 border-b border-gold/20 pb-4 inline-block">Client Reviews</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {reviews.map((review) => (
                                    <div key={review.id} className="bg-white/5 p-6 rounded-xl border border-white/5 relative">
                                        <div className="absolute top-6 right-6 text-gold text-4xl opacity-20 font-serif">"</div>
                                        <div className="flex gap-1 mb-4">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                                            ))}
                                        </div>
                                        <p className="text-bone/80 mb-4 italic">"{review.text}"</p>
                                        <div className="flex justify-between items-end">
                                            <span className="text-gold font-display">{review.client}</span>
                                            <span className="text-xs text-bone/40">{review.date}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Actions */}
                    <div className="space-y-8">
                        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-gold/20 sticky top-8 shadow-[0_0_50px_rgba(0,0,0,0.3)]">
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-sm font-medium text-bone/60 uppercase tracking-widest">Availability</span>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-medium border ${talent.availabilityStatus === 'Available'
                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                                    : 'bg-red-500/10 text-red-400 border-red-500/30'
                                    }`}>
                                    {talent.availabilityStatus}
                                </span>
                            </div>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-center gap-4 text-bone/80">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-bone/40 uppercase tracking-widest">Next Available</div>
                                        <div className="font-display text-lg">This Weekend</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-bone/80">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-bone/40 uppercase tracking-widest">Starting Rate</div>
                                        <div className="font-display text-lg">$500 / event</div>
                                    </div>
                                </div>
                            </div>

                            <Button className="w-full bg-gold text-emerald-deep hover:bg-gold/90 text-lg h-14 font-medium mb-4 shadow-lg shadow-gold/10">
                                Invite to Event
                            </Button>
                            <Button variant="outline" className="w-full border-white/10 text-bone hover:bg-white/5 h-12">
                                Add to Favorites
                            </Button>
                            <p className="text-xs text-center text-bone/40 mt-6 leading-relaxed">
                                Invitations are subject to acceptance. <br />
                                A 20% deposit is required upon confirmation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
