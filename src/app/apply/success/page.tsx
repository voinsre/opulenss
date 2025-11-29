import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ApplicationSuccessPage() {
    return (
        <main className="min-h-screen bg-emerald-deep text-bone flex flex-col items-center justify-center p-4 text-center">
            <div className="w-16 h-16 bg-emerald-teal/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-gold" />
            </div>

            <h1 className="text-3xl md:text-4xl font-display mb-4">Application Submitted</h1>
            <p className="text-bone/70 max-w-md mb-8">
                Thank you for applying to Opulenss. Our membership committee will review your application and notify you within 48 hours.
            </p>

            <Link href="/">
                <Button variant="outline" className="border-bone/30 text-bone hover:bg-bone/10">
                    Return to Home
                </Button>
            </Link>
        </main>
    );
}
