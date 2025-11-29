"use client";

import { MOCK_CLIENTS, MOCK_MESSAGES } from "@/lib/data";
import { Users, ShieldAlert, UserPlus, MessageSquare, TrendingUp, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
    const pendingClients = MOCK_CLIENTS.filter(c => c.applicationStatus === "Pending").length;
    const pendingTalent = 3;
    const openReports = 2;
    const flaggedMessages = MOCK_MESSAGES.filter(m => m.flagged).length;

    const stats = [
        { label: "Pending Clients", value: pendingClients, icon: UserPlus, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
        { label: "New Talent Reviews", value: pendingTalent, icon: Users, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
        { label: "Open Reports", value: openReports, icon: ShieldAlert, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
        { label: "Flagged Messages", value: flaggedMessages, icon: MessageSquare, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/20" },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-display text-bone">Platform Overview</h1>
                <div className="flex items-center gap-2 text-sm text-bone/60">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                    System Operational
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm hover:bg-white/10 transition-colors`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-white/5`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="text-3xl font-bold text-bone">{stat.value}</span>
                        </div>
                        <p className="text-sm font-medium text-bone/50">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Activity Chart Mock */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg min-h-[400px] flex flex-col"
                >
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="font-display text-xl text-bone flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            Growth Metrics
                        </h3>
                        <select className="text-sm border border-white/10 bg-black/20 rounded-md px-3 py-1 text-bone/60 focus:outline-none focus:border-gold/50">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>

                    <div className="flex-1 flex items-end justify-between gap-2 px-4 pb-4">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="w-full bg-white/5 rounded-t-sm relative group h-full flex items-end">
                                <motion.div
                                    initial={{ height: "0%" }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                    className="w-full bg-emerald-500 rounded-t-sm opacity-60 group-hover:opacity-100 transition-opacity relative shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 border border-white/10 text-bone text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h}
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between px-4 text-xs text-bone/30 mt-4">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </motion.div>

                {/* Live Feed */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg"
                >
                    <h3 className="font-display text-xl text-bone mb-6 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-400" />
                        Live Activity
                    </h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <div key={i} className="flex gap-3 items-start group">
                                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                                <div>
                                    <p className="text-sm text-bone/80 group-hover:text-bone transition-colors">
                                        <span className="font-medium text-gold">Alexander S.</span> created a new event "Summer Gala".
                                    </p>
                                    <p className="text-xs text-bone/30 mt-1">2 mins ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
