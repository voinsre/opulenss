"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/user-context";
import {
    LayoutDashboard,
    Users,
    ShieldAlert,
    Settings,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { logout } = useUser();

    const navItems = [
        { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/clients", label: "Clients", icon: Users },
        { href: "/admin/talent", label: "Talent", icon: Users },
        { href: "/admin/moderation", label: "Moderation", icon: ShieldAlert },
        { href: "/admin/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-offblack text-bone">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 flex flex-col bg-black/40 backdrop-blur-xl">
                <div className="p-6">
                    <Logo variant="light" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400/70 block mt-1 ml-1">Admin</span>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-all",
                                    isActive
                                        ? "bg-emerald-deep/20 text-gold border border-gold/20"
                                        : "text-bone/60 hover:bg-white/5 hover:text-bone"
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-sm font-medium transition-colors rounded-md text-bone/60 hover:text-red-400 hover:bg-red-500/10"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 bg-offblack">
                {children}
            </main>
        </div>
    );
}
