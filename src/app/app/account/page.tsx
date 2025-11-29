"use client";

import { useUser } from "@/context/user-context";
import { Client } from "@/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, CreditCard, LogOut, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
    const { user, logout } = useUser();
    const client = user as Client;
    const [activeTab, setActiveTab] = useState("profile");
    const [notifications, setNotifications] = useState({
        "Event Invitations": true,
        "Message Alerts": true,
        "Talent Availability Updates": false,
        "Marketing & Newsletter": false
    });

    if (!client) return null;

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Shield },
        { id: "billing", label: "Billing", icon: CreditCard },
        { id: "support", label: "Talk to Opulenss Team", icon: MessageCircle },
    ];

    const toggleNotification = (key: string) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
    };

    return (
        <div className="p-8 max-w-[1600px] mx-auto min-h-screen pt-24">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-4xl font-display font-bold text-bone">Account Settings</h1>
                    <p className="text-bone/60 mt-2 text-lg">Manage your personal information and preferences.</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 flex-shrink-0 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                                ? "bg-gold text-emerald-deep shadow-lg shadow-gold/10"
                                : "text-bone/60 hover:text-bone hover:bg-white/5"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}

                    <div className="pt-8 mt-8 border-t border-white/10">
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 min-h-[500px]"
                    >
                        {activeTab === "profile" && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/30">
                                        <img src={client.avatarUrl} alt={client.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <Button variant="outline" className="border-white/20 text-bone hover:bg-white/10 mb-2">Change Avatar</Button>
                                        <p className="text-xs text-bone/40">JPG, GIF or PNG. Max size of 800K</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-bone/60">Full Name</label>
                                        <input
                                            type="text"
                                            defaultValue={client.name}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-bone focus:outline-none focus:border-gold/50 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-bone/60">Email Address</label>
                                        <input
                                            type="email"
                                            defaultValue={client.email}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-bone focus:outline-none focus:border-gold/50 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-bone/60">City</label>
                                        <input
                                            type="text"
                                            defaultValue={client.city}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-bone focus:outline-none focus:border-gold/50 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-bone/60">Membership Tier</label>
                                        <div className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-gold font-display flex items-center justify-between">
                                            {client.membershipTier}
                                            <span className="text-xs bg-gold/10 px-2 py-1 rounded text-gold border border-gold/20">Active</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-bone/60">Bio</label>
                                    <textarea
                                        defaultValue={client.bio || "Tell us about yourself..."}
                                        rows={4}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-bone focus:outline-none focus:border-gold/50 transition-colors resize-none"
                                    />
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button className="bg-gold text-emerald-deep hover:bg-gold/90 px-8" onClick={() => alert("Profile updated!")}>Save Changes</Button>
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-display text-bone mb-6">Notification Preferences</h3>
                                {Object.entries(notifications).map(([key, isActive]) => (
                                    <div key={key} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                                        <span className="text-bone">{key}</span>
                                        <div
                                            onClick={() => toggleNotification(key)}
                                            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${isActive ? 'bg-gold' : 'bg-white/10'}`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 rounded-full transition-all duration-300 ${isActive ? 'right-1 bg-emerald-deep' : 'left-1 bg-bone/40'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === "security" && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-display text-bone mb-6">Security Settings</h3>
                                <Button variant="outline" className="w-full justify-between border-white/10 text-bone hover:bg-white/5">
                                    Change Password
                                    <span className="text-xs text-bone/40">Last changed 3 months ago</span>
                                </Button>
                                <Button variant="outline" className="w-full justify-between border-white/10 text-bone hover:bg-white/5">
                                    Two-Factor Authentication
                                    <span className="text-xs text-emerald-400">Enabled</span>
                                </Button>
                            </div>
                        )}

                        {activeTab === "billing" && (
                            <div className="text-center py-12">
                                <CreditCard className="w-16 h-16 text-gold/20 mx-auto mb-6" />
                                <h3 className="text-2xl font-display text-bone mb-2">Payment Methods</h3>
                                <p className="text-bone/40 mb-8 max-w-md mx-auto">Manage your billing information, view invoices, and update your payment methods for event bookings.</p>

                                <div className="max-w-md mx-auto bg-white/5 rounded-xl p-6 border border-white/10 mb-8 text-left">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm text-bone/60">Current Plan</span>
                                        <span className="text-gold font-display">Founder Member</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                                            <div className="w-6 h-6 rounded-full bg-red-500/50" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-bone">•••• •••• •••• 4242</p>
                                            <p className="text-xs text-bone/40">Expires 12/28</p>
                                        </div>
                                    </div>
                                </div>

                                <Button className="bg-gold text-emerald-deep hover:bg-gold/90 px-8">Manage Billing</Button>
                            </div>
                        )}

                        {activeTab === "support" && (
                            <div className="text-center py-12">
                                <MessageCircle className="w-16 h-16 text-gold/20 mx-auto mb-6" />
                                <h3 className="text-2xl font-display text-bone mb-2">Concierge Support</h3>
                                <p className="text-bone/40 mb-8 max-w-md mx-auto">Our dedicated concierge team is available 24/7 to assist you with your membership, event planning, and special requests.</p>
                                <Link href="/app/concierge">
                                    <Button className="bg-gold text-emerald-deep hover:bg-gold/90 px-8">Start Chat</Button>
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
