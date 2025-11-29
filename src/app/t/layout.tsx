"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/user-context";
import {
    LayoutDashboard,
    CalendarDays,
    Clock,
    MessageSquare,
    User,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/layout/page-transition";
import { Logo } from "@/components/ui/logo";

export default function TalentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user, logout } = useUser();

    const navItems = [
        { href: "/t/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/t/events", label: "Events", icon: CalendarDays },
        { href: "/t/availability", label: "Availability", icon: Clock },
        { href: "/t/messages", label: "Messages", icon: MessageSquare },
        { href: "/t/profile", label: "Profile", icon: User },
    ];

    return (
        <div className="flex h-screen bg-offblack text-bone overflow-hidden relative">
            {/* Background Ambient Light */}
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-emerald-teal/10 rounded-full blur-[150px] pointer-events-none" />

            {/* Sidebar - Darker for Talent */}
            <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col relative z-20">
                <div className="p-6">
                    <Logo variant="light" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/70 block mt-1 ml-1">Talent</span>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-all duration-300 group relative overflow-hidden",
                                    isActive
                                        ? "text-emerald-400"
                                        : "text-bone/50 hover:text-bone"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-transparent border-l-2 border-emerald-400" />
                                )}
                                <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-emerald-400" : "text-bone/30 group-hover:text-bone")} />
                                <span className="relative z-10 tracking-wide">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 bg-black/20">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-10 h-10 rounded-full border border-white/10 p-0.5">
                            <div className="w-full h-full rounded-full overflow-hidden bg-offblack">
                                {user?.avatarUrl && <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />}
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate text-bone font-display">{user?.name || "Talent"}</p>
                            <p className="text-[10px] uppercase tracking-wider text-emerald-400/70 truncate">Verified</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-xs uppercase tracking-widest text-bone/30 hover:text-bone transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-offblack/50 relative z-10">
                <PageTransition>
                    {children}
                </PageTransition>
            </main>
        </div>
    );
}
