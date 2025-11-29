import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface PublicNavbarProps {
    onOpenLogin: () => void;
    onOpenContact: () => void;
    onOpenTheClub: () => void;
    onOpenHowItWorks: () => void;
}

export function PublicNavbar({ onOpenLogin, onOpenContact, onOpenTheClub, onOpenHowItWorks }: PublicNavbarProps) {
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const navLinks = [
        { label: "The Club", action: onOpenTheClub },
        { label: "Membership", action: onOpenHowItWorks },
        { label: "Contact", action: onOpenContact },
        { label: "Sign In", action: onOpenLogin },
    ];

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-emerald-deep/80 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-8"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <Logo />

                        <div className="hidden md:flex items-center gap-8">
                            <button onClick={onOpenTheClub} className="text-sm uppercase tracking-widest text-bone/70 hover:text-gold transition-colors">The Club</button>
                            <button onClick={onOpenHowItWorks} className="text-sm uppercase tracking-widest text-bone/70 hover:text-gold transition-colors">Membership</button>
                            <button onClick={onOpenContact} className="text-sm uppercase tracking-widest text-bone/70 hover:text-gold transition-colors">Contact</button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            onClick={onOpenLogin}
                            className="hidden md:flex text-bone/70 hover:text-gold uppercase tracking-widest text-xs"
                        >
                            Sign In
                        </Button>
                        <Button
                            onClick={onOpenContact}
                            className={`hidden md:flex transition-all duration-500 ${isScrolled ? "bg-gold text-emerald-deep" : "bg-white/10 backdrop-blur-sm text-bone border border-white/20"}`}
                        >
                            Inquire
                        </Button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden text-bone hover:text-gold transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-emerald-deep/95 backdrop-blur-xl md:hidden flex flex-col"
                    >
                        <div className="p-6 flex justify-end">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-bone hover:text-gold transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center gap-8 p-8">
                            {navLinks.map((link, index) => (
                                <motion.button
                                    key={link.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => {
                                        link.action();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-2xl font-display text-bone hover:text-gold transition-colors"
                                >
                                    {link.label}
                                </motion.button>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8"
                            >
                                <Button
                                    onClick={() => {
                                        onOpenContact();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="bg-gold text-emerald-deep text-lg px-8 py-6"
                                >
                                    Inquire Now
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
