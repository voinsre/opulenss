import { ApplicationForm } from "@/components/features/application/application-form";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";

export default function ApplyPage() {
    return (
        <main className="min-h-screen bg-emerald-deep text-bone flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="w-full max-w-2xl text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-display mb-2">Membership Application</h1>
                <p className="text-bone/60">Join our curated community of hosts and talent.</p>
            </div>

            <ApplicationForm />
        </main>
    );
}
