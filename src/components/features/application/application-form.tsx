"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export function ApplicationForm() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        city: "",
        incomeProof: null as string | null,
        idProof: null as string | null,
        eventTypes: [] as string[],
        budget: "5000",
    });

    const nextStep = () => setStep((s) => Math.min(s + 1, 4));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = () => {
        // Simulate submission
        setTimeout(() => {
            router.push("/apply/success");
        }, 1000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-emerald-deep/50 backdrop-blur-sm border border-gold/20 rounded-xl shadow-2xl">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between mb-2 text-xs font-medium text-bone/60">
                    <span>Basic Info</span>
                    <span>Verification</span>
                    <span>Lifestyle</span>
                    <span>Review</span>
                </div>
                <div className="h-1 w-full bg-emerald-teal/30 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gold"
                        initial={{ width: "0%" }}
                        animate={{ width: `${(step / 4) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {step === 1 && (
                        <div className="space-y-4">
                            <h2 className="text-2xl font-display text-bone">Basic Details</h2>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Alexander Sterling"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="alex@sterling.com"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city">Primary City</Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    placeholder="London"
                                />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-display text-bone">KYC & Verification</h2>
                            <p className="text-sm text-bone/70">
                                We require proof of identity and income to maintain our community standards.
                            </p>

                            <div className="space-y-4">
                                <div className="border border-dashed border-emerald-teal rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-emerald-teal/10 transition-colors cursor-pointer"
                                    onClick={() => setFormData({ ...formData, idProof: "passport.pdf" })}>
                                    <Upload className="h-8 w-8 text-gold mb-2" />
                                    <span className="text-sm font-medium text-bone">Upload ID / Passport</span>
                                    {formData.idProof && <span className="text-xs text-emerald-400 mt-1 flex items-center"><Check className="w-3 h-3 mr-1" /> {formData.idProof}</span>}
                                </div>

                                <div className="border border-dashed border-emerald-teal rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-emerald-teal/10 transition-colors cursor-pointer"
                                    onClick={() => setFormData({ ...formData, incomeProof: "bank_statement.pdf" })}>
                                    <Upload className="h-8 w-8 text-gold mb-2" />
                                    <span className="text-sm font-medium text-bone">Upload Proof of Income</span>
                                    {formData.incomeProof && <span className="text-xs text-emerald-400 mt-1 flex items-center"><Check className="w-3 h-3 mr-1" /> {formData.incomeProof}</span>}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-display text-bone">Lifestyle & Events</h2>

                            <div className="space-y-3">
                                <Label>What type of events do you host?</Label>
                                <div className="flex flex-wrap gap-2">
                                    {["Dinner Parties", "Yacht", "Villa", "Gallery/Art", "Nightlife", "Corporate"].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => {
                                                const newTypes = formData.eventTypes.includes(type)
                                                    ? formData.eventTypes.filter(t => t !== type)
                                                    : [...formData.eventTypes, type];
                                                setFormData({ ...formData, eventTypes: newTypes });
                                            }}
                                            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${formData.eventTypes.includes(type)
                                                    ? "bg-gold text-emerald-deep border-gold"
                                                    : "bg-transparent border-emerald-teal text-bone hover:border-gold"
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label>Typical Event Budget ($)</Label>
                                <Input
                                    type="number"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                />
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-display text-bone">Review Application</h2>

                            <div className="space-y-4 text-sm bg-emerald-teal/10 p-4 rounded-lg border border-emerald-teal/20">
                                <div className="flex justify-between">
                                    <span className="text-bone/60">Name</span>
                                    <span className="text-bone">{formData.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-bone/60">Email</span>
                                    <span className="text-bone">{formData.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-bone/60">City</span>
                                    <span className="text-bone">{formData.city}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-bone/60">Documents</span>
                                    <span className="text-bone">{formData.idProof ? "Uploaded" : "Missing"}</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-2">
                                <input type="checkbox" id="terms" className="mt-1" />
                                <label htmlFor="terms" className="text-xs text-bone/70">
                                    I agree to the Terms & Conditions and Code of Conduct. I understand that Opulenss is a strictly moderated community.
                                </label>
                            </div>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-4 border-t border-emerald-teal/20">
                <Button
                    variant="ghost"
                    onClick={prevStep}
                    disabled={step === 1}
                    className={step === 1 ? "invisible" : ""}
                >
                    Back
                </Button>
                {step < 4 ? (
                    <Button onClick={nextStep}>Next Step</Button>
                ) : (
                    <Button onClick={handleSubmit} className="bg-gold text-emerald-deep hover:bg-gold/90">
                        Submit Application
                    </Button>
                )}
            </div>
        </div>
    );
}
