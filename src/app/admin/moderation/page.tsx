"use client";

import { ShieldAlert, CheckCircle, XCircle, MessageSquare, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AdminModerationPage() {
    const reports = [
        { id: 1, type: "Message", reason: "Inappropriate Content", reporter: "Elena V.", reported: "Client #124", date: "2 mins ago", status: "Pending" },
        { id: 2, type: "Profile", reason: "Fake Identity", reporter: "System", reported: "User #892", date: "1 hour ago", status: "Pending" },
        { id: 3, type: "Event", reason: "Scam Suspicion", reporter: "Sophia L.", reported: "Event #442", date: "3 hours ago", status: "Investigating" },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display text-bone mb-2">Moderation Queue</h1>
                    <p className="text-bone/60">Review reports and flagged content.</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-sm font-medium flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        3 High Priority
                    </span>
                </div>
            </div>

            <div className="space-y-4">
                {reports.map((report, i) => (
                    <motion.div
                        key={report.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-between hover:bg-white/10 transition-colors"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-500/10 rounded-lg text-red-400 mt-1">
                                <ShieldAlert className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-medium text-bone">{report.reason}</span>
                                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-bone/60">{report.type}</span>
                                    <span className="text-xs text-bone/40">• {report.date}</span>
                                </div>
                                <p className="text-sm text-bone/60">
                                    Reported by <span className="text-bone">{report.reporter}</span> against <span className="text-bone">{report.reported}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="border-white/10 text-bone hover:bg-white/5">
                                View Details
                            </Button>
                            <Button className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/20">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Resolve
                            </Button>
                        </div>
                    </motion.div>
                ))}

                {reports.length === 0 && (
                    <div className="text-center py-12 bg-white/5 rounded-xl border border-dashed border-white/10">
                        <CheckCircle className="w-12 h-12 text-emerald-500/40 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-bone">All Caught Up</h3>
                        <p className="text-bone/40">No pending reports to review.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
