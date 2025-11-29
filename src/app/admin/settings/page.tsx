"use client";

import { Settings, Bell, Lock, Globe, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

export default function AdminSettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-display text-bone mb-2">System Settings</h1>
                <p className="text-bone/60">Configure platform preferences and admin controls.</p>
            </div>

            <div className="space-y-6">
                {/* General Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                    <h2 className="text-xl font-display text-bone mb-6 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-gold" />
                        General Configuration
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-bone">Maintenance Mode</div>
                                <div className="text-sm text-bone/40">Temporarily disable access for all users</div>
                            </div>
                            <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-bone">New Registrations</div>
                                <div className="text-sm text-bone/40">Allow new users to apply for membership</div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </motion.div>

                {/* Notifications */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                    <h2 className="text-xl font-display text-bone mb-6 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-gold" />
                        Notifications
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-bone">Email Alerts</div>
                                <div className="text-sm text-bone/40">Receive daily summaries of platform activity</div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-bone">Urgent Reports</div>
                                <div className="text-sm text-bone/40">Instant notifications for high-priority reports</div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </motion.div>

                {/* Security */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                    <h2 className="text-xl font-display text-bone mb-6 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-gold" />
                        Security
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-medium text-bone">Two-Factor Authentication</div>
                                <div className="text-sm text-bone/40">Require 2FA for all admin accounts</div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </div>
                </motion.div>

                <div className="flex justify-end pt-4">
                    <Button className="bg-gold text-emerald-deep hover:bg-gold/90 px-8">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}
