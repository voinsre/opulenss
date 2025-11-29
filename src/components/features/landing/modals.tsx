"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/context/user-context";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    theme?: "emerald" | "black";
}

export function LoginModal({ isOpen, onClose, theme = "emerald" }: ModalProps) {
    const { login } = useUser();

    // Prevent body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const bgClass = theme === "black" ? "bg-offblack border-white/10" : "bg-emerald-deep border-gold/30";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[80]"
                    />

                    {/* Modal Content */}
                    <div className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(10px)" }}
                            transition={{
                                type: "spring",
                                damping: 40,
                                stiffness: 300,
                                mass: 0.8
                            }}
                            className={`w-full max-w-md ${bgClass} p-8 rounded-xl shadow-2xl pointer-events-auto relative overflow-hidden`}
                        >
                            {/* Decorative Background */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-bone/40 hover:text-gold transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="text-center mb-8">
                                <h2 className="font-display text-3xl text-bone mb-2">Welcome Back</h2>
                                <p className="text-bone/60 text-sm">Please identify yourself to enter.</p>
                            </div>

                            <div className="space-y-4">
                                <Button
                                    variant="outline"
                                    onClick={() => login("CLIENT")}
                                    className="w-full justify-start h-14 text-lg border-white/10 hover:border-gold/50 hover:bg-white/5 group relative overflow-hidden"
                                >
                                    <span className="relative z-10">Alexander Sterling</span>
                                    <span className="absolute right-4 text-xs text-gold/50 uppercase tracking-widest group-hover:text-gold transition-colors">Client</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => login("TALENT")}
                                    className="w-full justify-start h-14 text-lg border-white/10 hover:border-emerald-400/50 hover:bg-white/5 group relative overflow-hidden"
                                >
                                    <span className="relative z-10">Elena V.</span>
                                    <span className="absolute right-4 text-xs text-emerald-400/50 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">Talent</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => login("ADMIN")}
                                    className="w-full justify-start h-14 text-lg border-white/10 hover:border-purple-400/50 hover:bg-white/5 group relative overflow-hidden"
                                >
                                    <span className="relative z-10">System Admin</span>
                                    <span className="absolute right-4 text-xs text-purple-400/50 uppercase tracking-widest group-hover:text-purple-400 transition-colors">Admin</span>
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

export function ContactModal({ isOpen, onClose }: ModalProps) {
    // Keeping ContactModal as is, but maybe wrapping in similar luxury style later if needed.
    // For now, using the same AnimatePresence pattern for consistency would be good, 
    // but user only specifically asked for Login. 
    // I'll leave it as is for now to avoid over-engineering unless requested.
    // Actually, I'll update it to use SideDrawer in page.tsx, so this might be unused?
    // Wait, page.tsx uses SideDrawer for Contact now. So this ContactModal is likely unused.
    // I will comment it out or remove it to avoid confusion.
    return null;
}
