"use client";

import { MOCK_CLIENTS } from "@/lib/data";
import { Search, Filter, MoreVertical, Shield, CheckCircle, XCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AdminClientsPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display text-bone mb-2">Client Management</h1>
                    <p className="text-bone/60">Manage client applications and memberships.</p>
                </div>
                <Button className="bg-gold text-emerald-deep hover:bg-gold/90">
                    Export Data
                </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bone/40" />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-bone focus:outline-none focus:border-gold/50 transition-colors"
                    />
                </div>
                <Button variant="outline" className="border-white/10 text-bone hover:bg-white/5 gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                </Button>
            </div>

            {/* Clients Table */}
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden shadow-lg backdrop-blur-sm">
                <table className="w-full text-left">
                    <thead className="bg-black/20 text-bone/60 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="p-6 font-medium">Client</th>
                            <th className="p-6 font-medium">Status</th>
                            <th className="p-6 font-medium">Membership</th>
                            <th className="p-6 font-medium">Joined</th>
                            <th className="p-6 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {MOCK_CLIENTS.map((client, i) => (
                            <motion.tr
                                key={client.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="group hover:bg-white/5 transition-colors"
                            >
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-emerald-900/20 border border-gold/20 flex items-center justify-center text-gold font-display text-lg">
                                            {client.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-bone group-hover:text-gold transition-colors">{client.name}</div>
                                            <div className="text-xs text-bone/40">{client.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${client.applicationStatus === "Approved"
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                            : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                        }`}>
                                        {client.applicationStatus === "Approved" ? <CheckCircle className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                                        {client.applicationStatus}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <span className="text-sm text-bone/80">Premium</span>
                                </td>
                                <td className="p-6">
                                    <span className="text-sm text-bone/60">Nov 2025</span>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-bone/40 hover:text-bone hover:bg-white/10">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-bone/40 hover:text-bone hover:bg-white/10">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
