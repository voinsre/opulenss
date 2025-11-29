"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditEventPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = params.id as string;

    return (
        <div className="p-8 max-w-3xl mx-auto pt-24">
            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-8 text-bone/60 hover:text-bone hover:bg-white/5 pl-0 gap-2"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Event
            </Button>

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
                <h1 className="text-3xl font-display text-bone mb-4">Edit Event</h1>
                <p className="text-bone/60 mb-8">
                    Editing functionality for event <span className="text-gold">{eventId}</span> is currently being implemented.
                </p>

                <div className="space-y-4 opacity-50 pointer-events-none">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-bone/60">Event Title</label>
                        <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-bone" defaultValue="Mayfair Private Dinner" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-bone/60">Date</label>
                        <input type="date" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-bone" />
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/10 flex justify-end gap-4">
                    <Button variant="outline" className="border-white/10 text-bone hover:bg-white/5">Cancel</Button>
                    <Button className="bg-gold text-emerald-deep opacity-50 cursor-not-allowed">Save Changes</Button>
                </div>
            </div>
        </div>
    );
}
