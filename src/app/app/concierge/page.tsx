"use client";

import { useUser } from "@/context/user-context";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageSquare, Send, Phone, Clock, Star } from "lucide-react";
import { useState } from "react";

export default function ConciergePage() {
    const { user } = useUser();
    const [message, setMessage] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement message sending logic
        console.log("Sending message:", message);
        setMessage("");
        alert("Request sent to concierge!");
    };

    return (
        <div className="p-8 max-w-[1600px] mx-auto min-h-screen pt-24 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rosegold/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

            <div className="flex justify-between items-center mb-12 relative z-10">
                <div>
                    <h1 className="text-4xl font-display font-bold text-bone">Concierge Service</h1>
                    <p className="text-bone/60 mt-2 text-lg">Your personal team, available 24/7 for any request.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                {/* Chat / Request Area */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 min-h-[600px] flex flex-col"
                    >
                        <div className="flex-1 overflow-y-auto space-y-6 mb-6 p-4">
                            {/* Mock Chat History */}
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                                    <Star className="w-5 h-5 text-gold" />
                                </div>
                                <div className="space-y-1">
                                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-4 text-bone/90 max-w-md">
                                        <p>Good evening, {user?.name.split(' ')[0]}. How may we assist you with your plans for this weekend?</p>
                                    </div>
                                    <span className="text-xs text-bone/40 ml-2">10:00 AM</span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your request here..."
                                className="w-full bg-black/20 border border-white/10 rounded-xl pl-6 pr-14 py-4 text-bone focus:outline-none focus:border-gold/50 transition-colors"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-2 top-2 bg-gold text-emerald-deep hover:bg-gold/90 w-10 h-10 rounded-lg"
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </motion.div>
                </div>

                {/* Info / Contact Options */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
                    >
                        <h3 className="text-xl font-display text-bone mb-6">Quick Actions</h3>
                        <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start gap-3 border-white/10 text-bone hover:bg-white/5 h-12">
                                <Phone className="w-4 h-4 text-gold" />
                                Call Concierge
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3 border-white/10 text-bone hover:bg-white/5 h-12">
                                <Clock className="w-4 h-4 text-gold" />
                                Schedule a Call
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-gold/20 to-transparent border border-gold/20 rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                                <Star className="w-6 h-6 text-gold" />
                            </div>
                            <div>
                                <h3 className="text-lg font-display text-gold">Platinum Status</h3>
                                <p className="text-xs text-bone/60">Priority Response Active</p>
                            </div>
                        </div>
                        <p className="text-sm text-bone/80 leading-relaxed">
                            As a Platinum member, your requests are prioritized. Typical response time is under 5 minutes.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
