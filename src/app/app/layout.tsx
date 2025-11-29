"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/user-context";
import {
    LayoutDashboard,
    CalendarDays,
    Users,
    MessageSquare,
    Settings,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/layout/page-transition";
import { Logo } from "@/components/ui/logo";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { user, logout } = useUser();

    const navItems = [
        { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/app/events", label: "Events", icon: CalendarDays },
        { href: "/app/talent", label: "Talent", icon: Users },
        { href: "/app/messages", label: "Messages", icon: MessageSquare },
        { href: "/app/account", label: "Account", icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-emerald-deep text-bone overflow-hidden relative">
            {/* Background Ambient Light */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Sidebar */}
            <aside className="w-64 bg-emerald-deep/40 backdrop-blur-xl border-r border-white/5 flex flex-col relative z-20">
                <div className="p-6">
                    <Logo />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-bone/40 block mt-1 ml-1">Member</span>
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
                                        ? "text-gold"
                                        : "text-bone/60 hover:text-bone"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent border-l-2 border-gold" />
                                )}
                                <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-gold" : "text-bone/40 group-hover:text-bone")} />
                                <span className="relative z-10 tracking-wide">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 bg-black/20">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-10 h-10 rounded-full border border-gold/30 p-0.5">
                            <div className="w-full h-full rounded-full overflow-hidden bg-emerald-deep">
                                {user?.avatarUrl && <img src={user.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />}
                            </div>
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate text-bone font-display">{user?.name || "Client"}</p>
                            <p className="text-[10px] uppercase tracking-wider text-gold/70 truncate">Platinum Member</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-xs uppercase tracking-widest text-bone/40 hover:text-red-400 transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto bg-emerald-deep/20 relative z-10">
                <PageTransition>
                    {children}
                </PageTransition>
            </main>
        </div>
    );
}
