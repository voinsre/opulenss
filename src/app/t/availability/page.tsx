"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AvailabilityPage() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

    const toggleSlot = (day: string, time: string) => {
        const id = `${day}-${time}`;
        if (selectedSlots.includes(id)) {
            setSelectedSlots(selectedSlots.filter(s => s !== id));
        } else {
            setSelectedSlots([...selectedSlots, id]);
        }
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display text-bone">Weekly Availability</h1>
                    <p className="text-bone/60 mt-1">Set your standard availability for event invitations.</p>
                </div>
                <Button className="bg-emerald-teal text-bone hover:bg-emerald-teal/90">Save Changes</Button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 overflow-x-auto">
                <div className="min-w-[800px]">
                    <div className="grid grid-cols-8 gap-4 mb-4">
                        <div className="text-bone/40 text-sm font-medium">Time</div>
                        {days.map(day => (
                            <div key={day} className="text-bone/80 text-sm font-medium text-center">{day}</div>
                        ))}
                    </div>

                    {["18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00"].map(time => (
                        <div key={time} className="grid grid-cols-8 gap-4 mb-4 items-center">
                            <div className="text-bone/40 text-xs">{time}</div>
                            {days.map(day => {
                                const id = `${day}-${time}`;
                                const isSelected = selectedSlots.includes(id);
                                return (
                                    <button
                                        key={id}
                                        onClick={() => toggleSlot(day, time)}
                                        className={`h-10 rounded-lg transition-all border ${isSelected
                                                ? "bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                                                : "bg-white/5 border-white/5 hover:bg-white/10"
                                            }`}
                                    />
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
