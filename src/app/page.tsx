"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { Hero } from "@/components/features/landing/hero";
import { SideDrawer } from "@/components/ui/side-drawer";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import {
  LoginModal,
  ContactModal,
} from "@/components/features/landing/modals";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  // Side Drawers
  const [showClub, setShowClub] = useState(false);
  const [showMembership, setShowMembership] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // Bottom Sheets (Legal)
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleApply = () => {
    router.push("/apply");
  };

  return (
    <main className="min-h-screen bg-emerald-deep text-bone relative">
      <PublicNavbar
        onOpenTheClub={() => setShowClub(true)}
        onOpenHowItWorks={() => setShowMembership(true)}
        onOpenContact={() => setShowContact(true)}
        onOpenLogin={() => setShowLogin(true)}
      />

      <Hero onOpenApply={handleApply} onOpenLogin={() => setShowLogin(true)} />

      {/* Footer */}
      <footer className="absolute bottom-6 left-10 md:left-20 flex gap-6 text-xs text-bone/50 z-20">
        <button onClick={() => setShowPrivacy(true)} className="hover:text-gold transition-colors">Privacy Policy</button>
        <button onClick={() => setShowTerms(true)} className="hover:text-gold transition-colors">Terms & Conditions</button>
        <button onClick={() => setShowCode(true)} className="hover:text-gold transition-colors">Code of Conduct</button>
      </footer>

      {/* Modals (Login stays as modal for now, or could be drawer) */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />

      {/* Side Drawers */}
      <SideDrawer isOpen={showClub} onClose={() => setShowClub(false)} title="The Club">
        <div className="space-y-8">
          <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop" alt="Club Interior" className="w-full h-64 object-cover rounded-lg" />
          <div className="space-y-4">
            <h3 className="text-xl font-display text-gold">A Sanctuary for the Exceptional</h3>
            <p className="text-bone/80 leading-relaxed">
              Opulenss is more than a members' club; it is a curated ecosystem of the world's most interesting people.
              Hidden behind unassuming doors in the heart of the city, we offer a refuge for those who shape culture.
            </p>
            <p className="text-bone/80 leading-relaxed">
              Our spaces are designed to facilitate serendipity. From the Emerald Salon to the Midnight Lounge,
              every corner tells a story, and every night promises a new chapter.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-display text-gold">Amenities</h3>
            <ul className="space-y-2 text-bone/70">
              <li>• 24/7 Concierge Service</li>
              <li>• Private Dining Rooms</li>
              <li>• The Vault (Late Night Bar)</li>
              <li>• Rooftop Garden</li>
              <li>• Screening Room</li>
            </ul>
          </div>
        </div>
      </SideDrawer>

      <SideDrawer isOpen={showMembership} onClose={() => setShowMembership(false)} title="Membership">
        <div className="space-y-8">
          <div className="p-6 bg-white/5 border border-gold/20 rounded-lg text-center">
            <h3 className="text-xl font-display text-gold mb-2">By Invitation Only</h3>
            <p className="text-sm text-bone/60">We maintain a strictly curated community.</p>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="font-display text-lg text-bone mb-2">The Process</h4>
              <ol className="space-y-4 text-bone/70 list-decimal list-inside">
                <li className="pl-2">Submit an application with two proposer references.</li>
                <li className="pl-2">Review by the Membership Committee (quarterly).</li>
                <li className="pl-2">In-person interview with a Committee member.</li>
                <li className="pl-2">Induction ceremony.</li>
              </ol>
            </div>

            <div>
              <h4 className="font-display text-lg text-bone mb-2">Criteria</h4>
              <p className="text-bone/70 leading-relaxed">
                We look for individuals who contribute to the vibrancy of our community.
                Creativity, kindness, and curiosity are valued above status or wealth.
              </p>
            </div>
          </div>

          <Button onClick={handleApply} className="w-full bg-gold text-emerald-deep hover:bg-gold/90">
            Begin Application
          </Button>
        </div>
      </SideDrawer>

      <SideDrawer isOpen={showContact} onClose={() => setShowContact(false)} title="Contact">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-display text-gold">General Inquiries</h3>
            <p className="text-bone/80">
              For membership inquiries, press, or general questions, please contact our concierge team.
            </p>
            <a href="mailto:concierge@opulenss.com" className="block text-xl text-bone hover:text-gold transition-colors">concierge@opulenss.com</a>
            <p className="text-bone/60">+1 (212) 555-0199</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-display text-gold">Location</h3>
            <p className="text-bone/80">
              123 Emerald Avenue<br />
              New York, NY 10012
            </p>
          </div>
        </div>
      </SideDrawer>

      {/* Bottom Sheets (Legal) */}
      <BottomSheet isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy">
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

      <BottomSheet isOpen={showTerms} onClose={() => setShowTerms(false)} title="Terms & Conditions">
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

      <BottomSheet isOpen={showCode} onClose={() => setShowCode(false)} title="Code of Conduct">
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
