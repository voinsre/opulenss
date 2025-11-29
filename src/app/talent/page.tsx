"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { LoginModal } from "@/components/features/landing/modals";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { motion } from "framer-motion";

export default function TalentLandingPage() {
    const [showLogin, setShowLogin] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showCode, setShowCode] = useState(false);

    return (
        <main className="min-h-screen bg-offblack text-bone relative flex flex-col items-center justify-center">
            {/* Background Vignette - Darker */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1600&auto=format&fit=crop")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-offblack via-offblack/80 to-transparent" />
            </div>

            <div className="absolute top-6 left-6 z-20">
                <Logo />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md p-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl text-center"
            >
                <h1 className="font-display text-3xl md:text-4xl mb-2 text-bone">
                    The guest list <br /><span className="text-gold italic">behind</span> the guest list.
                </h1>
                <p className="text-sm text-bone/60 mb-8 uppercase tracking-widest">
                    Invite Only • 21+ • Curated
                </p>

                <div className="grid grid-cols-2 gap-4 p-1 bg-white/5 rounded-lg mb-6">
                    <button className="py-2 text-sm font-medium text-bone/50 cursor-not-allowed">
                        Sign Up (Invite)
                    </button>
                    <button
                        onClick={() => setShowLogin(true)}
                        className="py-2 text-sm font-medium text-bone bg-white/10 rounded shadow-sm"
                    >
                        Log In
                    </button>
                </div>

                <p className="text-xs text-bone/40">
                    Membership is strictly by invitation or referral.
                </p>
            </motion.div>

            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} theme="black" />

            {/* Footer */}
            <footer className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 text-xs text-bone/50 z-20">
                <button onClick={() => setShowAbout(true)} className="hover:text-gold transition-colors uppercase tracking-wider">About Opulenss</button>
                <button onClick={() => setShowPrivacy(true)} className="hover:text-gold transition-colors uppercase tracking-wider">Privacy Policy</button>
                <button onClick={() => setShowTerms(true)} className="hover:text-gold transition-colors uppercase tracking-wider">Terms & Conditions</button>
                <button onClick={() => setShowCode(true)} className="hover:text-gold transition-colors uppercase tracking-wider">Code of Conduct</button>
            </footer>

            {/* Bottom Sheets */}
            <BottomSheet isOpen={showAbout} onClose={() => setShowAbout(false)} title="About Opulenss" theme="black">
                <div className="max-w-3xl mx-auto space-y-8 text-bone/80">
                    <div className="space-y-4">
                        <h3 className="text-xl font-display text-gold">For the Exceptional</h3>
                        <p className="leading-relaxed">
                            Opulenss is the world's most exclusive talent discovery platform, connecting high-net-worth individuals with exceptional models, artists, and performers for private events.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-display text-gold">Why Join?</h3>
                        <ul className="space-y-3 list-disc list-inside marker:text-gold">
                            <li>Access to ultra-exclusive private events in London, New York, and Dubai.</li>
                            <li>Direct bookings with verified, high-profile clients.</li>
                            <li>Guaranteed safety and discretion for all engagements.</li>
                            <li>Premium rates and immediate payment processing.</li>
                        </ul>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-lg text-center">
                        <p className="text-gold font-display text-lg mb-2">Ready to elevate your career?</p>
                        <p className="text-sm">Ensure your profile is up to date to increase your visibility to our members.</p>
                    </div>
                </div>
            </BottomSheet>

            <BottomSheet isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy" theme="black">
                <div className="max-w-3xl mx-auto space-y-6 text-bone/80">
                    <p>Last Updated: November 27, 2025</p>
                    <p>
                        At Opulenss, we value your privacy as much as we value our exclusivity. This Privacy Policy outlines how we collect, use, and protect your personal information.
                    </p>
                    <h3 className="text-xl font-display text-gold mt-6">1. Information We Collect</h3>
                    <p>
                        We collect information you provide directly to us, such as when you apply for membership, make a reservation, or communicate with us. This may include your name, contact details, professional information, and payment data.
                    </p>
                    <h3 className="text-xl font-display text-gold mt-6">2. How We Use Your Information</h3>
                    <p>
                        We use your information to provide, maintain, and improve our services, including processing your membership application, managing your account, and personalizing your experience at the Club.
                    </p>
                    <h3 className="text-xl font-display text-gold mt-6">3. Data Security</h3>
                    <p>
                        We implement industry-standard security measures to protect your data. Your information is stored on secure servers and is only accessible by authorized personnel.
                    </p>
                </div>
            </BottomSheet>

            <BottomSheet isOpen={showTerms} onClose={() => setShowTerms(false)} title="Terms & Conditions" theme="black">
                <div className="max-w-3xl mx-auto space-y-6 text-bone/80">
                    <p>Last Updated: November 27, 2025</p>
                    <p>
                        Welcome to Opulenss. By accessing our website or visiting our Club, you agree to be bound by these Terms & Conditions.
                    </p>
                    <h3 className="text-xl font-display text-gold mt-6">1. Membership</h3>
                    <p>
                        Membership is by invitation only and is subject to approval by the Membership Committee. We reserve the right to revoke membership at any time for violation of our Code of Conduct.
                    </p>
                    <h3 className="text-xl font-display text-gold mt-6">2. House Rules</h3>
                    <p>
                        Members and guests must adhere to our House Rules, including dress code, photography policy (strictly prohibited), and respectful behavior.
                    </p>
                </div>
            </BottomSheet>

            <BottomSheet isOpen={showCode} onClose={() => setShowCode(false)} title="Code of Conduct" theme="black">
                <div className="max-w-3xl mx-auto space-y-6 text-bone/80">
                    <p>
                        Opulenss is a community built on mutual respect, discretion, and safety.
                    </p>
                    <h3 className="text-xl font-display text-gold mt-6">1. Respect</h3>
                    <p>
                        Treat all members and staff with dignity and respect. Harassment, discrimination, or abusive behavior of any kind will not be tolerated and will result in immediate expulsion.
                    </p>
                    <h3 className="text-xl font-display text-gold mt-6">2. Discretion</h3>
                    <p>
                        What happens at Opulenss stays at Opulenss. Photography and social media posting within the Club are strictly prohibited to ensure the privacy of our members.
                    </p>
                    <h3 className="text-xl font-display text-gold mt-6">3. Safety</h3>
                    <p>
                        We are committed to providing a safe environment. If you witness or experience any behavior that makes you uncomfortable, please report it to a staff member immediately.
                    </p>
                </div>
            </BottomSheet>
        </main>
    );
}
