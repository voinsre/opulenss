"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Wine, Music, Ship, Utensils, Moon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const VIBES = [
    { id: "dinner", label: "Dinner Party", icon: Utensils, desc: "Intimate, culinary, seated." },
    { id: "cocktail", label: "Cocktail Hour", icon: Wine, desc: "Social, fluid, elegant." },
    { id: "party", label: "Late Night", icon: Music, desc: "High energy, music-focused." },
    { id: "yacht", label: "Yacht / Marine", icon: Ship, desc: "Open air, luxury, exclusive." },
    { id: "lounge", label: "Lounge", icon: Moon, desc: "Relaxed, atmospheric, deep." },
    { id: "other", label: "Other", icon: Sparkles, desc: "Something unique and bespoke." },
];

export default function CreateEventWizard() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        vibe: "",
        title: "",
        date: "",
        guests: 10,
        energy: 50, // 0-100
    });

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = () => {
        // Simulate API
        setTimeout(() => router.push("/app/events"), 1000);
    };

    return (
        <div className="min-h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <motion.div
                    className="h-full bg-gold"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="max-w-4xl w-full relative z-10">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center mb-12">
                                <h1 className="text-4xl md:text-5xl font-display text-bone mb-4">Set the Scene</h1>
                                <p className="text-xl text-bone/60 font-light">What is the essence of your gathering?</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {VIBES.map((vibe) => (
                                    <button
                                        key={vibe.id}
                                        onClick={() => setFormData({ ...formData, vibe: vibe.id })}
                                        className={cn(
                                            "group relative p-8 rounded-xl border transition-all duration-300 flex flex-col items-center text-center gap-4 hover:scale-105",
                                            formData.vibe === vibe.id
                                                ? "bg-gold/10 border-gold shadow-[0_0_30px_rgba(208,169,105,0.2)]"
                                                : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-gold/50"
                                        )}
                                    >
                                        <vibe.icon className={cn(
                                            "w-12 h-12 transition-colors duration-300",
                                            formData.vibe === vibe.id ? "text-gold" : "text-bone/40 group-hover:text-gold"
                                        )} />
                                        <div>
                                            <h3 className="font-display text-xl text-bone mb-1">{vibe.label}</h3>
                                            <p className="text-sm text-bone/50">{vibe.desc}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-end mt-12">
                                <Button
                                    onClick={nextStep}
                                    disabled={!formData.vibe}
                                    className="bg-gold text-emerald-deep hover:bg-gold/90 text-lg px-8"
                                >
                                    Continue <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8 max-w-2xl mx-auto"
                        >
                            <div className="text-center mb-12">
                                <h1 className="text-4xl md:text-5xl font-display text-bone mb-4">The Details</h1>
                                <p className="text-xl text-bone/60 font-light">Refine the atmosphere.</p>
                            </div>

                            <div className="space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div className="space-y-4">
                                    <Label className="text-lg text-bone">Event Title</Label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g. Midsummer Night's Dream"
                                        className="text-xl h-14 bg-black/20 border-white/10 focus:border-gold"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <Label className="text-lg text-bone">Date</Label>
                                        <Input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            className="text-lg h-12 bg-black/20 border-white/10 focus:border-gold"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Label className="text-lg text-bone">Guests</Label>
                                        <Input
                                            type="number"
                                            value={formData.guests}
                                            onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                            className="text-lg h-12 bg-black/20 border-white/10 focus:border-gold"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex justify-between">
                                        <Label className="text-lg text-bone">Energy Level</Label>
                                        <span className="text-gold font-display">{formData.energy}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={formData.energy}
                                        onChange={(e) => setFormData({ ...formData, energy: parseInt(e.target.value) })}
                                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                                    />
                                    <div className="flex justify-between text-xs text-bone/40 uppercase tracking-widest">
                                        <span>Intimate</span>
                                        <span>Electric</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-12">
                                <Button variant="ghost" onClick={prevStep} className="text-bone/60 hover:text-bone">
                                    <ArrowLeft className="mr-2 w-5 h-5" /> Back
                                </Button>
                                <Button
                                    onClick={nextStep}
                                    disabled={!formData.title || !formData.date}
                                    className="bg-gold text-emerald-deep hover:bg-gold/90 text-lg px-8"
                                >
                                    Review <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8 max-w-2xl mx-auto text-center"
                        >
                            <div className="mb-12">
                                <h1 className="text-4xl md:text-5xl font-display text-bone mb-4">Ready to Host?</h1>
                                <p className="text-xl text-bone/60 font-light">Your event is being curated.</p>
                            </div>

                            <div className="bg-white/5 p-8 rounded-2xl border border-gold/30 backdrop-blur-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />

                                <h2 className="text-3xl font-display text-gold mb-2">{formData.title}</h2>
                                <p className="text-bone/80 mb-8 uppercase tracking-widest text-sm">{formData.date} • {VIBES.find(v => v.id === formData.vibe)?.label}</p>

                                <div className="grid grid-cols-2 gap-4 text-left max-w-xs mx-auto text-sm text-bone/60">
                                    <div>Expected Guests:</div>
                                    <div className="text-right text-bone">{formData.guests}</div>
                                    <div>Energy Level:</div>
                                    <div className="text-right text-bone">{formData.energy}%</div>
                                </div>
                            </div>

                            <div className="flex justify-between mt-12">
                                <Button variant="ghost" onClick={prevStep} className="text-bone/60 hover:text-bone">
                                    <ArrowLeft className="mr-2 w-5 h-5" /> Back
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    className="bg-gold text-emerald-deep hover:bg-gold/90 text-lg px-12 h-14 shadow-[0_0_30px_rgba(208,169,105,0.4)] hover:shadow-[0_0_50px_rgba(208,169,105,0.6)] transition-shadow duration-500"
                                >
                                    Create Event
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
